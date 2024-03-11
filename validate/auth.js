const Joi = require('joi')

const loginValidate = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const registerMemberValidate = Joi.object().keys({
    member_username: Joi.string().required(),
    member_password: Joi.string().required(),
    member_name: Joi.string().required(),
    member_lastname: Joi.string().required(),
    member_email: Joi.string().required(),
})

const registerOrganizerValidate = Joi.object().keys({
    organ_username: Joi.string().required(),
    organ_password: Joi.string().required(),
    organ_name: Joi.string().required(),
    organ_lastname: Joi.string().required(),
    organ_email: Joi.string().required()
})
module.exports = {
    loginValidate,
    registerMemberValidate,
    registerOrganizerValidate
}