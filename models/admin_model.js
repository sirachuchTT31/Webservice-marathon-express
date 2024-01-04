const db = require('../config/config_db.js')
const sequelize = require("sequelize");

const admin = db.define('tb_admins', {
    admin_id: { type: sequelize.STRING, primaryKey: true },
    admin_username: { type: sequelize.STRING },
    admin_password: { type: sequelize.STRING },
    admin_name: { type: sequelize.STRING },
    admin_lastname: { type: sequelize.STRING },
    admin_tel: { type: sequelize.STRING },
    admin_address: { type: sequelize.STRING },
    admin_email: { type: sequelize.STRING },
    admin_avatar: { type: sequelize.STRING },
    admin_status: { type: sequelize.STRING },
    role: { type: sequelize.STRING },
})

module.exports = admin