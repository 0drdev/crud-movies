const users = require('../data/users.json')

const UserController = {
  login: (req, res) => {
    res.render('login', { title: 'Login Page' })
  },
  processLogin: (req, res) => {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const user = users.find(
      (user) => user.email === email && user.password === password
    )

    if (!user) {
      return res.render('login', {
        title: 'Login Page',
        error: 'Credenciales inválidas. Inténtalo de nuevo.',
        email // Mantener el email en el formulario
      })
    } else {
      return res.render('login', {
        title: 'Login Page',
        message: 'Usuario Autenticado',
        email // Mantener el email en el formulario
      })
    }
  }
}

module.exports = UserController
