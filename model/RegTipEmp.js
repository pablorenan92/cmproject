const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegTipEmp = connection.define('RegTipEmp',{
    TipEmpDesc:{
        type: Sequelize.STRING,
        allowNull: false}
});

module.exports = RegTipEmp;