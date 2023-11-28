const express = require('express');
const router = express.Router();
const { decrypt } = require('../controllers/global_controller.js')
router.post('/global/decrypt', decrypt)
module.exports = router