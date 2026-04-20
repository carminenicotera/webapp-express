const express = require('express')
const app = express()
const movieRouter = require('./routes/movies')

const notFound = require('./middlewares/notFound')
const serverError = require('./middlewares/serverError')

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

app.use(notFound)
app.use(serverError)