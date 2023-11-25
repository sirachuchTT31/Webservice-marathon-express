const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authentications_controller.js')
router.post('/auth/login', login)
module.exports = router