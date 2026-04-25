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

// Create
const create = (req, res) => {
  const { title, director, genre, release_year, abstract, image } = req.body
  const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)'

  connection.query(sql, [title, director, genre, release_year, abstract, image], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Database query failed'
      })
    }
    res.status(201).json({
      message: 'Movie created successfully',
      movieId: results.insertId
    })
  })
}

// storeReview
const storeReview = (req, res) => {
  const movieId = Number(req.params.id)
  const { name, vote, text } = req.body

  // Validazione dei campi richiesti per la recensione
  if (!name || !vote || !text) {
    return res.status(400).json({
      error: 'Missing required fields: name, vote, text'
    })
  }

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

// Destroy - Elimina un film dal database
const destroy = (req, res) => {
  const id = Number(req.params.id)

  const sql = 'DELETE FROM movies WHERE id = ?'

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Database query failed'
      })
    }

    // Se results.affectedRows è 0, significa che l'ID non esisteva
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: 'Movie not found'
      })
    }

    res.sendStatus(204)
  })
}


module.exports = {
  index,
  show,
  create,
  storeReview,
  destroy
}