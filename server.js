require('dotenv').load();

var app = require('express')()

const routes = require('./routes')

app.use('/', routes)

// Start server
var port = process.env.PORT || 8090

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Magic happens on port ' + port)
  }
})
