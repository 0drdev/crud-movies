const express = require('express')
const router = express.Router()
const moviesRouter = require('./movies.js')
const userRouter = require('./user.js')
const adminRouter = require('./admin.js')

/* User router */
router.use('/user', userRouter)

router.use('/admin', adminRouter)

/* Movies router */
router.use('/', moviesRouter)

module.exports = router
