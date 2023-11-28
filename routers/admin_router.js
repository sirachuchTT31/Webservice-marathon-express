const express = require('express');
const router = express.Router();
const { create, getAll, update } = require('../controllers/admin_controller.js')
router.post('/admin/create', create)
router.post('/admin/update', update)
router.get('/admin/getall', getAll)
module.exports = router