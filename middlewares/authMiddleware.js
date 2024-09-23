const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || 'miSuperSecreto'

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.sendStatus(401) // No token provided
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403) // Token no válido
    }
    req.user = user // Asignar la información del usuario decodificado al request
    next() // Continuar al siguiente middleware o ruta
  })
}

module.exports = authMiddleware
