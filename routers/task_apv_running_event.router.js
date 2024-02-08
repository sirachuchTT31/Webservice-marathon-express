const express = require('express');
const router = express.Router();

const { getregbyApprover, updateAndInsertRegisterrunningeventbyApprover } = require('../controllers/task_apv_running_event_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')

//reg
router.get('/task-approver-event/getregbyapprover', auth_mdw, getregbyApprover)
router.post('/task-approver-event/updateregbyapprover', auth_mdw, updateAndInsertRegisterrunningeventbyApprover)
module.exports = router