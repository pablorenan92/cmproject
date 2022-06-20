const Sequelize = require("sequelize");
const connection = require("../connection/connection");
const RegCidades = require("./RegCidades");
const RegEstLocal = require("./RegEstLocal");

const RegBairros = connection.define('RegBairros',{
    BairroName:{
        type: Sequelize.STRING,
        allowNull: false},   
});


RegBairros.belongsTo(RegCidades);
RegBairros.belongsTo(RegEstLocal);

module.exports = RegBairros;