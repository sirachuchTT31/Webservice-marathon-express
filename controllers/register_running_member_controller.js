let error_message = require('../shared/status_message_func.js')
let register_running_member_model = require('../models/register_running_members_model.js')
let transactions_model = require('../models/transactions_model.js')
exports.create_running_member = async (req, res) => {
    try {
        if (req.body) {
            let todo = "Waiting_for_organizer_approver_11"
            let reg_id_auto_complies = "REG_MEMBER_RUNNING"
            let trans_id_auto_complies = "TRANS"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_reg_id_auto_complies = reg_id_auto_complies + String(newmath)
            let new_trans_id_auto_complies = trans_id_auto_complies + String(newmath)
            let new_trans = {
                trans_id: new_trans_id_auto_complies,
                trans_todo: todo,
                trans_status: "11",
                auth_id: req.body.auth_id
            }
            let new_reg = {
                reg_member_id: new_reg_id_auto_complies,
                reg_member_status: '11',
                reg_member_description: req.body?.reg_member_description,
                name: req.body.name,
                lastname: req.body.lastname,
                tel: req.body.tel,
                email: req.body.email,
                trans_id: new_trans_id_auto_complies,
                reg_event_id: req.body.reg_event_id,
            }
            console.log('new_reg', new_reg)
            let response_transaction = await transactions_model.create(new_trans)
            if (response_transaction != null) {
                let response_reg_running_member = await register_running_member_model.create(new_reg)
                if (response_reg_running_member != null) {
                    res.json({
                        status: true,
                        status_code: 200,
                        message: "Register running by member successfully",
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