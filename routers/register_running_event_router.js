const express = require('express');
const router = express.Router();

const { create_event, getAll, getbyId, getregbyOrganizer, uploadimg_event, getregbyApprover } = require('../controllers/register_running_event_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/reg-event/create', auth_mdw, create_event)
router.post('/reg-event/upload-image-reg-by-organizer', auth_mdw, uploadimg_event)
router.get('/reg-event/get-reg-by-organizer/:id', auth_mdw, getregbyOrganizer)
router.get('/reg-event/getbyid/:id', getbyId)
router.get('/reg-event/getall', getAll)
router.get('/reg-event/getbyapprover', getregbyApprover)
module.exports = router