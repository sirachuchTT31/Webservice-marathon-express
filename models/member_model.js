const db = require('../config/config_db.js')
const sequelize = require("sequelize");

const Member = db.define('tb_members', {
    member_id: { type: sequelize.STRING, primaryKey: true },
    member_username: { type: sequelize.STRING },
    member_password: { type: sequelize.STRING },
    member_name: { type: sequelize.STRING },
    member_lastname: { type: sequelize.STRING },
    member_tel: { type: sequelize.STRING },
    member_address: { type: sequelize.STRING },
    member_email: { type: sequelize.STRING },
    member_avatar: { type: sequelize.STRING },
    role: { type: sequelize.STRING },
})

module.exports = Member