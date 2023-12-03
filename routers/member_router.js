const express = require('express');
const router = express.Router();
const { getAll, create, remove, update } = require('../controllers/member_controller')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.get('/member/getall', auth_mdw, getAll)
router.post('/member/update', auth_mdw, update)
router.post('/member/delete', auth_mdw, remove)
router.post('/member/create', create)
module.exports = router