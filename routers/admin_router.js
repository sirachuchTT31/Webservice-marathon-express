const express = require('express');
const router = express.Router();
const { create, getAll, update, remove } = require('../controllers/admin_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/admin/create', auth_mdw, create)
router.post('/admin/delete', auth_mdw, remove)
router.post('/admin/update', auth_mdw, update)
router.get('/admin/getall', auth_mdw, getAll)
module.exports = router