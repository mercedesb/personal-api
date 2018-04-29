const routes = require('express').Router()
const sendMail = require('./sendMail')
var bodyParser = require('body-parser')

routes.post('/send', bodyParser.json(), sendMail)

module.exports = routes