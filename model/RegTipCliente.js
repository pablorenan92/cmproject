const Sequelize = require("sequelize");
const connection = require("../connection/connection");

const RegTipCliente = connection.define('RegTipCliente',{
    TipClienteDesc:{
        type: Sequelize.STRING,
        allowNull: false}
});


module.exports = RegTipCliente;