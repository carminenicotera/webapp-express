const express = require ('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

// mostra tutti i film
router.get('/', movieController.index)

// mostra un film specifico
router.get('/:id', movieController.show)

// creazione di un nuovo film
router.post('/', movieController.create)

// eliminazione di un film
router.delete('/:id', movieController.destroy)

// creazione di una recensione per un film
router.post('/:id/review', movieController.storeReview)

module.exports = router