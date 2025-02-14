const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { name } = require('mustache');

const Ticket = sequelize.define('Ticket', {
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
});

module.exports = Ticket;
