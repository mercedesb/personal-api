require('dotenv').load();
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
const cors = require('cors')
const helmet = require('helmet')

let app = require('express')()

let corsOrigin
if (isDevelopment) {
  corsOrigin = '*'
} else {
  corsOrigin = function (origin, callback) {
    const whitelist = process.env.CORS_WHITELIST.split(',')
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(helmet())

const routes = require('./routes')
app.use('/', routes)

// Start server
let port = process.env.PORT || 8090

app.listen(port, () => {
  if (isDevelopment) {
    console.log('Magic happens on port ' + port)
  }
})

module.exports = app
