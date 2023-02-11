const http = require('http')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('conneted to MongoDB')
  }).catch((error) => {
    logger.error(`error conneting to MongoDB: ${error}`)
  })

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app