const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegTipLograd = connection.define('RegTipLograd',{
    TipLogradDesc:{
        type: Sequelize.STRING,
        allowNull: false}
});

module.exports = RegTipLograd;