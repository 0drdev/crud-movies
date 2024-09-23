// middlewares/adminMiddleware.js
const users = require('../data/users.json')
function adminMiddleware(req, res, next) {
  const { email } = req.body
  const user = users.find((u) => u.email === email)

  // Redirigir según el rol del usuario
  if (user.rol === 'admin') {
    return res.redirect('/admin')
  } else if (user.rol === 'client') {
    return res.redirect('/')
  }
  // Si por alguna razón el rol no es ni admin ni client, simplemente avanza
  next()
}

module.exports = adminMiddleware
