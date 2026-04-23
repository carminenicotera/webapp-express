const connection = require('../database/connection')

// Index
const index = (req, res) => {

  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Database query failed'
      })
    }
    res.json(results)
  })
}

// Show
const show = (req, res) => {

  const sql = 'SELECT * FROM movies WHERE id = ?'
  const id = Number(req.params.id)
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?'

  // recupero il film con l'id specificato
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Database query failed'
      })
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: 'Movie not found'
      })
    }

    // recupero le recensioni associate al film
    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Database query failed'
        })
      }

      // aggiungo l'array delle recensioni al film e lo restituisco come risposta JSON al client 
      results[0].reviews = reviewsResults

      res.json(results[0])
    })
  })
}

// storeReview
const storeReview = (req, res) => {
  const movieId = Number(req.params.id)
  const { name, vote, text } = req.body

  const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)'

  connection.query(sql, [movieId, name, vote, text], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Database query failed'
      })
    }
    res.status(201).json({
      message: 'Review created successfully'
    })
  })
}

module.exports = {
  index,
  show,
  storeReview
}