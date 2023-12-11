const express = require('express');
const router = express.Router();

const { register_event, getAll, getbyId } = require('../controllers/register_running_event_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/reg-event/create', auth_mdw, register_event)
router.get('/reg-event/getbyid/:id', getbyId)
router.get('/reg-event/getall', getAll)
module.exports = router