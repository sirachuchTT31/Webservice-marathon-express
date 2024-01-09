const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const transaction_model = require('./transactions_model.js')

const task_approver_model = db.define('tb_task_approvers', {
    taskapv_id: { type: sequelize.STRING, primaryKey: true },
    taskapv_todo: { type: sequelize.STRING },
    taskapv_before_status: { type: sequelize.DATE },
    taskapv_after_status: { type: sequelize.DOUBLE },
    taskapv_reason: { type: sequelize.INTEGER },
    trans_id: {
        type: sequelize.STRING,
        references: {
            model: transaction_model,
            key: 'trans_id'
        }
    },
})

register_running_event.hasMany(transaction_model, {
    foreignKey: 'trans_id',
    as: 'tb_transactions'
})

module.exports = task_approver_model