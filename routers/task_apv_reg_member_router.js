const express = require('express');
const router = express.Router();

const { get_list_reg_approver_by_organizer } = require('../controllers/task_apv_reg_member_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')

//reg
router.get('/task-approver-reg-member/getregapproverbyorganizer/:id', auth_mdw, get_list_reg_approver_by_organizer)
module.exports = router