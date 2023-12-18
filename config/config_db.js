const Sequelize = require("sequelize");
require('dotenv').config()

let db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    
    dialect: 'mysql',
    port: 3306

})
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
module.exports = db
