const express = require('express')
const router = express.Router()
const moviesRouter = require('./movies.js')
const userRouter = require('./user.js')
const adminRouter = require('./admin.js')

/* Movies router */
router.use('/', moviesRouter)

/* User router */
router.use('/user', userRouter)

router.use('/admin', adminRouter)

module.exports = router
