const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const register_event_running_model = require('../models/register_running_event_model.js')

const task_approver_reg_model = db.define('tb_task_approver_reg_events', {
    task_apv_reg_id: { type: sequelize.STRING, primaryKey: true },
    task_apv_reg_status: { type: sequelize.STRING },
    task_apv_reg_approver_by: { type: sequelize.DATE },
    task_apv_reg_reason: { type: sequelize.DOUBLE },
    reg_event_id: {
        type: sequelize.STRING,
        references: {
            model: register_event_running_model,
            key: 'reg_event_id'
        }
    },
})

task_approver_reg_model.hasMany(register_event_running_model, {
    foreignKey: 'reg_event_id',
    as: 'tb_register_running_events'
})

module.exports = task_approver_reg_model