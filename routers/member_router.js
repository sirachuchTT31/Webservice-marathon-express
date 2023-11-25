const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/member_controller')

router.get('/member/getall', getAll)
router.post('/member/create', create)
module.exports = router