const express = require('express')
const router = express.Router()

const { renderContacts } = require('../controllers/contacts')

router.get('/',renderContacts)

module.exports = router