const express = require('express');
const router = express.Router();
const { createLocation, getallLocation } = require('../controllers/master_data_controller.js')
const { auth_mdw } = require('../middleware/auth.mdw.js')
// router.get('/master-data/getall', getAll)
router.post('/master-data/createlocation', auth_mdw, createLocation)
router.get('/master-data/getall-location', auth_mdw, getallLocation)
module.exports = router