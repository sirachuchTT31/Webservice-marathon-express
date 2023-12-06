let memberModel = require('../models/member_model.js')
let authModel = require('../models/auth_model.js')
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
const bcrypt = require('bcryptjs')
let { message_status_400_remove } = require('../shared/status_message_func.js')
exports.create = async (req, res) => {
    try {
        if (req.body) {
            let checkDuplicate = await memberModel.findAll({
                where: {
                    member_username: req.body.member_username
                }
            })
            if (checkDuplicate.length == 0) {
                let member_id_auto_complies = "MEMBER"
                let math = Math.random() * 10000000
                let newmath = Math.ceil(math)
                let new_member_id_auto_complies = member_id_auto_complies + String(newmath)
                const salt = await bcrypt.genSalt(10)
                //encrypt password
                let encryptedPassword = await bcrypt.hash(req.body.member_password, salt)
                let new_member = {
                    member_id: new_member_id_auto_complies,
                    member_username: req.body.member_username,
                    member_password: encryptedPassword,
                    member_name: req.body.member_name,
                    member_lastname: req.body.member_lastname,
                    member_tel: req.body.member_tel,
                    member_address: req.body.member_address,
                    member_email: req.body.member_email,
                    member_avatar: req.body.member_avatar,
                    role: "member"
                }
                let new_auth_obj = {
                    auth_id: new_member.member_id,
                    username: new_member.member_username,
                    password: new_member.member_password,
                    name: new_member.member_name,
                    lastname: new_member.member_lastname,
                    avatar: new_member.member_avatar,
                    role: new_member.role,
                }
                let response_auth = await authModel.create(new_auth_obj)
                let response_member = await memberModel.create(new_member)
                if (response_member && response_auth) {
                    res.json({
                        status: true,
                        status_code: 200,
                        message: 'created successfully !',
                        result: new_member.member_id
                    })
                }
                else {
                    res.status(500)
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
            throw res.status(500)
        }
    }
    catch (e) {
        console.log(e)
    }
}
exports.update = async (req, res) => {
    try {
        if (req.body != null) {
            let _id = req.body.member_id
            let new_member = await memberModel.update({
                member_name: req.body.member_name,
                member_lastname: req.body.member_lastname,
                member_tel: req.body.member_tel,
                member_adress: req.body.member_address,
                member_email: req.body.member_email,
                member_avatar: req.body.member_avatar
            }, {
                where: {
                    member_id: _id
                }
            })
            let new_auth = await authModel.update({
                name: req.body.member_name,
                lastname: req.body.member_lastname,
                avatar: req.body.member_avatar
            },
                {
                    where: {
                        auth_id: _id
                    }
                })
            if (new_member && new_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Update member successfully",
                    result: _id
                })
            }
            else {
                res.status(400)
            }
        }
        else {
            res.status(400)
        }
    }
    catch (e) {
        res.status(500)
    }
}
exports.remove = async (req, res) => {
    try {
        if (req.body.member_id != null) {
            let _id = req.body.member_id
            let rs_member = await memberModel.destroy({
                where: {
                    member_id: _id
                }
            })
            let rs_auth = await authModel.destroy({
                where: {
                    auth_id: _id
                }
            })
            if (rs_member && rs_auth) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Delete member successfully",
                    result: _id
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
            res.status(400)
        }
    }
    catch (e) {
        res.status(500)
    }
}
exports.getAll = async (req, res) => {
    try {

        let member = await memberModel.findAll({
            order: [["createdAt", "DESC"]],
        })
        res.json({
            status: true,
            status_code: 200,
            message: 'find data successfully !',
            result: member
        })
    }
    catch (e) {
        console.log(e)
    }
}
