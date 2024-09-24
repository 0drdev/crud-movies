const express = require('express')
const UserController = require('../controllers/UserController')
// const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
// En routes/user.js
router.get('/', (req, res) => {
  res.redirect('/user/login') // Redirige a la página de login
})
// Renderizar el formulario de login
router.get('/login', UserController.login)
// Procesar el login
router.post('/login', UserController.processLogin)
// Logout
router.get('/logout', UserController.logout)

module.exports = router
