const connection = require('../database/connection')

const index = (req, res) => {
  res.json({ message: 'index all movies' })
}

const show = (req, res) => {
  res.json({ message: 'show movie' })
}

module.exports = {
  index,
  show
}