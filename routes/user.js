const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'Page User' })
})
module.exports = router
