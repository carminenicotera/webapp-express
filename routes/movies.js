const express = require ('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

// mostra tutti i film
router.get('/', movieController.index)

// mostra un film specifico
router.get('/:id', movieController.show)

// creazione di una recensione per un film
router.post('/:id/review', movieController.storeReview)

module.exports = router