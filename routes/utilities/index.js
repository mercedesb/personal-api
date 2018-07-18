const routes = require('express').Router()
const { sendToMaker, sendToPersonal} = require('./sendMail')
var bodyParser = require('body-parser')

routes.post('/send', bodyParser.json(), sendToPersonal)
routes.post('/sendToMaker', bodyParser.json(), sendToMaker)

module.exports = routes