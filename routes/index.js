const express = require('express')
const router = express.Router()
const moviesRouter = require('./movies.js')
const userRouter = require('./user.js')
const adminRouter = require('./admin.js')
const MoviesController = require('../controllers/MoviesController.js')
const authMiddleware = require('../middlewares/adminMiddleware.js')

/* Ruta para la raíz */
router.get('/', MoviesController.allMovies) // Renderiza las películas en la raíz

/* User router */
router.use('/user', userRouter)

router.use('/admin', authMiddleware, adminRouter)

/* Movies router */
router.use('/movies', moviesRouter)

module.exports = router
