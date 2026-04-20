const express = require('express')
const app = express()
const movieRouter = require('./routes/movies')

const PORT = process.env.PORT || 3000
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome'
  })
})

app.use('/movies', movieRouter)