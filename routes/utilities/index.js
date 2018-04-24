const routes = require('express').Router()
const sendMail = require('./sendMail')

routes.get('/send', sendMail)

module.exports = routes