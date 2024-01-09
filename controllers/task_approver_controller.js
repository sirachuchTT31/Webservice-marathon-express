let error_message = require('../shared/status_message_func.js')
const db = require('../config/config_db.js')

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
    }
    catch (e) {
        res.json(error_message.message_error_500)
    }
}

exports.updateregbyApprover = async (req, res) => {
    try {
        if (req.body.trans_id) {
            let _id = req.body.trans_id
            let query_reg = await db.query('CALL Sp_upd_regrunningupdatestatusapprover(' + "'" + _id + "'" + ')')
            res.json({
                status: true,
                status_code: 200,
                message: 'Approver updated successfully',
                result: null
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