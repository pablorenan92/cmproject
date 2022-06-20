const Sequelize = require("sequelize");
const connection = require("../connection/connection");
const RegClients = require("./RegClients");

const RegVendedor = connection.define('RegVendedor',{
    VendName:{
        type: Sequelize.STRING,
        allowNull: false},
        
    VendEmail:{
        type: Sequelize.STRING,
        allowNull: false},
    VendComiss: {
        type: Sequelize.STRING,
        allowNull: false,
}
});

RegClients.belongsTo(RegVendedor);
RegVendedor.hasMany(RegClients);

module.exports = RegVendedor;