let reg_running_event_model = require('../models/register_running_event_model.js')
let transactions_model = require('../models/transactions_model.js')
let error_message = require('../shared/status_message_func.js')
const db = require('../config/config_db.js')
let formidable = require('formidable');
let task_apv_running_event_model = require('../models/task_approver_reg_event_model.js')
let fs = require('fs')
exports.create_event = async (req, res) => {
    try {
        if (req.body) {
            let todo = "Waiting_for_approval_organizer_01"
            let reg_id_auto_complies = "REG_EVENT"
            let trans_id_auto_complies = "TRANS"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_reg_id_auto_complies = reg_id_auto_complies + String(newmath)
            let new_trans_id_auto_complies = trans_id_auto_complies + String(newmath)
            let new_reg = {
                reg_event_id: new_reg_id_auto_complies,
                reg_event_name: req.body.reg_event_name,
                reg_event_due_date: req.body.reg_event_due_date,
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
                res.json(error_message.message_error_400)
            }
        }
        else {
            res.json(error_message.message_error_500)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

exports.uploadimg_event = async (req, res) => {
    try {
        if (req.body) {
            let form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                let oldPath
                let newUrlpath
                let reg_event_id
                console.log(files)
                files.fileUpload.map((x) => oldPath = x.filepath)
                files.fileUpload.map((x) => newUrlpath = x.originalFilename)
                fields.reg_event_id.forEach((x) => { reg_event_id = x })
                let math = Math.random() * 10000000
                let newmath = Math.ceil(math).toString()
                let newPath = 'D:/project_clone_git/marathon_v2_web/src/assets/img/reg_by_organizer/' + newmath + newUrlpath
                let rawData = fs.readFileSync(oldPath)
                fs.writeFile(newPath, rawData, async function (err) {
                    htmlPath = '../../../../assets/img/reg_by_organizer/' + newmath + newUrlpath
                    if (err) throw err
                    let res_reg = await reg_running_event_model.update({
                        reg_event_path_img: htmlPath
                    },
                        {
                            where: {
                                reg_event_id: reg_event_id
                            }
                        })
                    if (res_reg != null) {
                        res.json({
                            status: true,
                            status_code: 200,
                            message: 'Created register running evnet successfully',
                            result: null,
                        })
                    }
                    else {
                        res.json(error_message.message_error_400)
                    }
                })
            })
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

exports.getregbyOrganizer = async (req, res) => {
    try {
        // if (req.body) {
        //     if (req.body.organ_id != null) {
        let _id = req.params.id
        console.log("_id", _id)
        let query_reg = await db.query('CALL Sp_get_regbyorganizer(' + "'" + _id + "'" + ')')
        if (query_reg) {
            res.json({
                status: true,
                status_code: 200,
                message: 'Selected Register_running_event by organzer',
                result: query_reg
            })
        }
        else {
            res.json(error_message.message_error_400)
        }
        //     }
        // }
        // else {
        //     res.status(500)
        // }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

exports.getAll = async (req, res) => {
    try {
        let response_req_running_event = await db.query("CALL Sp_get_regrunningeventall()")
        //call everything due date 
        let udp_trans = await db.query("CALL Sp_upd_autoregeventdatedue()")
        if (response_req_running_event) {
            res.json({
                status: true,
                status_code: 200,
                message: "Selected all register_running_events successfully",
                result: response_req_running_event
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

exports.getbyId = async (req, res) => {
    try {
        let _id = req.params.id
        let response_reg_running_event_where_Id = await reg_running_event_model.findAll({
            where: {
                reg_event_id: _id
            }
        })
        if (response_reg_running_event_where_Id.length > 0) {
            res.json({
                status: true,
                status_code: 200,
                message: 'Select register_running_event by Id successfully',
                result: response_reg_running_event_where_Id
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

