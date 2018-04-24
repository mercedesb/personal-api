const routes = require('express').Router();
const utilities = require('./utilities')

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/utilities', utilities);

module.exports = routes;