const db = require('../config/config_db.js')
const sequelize = require("sequelize");

const authenticate = db.define('tb_authentications', {
    auth_id: { type: sequelize.STRING, primaryKey: true },
    username: { type: sequelize.STRING },
    password: { type: sequelize.STRING },
    name: { type: sequelize.STRING },
    lastname: { type: sequelize.STRING },
    avatar: { type: sequelize.STRING },
    role: { type: sequelize.STRING }
})

module.exports = authenticate