const express = require('express')
const AdminController = require('../controllers/AdminController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = express.Router()

router.get('/', adminMiddleware, AdminController.index)

module.exports = router
