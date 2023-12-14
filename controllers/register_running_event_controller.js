let reg_running_event_model = require('../models/register_running_event_model.js')
let transactions_model = require('../models/transactions_model.js')
const db = require('../config/config_db.js')
exports.register_event = async (req, res) => {
    try {
        if (req.body != null) {
            console.log("req.body", req.body)
            let todo = "create_register_running_event_01"
            let reg_id_auto_complies = "REG_EVENT"
            let trans_id_auto_complies = "TRANS"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_reg_id_auto_complies = reg_id_auto_complies + String(newmath)
            let new_trans_id_auto_complies = trans_id_auto_complies + String(newmath)
            let new_reg = {
                reg_event_id: new_reg_id_auto_complies,
                reg_event_name: req.body.reg_event_name,
                reg_event_price: parseFloat(req.body.reg_event_price).toFixed(2),
                reg_event_amount: req.body.reg_event_amount,
                reg_event_detail: req.body.reg_event_detail,
                reg_event_distance: req.body.reg_event_distance,
                reg_event_status: "01",
                reg_event_path_img: req.body.reg_event_path_img,
                location_id: req.body.location_id,
                trans_id: new_trans_id_auto_complies
            }
            let new_trans = {
                trans_id: new_trans_id_auto_complies,
                trans_todo: todo,
                trans_status: "01",
                auth_id: req.body.auth_id
            }
            let response_transaction = await transactions_model.create(new_trans)
            if (response_transaction != null) {
                let response_reg_running_event = await reg_running_event_model.create(new_reg)
                if (response_reg_running_event != null) {
                    res.json({
                        status: true,
                        status_code: 200,
                        message: "Register running campaign successfully",
                        result: new_reg_id_auto_complies
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    status_code: 400,
                    message: "Error transaction request failed",
                    result: null
                })
            }
        }
        else {
            res.status(500)
        }
    }
    catch (e) {
        res.status(500)
    }
}

exports.getAll = async (req, res) => {
    try {
        let [response_req_running_event] = await db.query(
            "SELECT * FROM tb_register_running_events RIGHT JOIN tb_master_locations ON tb_register_running_events.location_id = tb_master_locations.location_id ORDER BY tb_register_running_events.createdAt DESC;"
        )
        // let response_req_running_event = await reg_running_event_model.findAll({
        //     include: {
        //         model : location_model,
        //         as : 'location'
        //     },
        //     order: [["createdAt", "DESC"]],
        // })
        if (response_req_running_event) {
            res.json({
                status: true,
                status_code: 200,
                message: "Selected all register_running_events successfully",
                result: response_req_running_event
            })
        }
        else {
            res.status(400)
        }
    }
    catch (e) {
        res.status(500)
    }
}

exports.getbyId = async (req, res) => {
    try {
        let _id = req.params.id
        let response_reg_running_event_where_Id = await reg_running_event_model.findAll({
            where: {
                reg_event_id: _id
            }
        })
        if (response_reg_running_event_where_Id != null) {
            res.json({
                status: true,
                status_code: 200,
                message: 'Select register_running_event by Id successfully',
                result: response_reg_running_event_where_Id
            })
        }
    }
    catch (e) {
        res.status(500)
    }
}