const Sequelize = require("sequelize");
const connection = require("../connection/connection");
const RegTipLograd = require("./RegTipLograd");

const RegLograd = connection.define('RegLograd',{
    LogradName:{
        type: Sequelize.STRING,
        allowNull: false}    
});

RegLograd.belongsTo(RegTipLograd);

module.exports = RegLograd;