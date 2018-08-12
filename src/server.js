const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')

const cacheRoute = require('./routes/cache.route')

dotenv.config()

const environment = process.env.NODE_ENV


// connect to mongoDB
mongoose.connect(process.env.DB_URL)
mongoose.connection.on('connected', () => {
  console.info('Opened connection to mongo db')
})

const app = express()

if (environment === 'development') {
  app.use(logger('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add endpoints
app.use('/cache', cacheRoute)

// Fetch port value from env var or use default
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.info(`App started on port ${port} on ${environment} environment`)
})
