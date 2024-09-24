const fs = require('node:fs')
const path = require('path')

function generalMiddleware(req, res, next) {
  const message = 'Entró a la ruta ' + req.url
  const dateTime = new Date().toLocaleString()

  // Verificar si la carpeta 'logs' existe, si no, crearla
  const logsDir = path.join(__dirname, '..', 'logs')
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
  }

  // Escribir el mensaje en 'general_logs.txt'
  fs.appendFileSync(
    path.join(logsDir, 'general_logs.txt'),
    `${dateTime} - ${message}\n`
  )

  next()
}

module.exports = generalMiddleware
