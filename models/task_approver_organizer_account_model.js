const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const organizer_model = require('../models/organizer_model.js')

const task_approver_model = db.define('tb_task_approver_organizer_accounts', {
    task_apv_organ_id: { type: sequelize.STRING, primaryKey: true },
    task_apv_organ_status: { type: sequelize.STRING },
    task_apv_organ_reason: { type: sequelize.DATE },
    task_apv_organ_approver_by: { type: sequelize.DOUBLE },
    organ_id: {
        type: sequelize.STRING,
        references: {
            model: organizer_model,
            key: 'organ_id'
        }
    },
})

task_approver_model.hasMany(organizer_model, {
    foreignKey: 'organ_id',
    as: 'tb_organizers'
})

module.exports = task_approver_model