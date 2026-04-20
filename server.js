const express = require('express')
const app = express()
const connection = require('./database/connection')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome'
  })
})