const express = require('express')
const router = express.Router()

const { renderPanel} = require('../controllers/product-panel')

router.get('/',renderPanel)

module.exports = router