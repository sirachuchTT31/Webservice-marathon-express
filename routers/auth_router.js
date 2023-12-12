const express = require('express');
const router = express.Router();
const { login, registerMember, registerOrganizer, updateImgprofilemember } = require('../controllers/authentications_controller.js')
router.post('/auth/login', login)
router.post('/auth/register-member', registerMember)
router.post('/auth/register-organizer', registerOrganizer)
router.post('/auth/update-file-member', updateImgprofilemember)
module.exports = router