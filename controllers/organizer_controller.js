let authModel = require('../models/auth_model.js')
let organizerModel = require('../models/organizer_model.js')
// let { message_status_400_remove } = require('../shared/status_message_func.js')
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
const bcrypt = require('bcryptjs')
let error_message = require('../shared/status_message_func.js')
exports.create = async (req, res) => {
    try {
        if (req.body) {
            let checkDuplicate = await organizerModel.findAll({
                where: {
                    organ_username: req.body.organ_username
                }
            })
            if (checkDuplicate.length == 0) {
                let organizer_id_auto_complies = "ORGANIZER"
                let math = Math.random() * 10000000
                let newmath = Math.ceil(math)
                let new_organizer_id_auto_complies = organizer_id_auto_complies + String(newmath)
                const salt = await bcrypt.genSalt(10)
                let encryptedPassword = await bcrypt.hash(req.body.organ_password, salt)
                let new_organizer = {
                    organ_id: new_organizer_id_auto_complies,
                    organ_username: req.body.organ_username,
                    organ_password: encryptedPassword,
                    organ_name: req.body.organ_name,
                    organ_lastname: req.body.organ_lastname,
                    organ_tel: req.body.organ_tel,
                    organ_address: req.body.organ_address,
                    organ_email: req.body.organ_email,
                    organ_avatar: req.body.organ_avatar,
                    role: "organizer",
                }
                let new_auth_obj = {
                    auth_id: new_organizer.organ_id,
                    username: new_organizer.organ_username,
                    password: new_organizer.organ_password,
                    name: new_organizer.organ_name,
                    lastname: new_organizer.organ_lastname,
                    avatar: new_organizer.organ_avatar,
                    role: new_organizer.role,
                }
                let response_organizer = await organizerModel.create(new_organizer)
                let response_auth = await authModel.create(new_auth_obj)
                if (response_organizer && response_auth) {
                    res.json({
                        status: true,
                        status_code: 200,
                        message: "Created successfully !",
                        result: new_organizer.organ_id
                    })
                }
                else {
                    res.status(400)
                }
            }
            else {
                res.json({
                    status: false,
                    status_code: 401,
                    message: "User duplicate Please key new username",
                    result: null
                })
            }
        }
        else {
            res.status(500)
        }
    }
    catch (e) {
        console.log(e)
    }
}
exports.update = async (req, res) => {
    try {
        if (req.body) {
            let _id = req.body.organ_id
            let rs_organ = await organizerModel.update({
                organ_name: req.body.organ_name,
                organ_lastname: req.body.organ_lastname,
                organ_tel: req.body.organ_tel,
                organ_address: req.body.organ_address,
                organ_email: req.body.organ_email,
                organ_avatar: req.body.organ_avatar
            },
                {
                    where: {
                        organ_id: _id
                    }
                })
            let rs_auth = await authModel.update({
                name: req.body.organ_name,
                lastname: req.body.organ_lastname,
                avatar: req.body.organ_avatar
            }, {
                where: {
                    auth_id: _id
                }
            })
            if (rs_organ && rs_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Update organization successfully",
                    result: null
                })
            }
            else {
                res.json(error_message.message_error_400)
            }
        } else {
            res.json(error_message.message_error_400)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}
exports.remove = async (req, res) => {
    try {
        if (req.body.organ_id) {
            let _id = req.body.organ_id
            let rs_organ = await organizerModel.destroy({
                where: {
                    organ_id: _id
                }
            })
            let rs_auth = await authModel.destroy({
                where: {
                    auth_id: _id
                }
            })
            if (rs_organ && rs_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "delete organizer successfully deleted",
                    result: _id
                })
            }
            else {
                res.json(error_message.message_error_400)
            }
        }
        else {
            res.json(error_message.message_error_400)
        }
    }
    catch (e) {
        res.status(500)
    }
}
exports.getAll = async (req, res) => {
    try {
        let new_organizer = await organizerModel.findAll({
            order: [["createdAt", "DESC"]],
        })
        if (new_organizer) {
            res.json({
                status: true,
                status_code: 200,
                message: "Selected all organizer successfully",
                result: new_organizer
            })
        }
        else {
            res.json(error_message.message_error_400)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

