const Sequelize = require('sequelize');
const connection = require('../connection/connection');
const RegBairros = require("./RegBairros");
const RegLograd = require("./RegLograd");
const RegCidades = require("./RegCidades");
const RegTipEmp = require("./RegTipEmp");

const RegClients = connection.define('RegClients',{
    CompCodIbge:{
        type: Sequelize.STRING,
        allowNull: false},
    CompName:{
        type: Sequelize.STRING,
        allowNull: false},
    CompCnpj:{
        type: Sequelize.STRING,
        allowNull: false},
    CompInsEst:{
        type: Sequelize.STRING,
        allowNull: false},
    CompCep:{
        type: Sequelize.STRING,
        allowNull: false},
    CompTel:{
        type: Sequelize.STRING,
        allowNull: false},
    CompTelCel:{
        type: Sequelize.STRING,
        allowNull: false},
    CompNum:{
        type: Sequelize.STRING,
        allowNull: false},
    CompDefault:{
        type: Sequelize.STRING,
        allowNull: false},
});

RegClients.belongsTo(RegLograd);
RegClients.belongsTo(RegBairros);
RegClients.belongsTo(RegCidades);
RegClients.belongsTo(RegTipEmp);

module.exports = RegClients;
    ;