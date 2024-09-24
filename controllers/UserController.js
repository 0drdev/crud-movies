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
    const token = jwt.sign(
      { name: user.name, email: user.email, rol: user.rol },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    // Guardar el token en una cookie segura (httpOnly para mayor seguridad)
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }) // Cookie dura 1h

    // Enviar el token y redirigir a la vista admin/admin
    res.redirect('/admin')
  },
  logout: (req, res) => {
    res.clearCookie('token') // Elimina la cookie con el token JWT
    res.redirect('/user/login') // Redirige al formulario de login
  }
}

module.exports = UserController
