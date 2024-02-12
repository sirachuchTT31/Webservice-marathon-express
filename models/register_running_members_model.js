const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const trans_model = require('../models/transactions_model.js')
const reg_event_running_model = require('../models/register_running_event_model.js')

let register_running_member_model = db.define('tb_register_running_members', {
    reg_member_id: { type: sequelize.STRING, primaryKey: true },
    reg_member_status: { type: sequelize.STRING },
    reg_member_description: { type: sequelize.STRING },
    name: { type: sequelize.STRING },
    lastname: { type: sequelize.STRING },
    tel: { type: sequelize.STRING },
    email: { type: sequelize.STRING },
    reg_event_id: {
        type: sequelize.STRING,
        references: {
            model: reg_event_running_model,
            key: 'reg_event_id'
        }
    },
    trans_id: {
        type: sequelize.STRING,
        references: {
            model: trans_model,
            key: 'trans_id'
        }
    },
})

register_running_member_model.hasMany(reg_event_running_model, {
    foreignKey: 'reg_event_id',
    as: 'tb_register_running_events'
})
reg_event_running_model.belongsTo(register_running_member_model, {
    foreignKey: 'reg_event_id',
    as: 'tb_register_running_members'
})
register_running_member_model.hasMany(trans_model, {
    foreignKey: 'trans_id',
    as: 'tb_transactions'
})
trans_model.belongsTo(register_running_member_model, {
    foreignKey: 'trans_id',
    as: 'tb_register_running_members'
})
module.exports = register_running_member_model
