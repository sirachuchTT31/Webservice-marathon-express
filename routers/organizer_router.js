const express = require('express');
const router = express.Router();

const {create} = require('../controllers/organizer_controller.js')
router.post('/organizer/create', create)
module.exports = router