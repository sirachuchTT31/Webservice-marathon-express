let authModel = require('../models/auth_model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    try {
        let { username, password } = req.body
        let auth_obj = await authModel.findAll({
            where: {
                username: username
            }
        })
        if (auth_obj.length != 0) {
            let new_auth_obj = {}
            new_auth_obj = auth_obj[0].dataValues
            let matchPassword = await bcrypt.compare(password, new_auth_obj.password)
            if (!matchPassword) {
                res.json({
                    status: false,
                    status_code: 400,
                    message: 'Password mismatch !',
                    result: null
                })
            }
            else {
                let payload = {
                    _id: new_auth_obj.auth_id,
                    username: new_auth_obj.username,
                    name: new_auth_obj.name,
                    lastname: new_auth_obj.lastname,
                    avatar: new_auth_obj.avatar,
                    role: new_auth_obj.role
                }
                jwt.sign(payload, 'jwtsecret', { expiresIn: 60000000 }, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.json({
                            status: true,
                            status_code: 200,
                            message: 'Login successfully',
                            result: {
                                token: token,
                                payload: payload,
                                time_out_token: 60000000
                            },
                        })
                    }
                })
            }
        }
        else {
            res.json({
                status: false,
                status_code: 401,
                message: 'User not found.',
                result: null
            })
        }
    }
    catch (e) {
        console.log(e)
    }

}