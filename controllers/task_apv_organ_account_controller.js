let error_message = require('../shared/status_message_func.js')
const db = require('../config/config_db.js')
let task_apv_organ_account_model = require('../models/task_approver_organizer_account_model.js')
//approver organizer 
exports.getorganizerbyApprover = async (req, res) => {
    try {
        let res_approver = await db.query('CALL Sp_get_organizerbyapprover()')
        if (res_approver.length > 0) {
            res.json({
                status: true,
                status_code: 200,
                message: 'Select organizer by approver successfully',
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
exports.updateAndInsertorganizerbyApprover = async (req, res) => {
    try {
        if (req.body.organ_id && req.body.status ) {
            //SET VALUE PARAM POST 
            let _id = req.body.organ_id
            let status = req.body.status
            let reason = req.body.reason
            let admin_id = req.body.admin_id
            //AUTO GENARATE
            let auto_complies = "APVORGAN"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_auto_complies = auto_complies + String(newmath)
            //QUERY 
            let sql_query_1 = "SELECT task_apv_organ_id FROM tb_task_approver_organizer_accounts WHERE task_apv_organ_id =" + "'" + new_auto_complies + "'"
            let execute_check_duplicate = db.query(sql_query_1)
            if (execute_check_duplicate.length == undefined) {
                //ERROR INSERT
                let query_reg = await db.query('CALL Sp_upd_organizerstatusapprover(' + "'" + _id + "'" + "," + "'" + status + "'" + "," + "'" + new_auto_complies + "'"  +"," + "'" + admin_id + "'" + "," + "'" + reason + "'" +')')
                console.log("execute",query_reg)
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

// FIGBUG ทุกครั้งที่มีการอัพเดทสถานะของ Approver ต้อง AUTO INSERT task_appover_organzer_account
// แนวทางกันเขียน INSERT AUTO ใน Stored