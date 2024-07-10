const express = require('express')
const router = express.Router()

const {
    loginForm,
    login,
    logout
} = require('../controllers/authentication')

router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router