const express = require('express');
const router = express.Router();

const { create, getAll, remove, update } = require('../controllers/organizer_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
router.post('/organizer/create', create)
router.get('/organizer/getall', auth_mdw, getAll)
router.post('/organizer/update', auth_mdw, update)
router.post('/organizer/delete', auth_mdw, remove)
module.exports = router