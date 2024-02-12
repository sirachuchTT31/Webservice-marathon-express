const express = require('express');
const router = express.Router();
const { create_running_member } = require('../controllers/register_running_member_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/reg-running-member/create', auth_mdw, create_running_member)
module.exports = router