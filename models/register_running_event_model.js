const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const location_model = require('./master_location_model.js')
const transaction_model = require('./transactions_model.js')
const register_running_event = db.define('tb_register_running_events', {
    reg_event_id: { type: sequelize.STRING, primaryKey: true },
    reg_event_name: { type: sequelize.STRING },
    reg_event_price: { type: sequelize.DOUBLE },
    reg_event_amount: { type: sequelize.INTEGER },
    reg_event_detail: { type: sequelize.STRING },
    reg_event_distance: { type: sequelize.STRING },
    reg_event_status: { type: sequelize.STRING },
    reg_event_path_img: { type: sequelize.STRING },
    location_id: {
        type: sequelize.STRING,
        references: {
            model: location_model,
            key: 'location_id'
        }
    },
    trans_id: {
        type: sequelize.STRING,
        references: {
            model: transaction_model,
            key: 'trans_id'
        }
    },
})
register_running_event.hasMany(location_model, {
    foreignKey: 'location_id',
    as: 'tb_master_locations'
})
location_model.belongsTo(register_running_event, {
    foreignKey: 'location_id',
    as: 'tb_register_running_events'
})
register_running_event.hasMany(transaction_model, {
    foreignKey: 'trans_id',
    as: 'tb_transactions'
})
transaction_model.belongsTo(register_running_event, {
    foreignKey: 'trans_id',
    as: 'tb_register_running_events'
})
module.exports = register_running_event