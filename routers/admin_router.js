const express = require('express');
const router = express.Router();
const { create } = require('../controllers/admin_controller.js')
router.post('/admin/create', create)
module.exports = router