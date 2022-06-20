const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegUniFed = connection.define('RegUniFed',{
    UniFedDesc:{
        type: Sequelize.STRING,
        allowNull: false},
    UniFedSigla:{
        type: Sequelize.STRING,
        allowNull: false}
});

module.exports = RegUniFed;