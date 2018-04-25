// Dependencies


require('dotenv').load();

var app        = require('express')()
var bodyParser = require('body-parser')
const routes = require('./routes')

app.use('/', routes)

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Start server
var port = process.env.PORT || 8090

app.listen(port, () => {
  console.log('Magic happens on port ' + port)
})
