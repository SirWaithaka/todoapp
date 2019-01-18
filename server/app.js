const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const url = 'mongodb://127.0.0.1:27017/Todoapp'
mongoose.connect(url)

app.use(bodyParser.json())

require('./src/routes')(app)

module.exports = app