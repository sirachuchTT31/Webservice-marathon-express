
let adminModel = require('../models/admin_model.js');
let authModel = require('../models/auth_model.js');
const bcrypt = require('bcryptjs')
let error_message = require('../shared/status_message_func.js')
const { createAdminValidate } = require('../validate/admin.js')
exports.create = async (req, res) => {
    try {
        const { value, error } = createAdminValidate.validate(req.body)
        if (!error) {
            let checkDuplicate = await adminModel.findAll({
                where: {
                    admin_username: req.body.admin_username
                }
            })
            if (checkDuplicate.length == 0) {
                let admin_id_auto_complies = "ADMIN"
                let math = Math.random() * 10000000
                let newmath = Math.ceil(math)
                let new_admin_id_auto_complies = admin_id_auto_complies + String(newmath)
                const salt = await bcrypt.genSalt(10)
                let encryptedPassword = await bcrypt.hash(req.body.admin_password, salt)
                let newAdmin = {
                    admin_id: new_admin_id_auto_complies,
                    admin_username: req.body.admin_username,
                    admin_password: encryptedPassword,
                    admin_name: req.body.admin_name,
                    admin_lastname: req.body.admin_lastname,
                    admin_tel: req.body.admin_tel,
                    admin_address: req.body.admin_address,
                    admin_email: req.body.admin_email,
                    admin_avatar: req.body.admin_avatar,
                    admin_status : 'N',
                    role: "admin",
                }
                let new_auth_obj = {
                    auth_id: newAdmin.admin_id,
                    username: newAdmin.admin_username,
                    password: newAdmin.admin_password,
                    name: newAdmin.admin_name,
                    lastname: newAdmin.admin_lastname,
                    avatar: newAdmin.admin_avatar,
                    access_status : 'N',
                    role: newAdmin.role,
                }
                let response_admin = await adminModel.create(newAdmin)
                let response_auth = await authModel.create(new_auth_obj)
                if (response_admin && response_auth) {
                    res.json({
                        status: true,
                        status_code: 200,
                        message: "created successfully !",
                        result: newAdmin.admin_id
                    })
                }
                else {
                    res.json(error_message.message_error_400)
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
            res.json(error_message.message_error_500)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
        console.log(e)
    }
}
exports.update = async (req, res) => {
    try {
        if (req.body) {
            let _id = req.body.admin_id
            //fetch update 
            let rs_admin = await adminModel.update({
                admin_name: req.body.admin_name,
                admin_lastname: req.body.admin_lastname,
                admin_tel: req.body.admin_tel,
                admin_address: req.body.admin_address,
                admin_email: req.body.admin_email,
                admin_avatar: req.body.admin_avatar,
            },
                {
                    where: {
                        admin_id: _id
                    }
                })
            let rs_auth = await authModel.update({
                name: req.body.admin_name,
                lastname: req.body.admin_lastname,
                avatar: req.body.admin_avatar,
            },
                {
                    where: {
                        auth_id: _id
                    }
                })
            if (rs_admin && rs_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Update admin successfully",
                    result: _id
                })
            }
            else {
                res.json(error_message.message_error_400)
            }
        }
        else {

        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
        console.log(e)
    }
}
exports.remove = async (req, res) => {
    try {
        if (req.body.admin_id) {
            let params = req.body.admin_id
            console.log(params)
            let new_admin = await adminModel.destroy({
                where: {
                    admin_id: params
                }
            })
            let new_auth = await authModel.destroy({
                where: {
                    auth_id: params
                }
            })
            if (new_admin && new_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Delete data successfully ",
                    result: null
                })
            }
            else {
                res.json({
                    status: false,
                    status_code: 400,
                    message: "Error deleting data",
                    result: null,
                })
            }
        }
        else {
            res.json(error_message.message_error_400)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
        console.log(e)
    }
}
exports.getAll = async (req, res) => {
    try {
        let newAdmin = await adminModel.findAll({
            order: [["createdAt", "DESC"]],
        })
        if (newAdmin) {
            res.json({
                status: true,
                status_code: 200,
                message: "Selected all admin successfully",
                result: newAdmin
            })
        }
        else {
            res.json(error_message.message_error_400)
        }

    }
    catch (e) {
        res.json(error_message.message_error_500)
        console.log(e)
    }
}
