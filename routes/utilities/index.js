const models = require('express').Router();
const sendMail = require('./sendMail');

models.get('/send', sendMail);

module.exports = models;