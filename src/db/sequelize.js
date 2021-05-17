const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: process.env.acquire,
        idle: 10000
    }
});

// console.log(process.env.database, process.env.username, process.env.password)
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/users')(sequelize, Sequelize);


db.sequelize.sync();
// {force:true}
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;
