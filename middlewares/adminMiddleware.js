const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const token = req.cookies.token // O de la cabecera Authorization

  if (!token) {
    return res.redirect('/user/login') // Redirige si no hay token
  }

  jwt.verify(token, process.env.SECRET_KEY || 'miSuperSecreto', (err, user) => {
    if (err) {
      return res.redirect('/user/login') // Redirige si el token es inválido
    }
    req.user = user // Almacena el usuario en la solicitud
    next() // Continua a la siguiente función
  })
}

module.exports = authMiddleware
