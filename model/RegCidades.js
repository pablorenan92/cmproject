const Sequelize = require("sequelize");
const connection = require("../connection/connection");
const RegUniFed = require("./RegUniFed");

const RegCidades = connection.define('RegCidades',{
    CitName:{
        type: Sequelize.STRING,
        allowNull: false},
    CitCodExt:{
        type: Sequelize.STRING,
        allowNull: false}
});

RegCidades.belongsTo(RegUniFed);
RegUniFed.hasMany(RegCidades);

module.exports = RegCidades;