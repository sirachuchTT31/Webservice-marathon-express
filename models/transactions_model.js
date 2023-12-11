const db = require('../config/config_db.js')
const sequelize = require("sequelize");
let auth_model = require('./auth_model.js')
const transactions = db.define('tb_transactions', {
    trans_id: { type: sequelize.STRING, primaryKey: true },
    trans_todo: { type: sequelize.STRING },
    trans_status: { type: sequelize.STRING },
    auth_id: { type: sequelize.STRING },
})
transactions.hasMany(auth_model, {
    foreignKey: 'auth_id',
    as: 'tb_authentications'
})
auth_model.belongsTo(transactions, {
    foreignKey: 'auth_id',
    as: 'tb_transactions'
})
module.exports = transactions