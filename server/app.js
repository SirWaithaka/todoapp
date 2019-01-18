const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

const url = 'mongodb://127.0.0.1:27017/Todoapp'
mongoose.connect(url)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./src/routes')(app)

module.exports = app