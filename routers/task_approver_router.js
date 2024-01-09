const express = require('express');
const router = express.Router();

const { getregbyApprover ,updateregbyApprover} = require('../controllers/task_approver_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.get('/task-approver/getregbyapprover', auth_mdw, getregbyApprover)
router.post('/task-approver/updateregbyapprover',auth_mdw,updateregbyApprover)
module.exports = router