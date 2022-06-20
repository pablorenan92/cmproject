const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegOperad = connection.define('RegOperad',{
    OperadFirstName:{
        type: Sequelize.STRING,
        allowNull: false},
    OperadLastName:{
        type: Sequelize.STRING,
        allowNull: false},    
    OperadEmail:{
        type: Sequelize.STRING,
        allowNull: false},
    OperadPass: {
        type: Sequelize.STRING,
        allowNull: false,
}
});

module.exports = RegOperad;