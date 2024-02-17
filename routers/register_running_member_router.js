const express = require('express');
const router = express.Router();
const { create_running_member , get_history_members } = require('../controllers/register_running_member_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/reg-running-member/create', auth_mdw, create_running_member)
router.get('/reg-running-member/get-history/:id',auth_mdw,get_history_members)
module.exports = router