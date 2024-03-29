// const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../dbconfig')

// // Initialize Sequelize
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   });

async function connect() {
    try {
        await sequelize.sync();
        console.log('Connect sucessfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };