let error_message = require('../shared/status_message_func.js')
const db = require('../config/config_db.js')

//approver registereventbyorganizer
exports.getregbyApprover = async (req, res) => {
    try {

        let res_approver = await db.query(`CALL Sp_get_regrunningeventapprover()`)
        if (res_approver.length > 0) {
            res.json({
                status: true,
                status_code: 200,
                message: 'Select register_running_event by approver successfully',
                result: res_approver
            })
        }
        else {
            res.json(error_message.message_error_204)
        }
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

exports.updateAndInsertRegisterrunningeventbyApprover = async (req, res) => {
    try {
        if (req.body.trans_id) {
            //SET VALUE PARAM POST
            let trans_id = req.body.trans_id
            let status = req.body.status
            let reason = req.body.reason
            let admin_id = req.body.admin_id
            let reg_id = req.body.reg_event_id
            //AUTO GENARATE
            let auto_complies = "APVREG"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_auto_complies = auto_complies + String(newmath)
            //QUERY 
            let sql_query_1 = "SELECT task_apv_reg_id FROM tb_task_approver_reg_events WHERE task_apv_reg_id =" + "'" + new_auto_complies + "'"
            let execute_check_duplicate = db.query(sql_query_1)
            if (execute_check_duplicate.length == undefined) {
                let sql_query_2
                sql_query_2 = await db.query('CALL Sp_upd_regrunningeventstatusapprover(' + "'" + trans_id + "'" + "," + "'" + status + "'" + "," + "'" + new_auto_complies + "'"  +"," + "'" + admin_id + "'" + "," + "'" + reason + "'" + ","  + "'" + reg_id + "'" +')')
                res.json({
                    status: true,
                    status_code: 200,
                    message: 'Approver updated successfully',
                    result: null
                })
            }

        }
        else {
            res.json(error_message.message_error_400)
        }

    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

