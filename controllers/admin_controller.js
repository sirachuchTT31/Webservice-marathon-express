const { where } = require('sequelize');
let adminModel = require('../models/admin_model.js');
let authModel = require('../models/auth_model.js');
const bcrypt = require('bcryptjs')
exports.create = async (req, res) => {
    try {
        if (req.body != null) {
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
                role: "admin",
            }
            let new_auth_obj = {
                auth_id: newAdmin.admin_id,
                username: newAdmin.admin_username,
                password: newAdmin.admin_password,
                name: newAdmin.admin_name,
                lastname: newAdmin.admin_lastname,
                avatar: newAdmin.admin_avatar,
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
                res.status(400)
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
        if (req.body != null) {
            let _id = req.body.admin_id
            //fetch update 
            const salt = await bcrypt.genSalt(10)
            let encryptedPassword = await bcrypt.hash(req.body.admin_password, salt)
            let rs_admin = await adminModel.update({
                admin_username: req.body.admin_username,
                admin_password: encryptedPassword,
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
            if (rs_admin) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Update admin successfully",
                    result: _id
                })
            }
            else {
                res.json(400)
            }
        }
        else {

        }
    }
    catch (e) {
        console.log(e)
    }
}
exports.getAll = async (req, res) => {
    try {
        let newAdmin = await adminModel.findAll()
        if (newAdmin) {
            res.json({
                status: true,
                status_code: 200,
                message: "Selected all admin successfully",
                result: newAdmin
            })
        }

    }
    catch (e) {
        console.log(e)
    }
}