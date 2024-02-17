const db = require('../config/config_db.js')
const _ = require('underscore');
let error_message = require('../shared/status_message_func.js')
const http_status =  require('http-status-codes')
exports.get_list_reg_approver_by_organizer = async (req,res) =>{
    try{
        if (req.params.id) {
            let organizer_id = req.params.id 
            let results = await db.query('CALL Sp_get_regapproverbyorganizer(' + "'" + organizer_id + "'" + ")");
            if(!_.isEmpty(results)){
                res.json({
                    status : true ,
                    status_code : http_status.StatusCodes.OK ,
                    message : http_status.ReasonPhrases.OK,
                    results : results
                })
            }
            else {
                res.json(error_message.message_error_204)
            }
        }
        else {
            res.json(error_message.message_error_400)
        }
    }
    catch(e){
        res.json(error_message.message_error_500)
    }
}

