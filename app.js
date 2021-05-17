const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const authenticationRouter = require('./src/routes/authentication_route');

require('./src/db/sequelize');
const db = require('./src/db/sequelize');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(authenticationRouter);

module.exports = app;