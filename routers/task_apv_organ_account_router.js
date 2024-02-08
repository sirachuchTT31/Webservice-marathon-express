const express = require('express');
const router = express.Router();

const { getorganizerbyApprover, updateAndInsertorganizerbyApprover } = require('../controllers/task_apv_organ_account_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')

//organ
router.get('/task-approver-organizer/getorganbyapprover', auth_mdw, getorganizerbyApprover)
router.post('/task-approver-organizer/updateorganbyapprover', auth_mdw, updateAndInsertorganizerbyApprover)
module.exports = router