const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegEstLocal = connection.define('RegEstLocal',{
    EstLocalDesc:{
        type: Sequelize.STRING,
        allowNull: false}
});

module.exports = RegEstLocal;