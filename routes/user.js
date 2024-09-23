const express = require('express')
const UserController = require('../controllers/UserController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = express.Router()

// Renderizar el formulario de login
router.get('/login', UserController.login)

// Procesar el login
router.post('/login', adminMiddleware, UserController.processLogin)

module.exports = router
