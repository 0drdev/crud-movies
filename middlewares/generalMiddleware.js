const fs = require('node:fs')
const path = require('path')

function generalMiddleware(req, res, next) {
  const message = 'Entro a la ruta' + req.url
  const dateTime = new Date().toLocaleString()

  fs.createWriteStream(path.join('logs', 'general_logs.txt'), { flags: 'a' })

  fs.appendFileSync(
    path.join('logs', 'general_logs.txt'),
    dateTime + ' - ' + message + '\n'
  )
  next()
}

module.exports = generalMiddleware
