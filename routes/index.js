const express = require('express')
const router = express.Router()
const moviesRouter = require('./movies.js')
const userRouter = require('./user.js')

/* Movies router */
router.use('/', moviesRouter)

/* User router */
router.use('/user', userRouter)

module.exports = router
