const db = require('../config/config_db.js')
const sequelize = require("sequelize");
const reg_member_model = require('../models/register_running_members_model.js')

const task_approver_reg_member_model = db.define('tb_task_approver_reg_members',{
    tb_task_approver_reg_members : { type: sequelize.STRING, primaryKey: true },
    tb_task_approver_reg_members : { type: sequelize.STRING },
    task_apv_reg_member_approver_by :{ type: sequelize.STRING } ,
    task_apv_reg_member_reason : { type: sequelize.STRING },
    reg_member_id : {
        type: sequelize.STRING,
        references: {
            model: reg_member_model,
            key: 'reg_member_id'
        }
    },
})

task_approver_reg_member_model.hasMany(reg_member_model,{
    foreignKey : 'reg_member_id',
    as: 'tb_register_running_members'
})