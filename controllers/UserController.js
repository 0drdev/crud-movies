// controllers/UserController.js
const users = require('../data/users.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY || 'miSuperSecreto'

const UserController = {
  login: (req, res) => {
    res.render('login', { title: 'Login Page' })
  },

  processLogin: (req, res) => {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const user = users.find((user) => user.email === email)

    if (!user) {
      return res.status(404).render('login', {
        title: 'Login Page',
        error: 'Usuario no está registrado'
      })
    }

    // Comparamos la contraseña proporcionada con la contraseña encriptada
    const checkPassword = bcrypt.compareSync(password, user.password)

    if (!checkPassword) {
      return res.status(401).render('login', {
        title: 'Login Page',
        error: 'Contraseña incorrecta'
      })
    }

    // Generar el token JWT
    const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY, {
      expiresIn: '1h'
    })

    // Enviar el token y redirigir a la vista admin/admin
    res.render('admin/admin', {
      title: user.name,
      message: 'Login exitoso',
      token
    })
  }
}

module.exports = UserController
