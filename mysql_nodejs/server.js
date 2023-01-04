const express = require('express')
const mysqlConnection = require('./connection')
const bodyParser = require('body-parser')
const student = require('./routes/student')

var app = express()
app.use(bodyParser.json())//this configures the body parser

app.use('/student',student)

app.listen(3000)//start app at 3000