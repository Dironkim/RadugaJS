const express = require('express')
const router = express.Router()

const { renderPanel} = require('../controllers/tag-panel')

router.get('/',renderPanel)

module.exports = router