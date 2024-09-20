const express = require('express')
const AdminController = require('../controllers/AdminController')
// const adminMiddleware = require('../middlewares/adminMiddleware')
const router = express.Router()

router.get('/', AdminController.index)

module.exports = router
