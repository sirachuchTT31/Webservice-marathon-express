const express = require('express');
const router = express.Router();
const { login, registerMember, registerOrganizer, updateImgprofilemember, updateprofileMember } = require('../controllers/authentications_controller.js')
router.post('/auth/login', login)
router.post('/auth/register-member', registerMember)
router.post('/auth/register-organizer', registerOrganizer)
router.post('/auth/upload-profile-member', updateImgprofilemember)
router.post('/auth/update-profile-member', updateprofileMember)
module.exports = router