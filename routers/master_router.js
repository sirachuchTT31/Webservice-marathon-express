const express = require('express');
const router = express.Router();
const { createLocation } = require('../controllers/master_data_controller.js')

// router.get('/master-data/getall', getAll)
router.post('/master-data/createlocation', createLocation)
module.exports = router