const db = require('../config/config_db.js')
const sequelize = require("sequelize");

const location = db.define('tb_master_locations', {
    location_id: { type: sequelize.STRING, primaryKey: true },
    location_province: { type: sequelize.STRING },
    location_district: { type: sequelize.STRING },
    location_zipcode: { type: sequelize.STRING },
    location_address: { type: sequelize.STRING },
})

module.exports = location