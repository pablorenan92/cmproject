const Sequelize = require('sequelize');

const connection = new Sequelize('cassim','root','201020',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;