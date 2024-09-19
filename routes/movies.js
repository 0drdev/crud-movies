const express = require('express')
const router = express.Router()
const generalMiddleware = require('../middlewares/generalMiddleware.js')
const MoviesController = require('../controllers/MoviesController.js')

/* GEt movies listing */
router.get('/', generalMiddleware, MoviesController.allMovies)

router.get('/:id', generalMiddleware, MoviesController.indexMovie)

module.exports = router
