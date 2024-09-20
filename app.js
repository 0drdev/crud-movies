const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const {
  notFoundHandler,
  errorHandler
} = require('./middlewares/errorMiddleware')

const app = express()

const PORT = process.env.PORT || 3000 // Use the port of enviroment varible or port 3000 for default

app.use(express.json()) // To handle JSON in the request body

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Index router
app.use('/', indexRouter)

// use middleware errorHandler
app.use(notFoundHandler)
// Middleware para manejar errores
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🌎 Server running on http://localhost:${PORT}`)
})

module.exports = app
