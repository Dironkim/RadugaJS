const express = require('express')
const router = express.Router()

const { renderPanel} = require('../controllers/category-panel')

router.get('/',renderPanel)

module.exports = router