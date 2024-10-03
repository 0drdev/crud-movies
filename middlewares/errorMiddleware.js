const fs = require('node:fs')
const path = require('path')

function notFoundHandler(req, res, next) {
  res.status(404).render('error', {
    message: 'Page Not Found',
    stack: null
  })
}

function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const message = 'Error: ' + err.message
  const dateTime = new Date().toLocaleString()

  // Log del error en un archivo
  fs.createWriteStream(path.join('logs', 'error_logs.txt'), { flags: 'a' })
  fs.appendFileSync(
    path.join('logs', 'error_logs.txt'),
    `${dateTime} - ${message}\n`
  )

  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : null // Solo mostrar el stack en desarrollo
  })
}

module.exports = {
  notFoundHandler,
  errorHandler
}
