const connection = require('../database/connection')

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

module.exports = {
  index,
  show
}