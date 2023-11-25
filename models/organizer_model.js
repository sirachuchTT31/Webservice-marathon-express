const db = require('../config/config_db.js')
const sequelize = require("sequelize");

const organizer = db.define('tb_organizers', {
    organ_id: { type: sequelize.STRING, primaryKey: true },
    organ_username: { type: sequelize.STRING },
    organ_password: { type: sequelize.STRING },
    organ_name: { type: sequelize.STRING },
    organ_lastname: { type: sequelize.STRING },
    organ_tel: { type: sequelize.STRING },
    organ_address: { type: sequelize.STRING },
    organ_email: { type: sequelize.STRING },
    organ_avatar: { type: sequelize.STRING },
    role: { type: sequelize.STRING },
})

module.exports = organizer