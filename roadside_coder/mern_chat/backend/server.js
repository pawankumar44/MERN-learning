const express = require('express')
const dotenv = require('dotenv') // to use env file
const {chats} = require('./data/data')

const app = express()
dotenv.config();
app.get('/', function (req, res) {
  res.send('Hello Worldd')
})

app.get('/api/chat', function (req, res) {
    res.send(chats)
  })

//get single chat by id
app.get('/api/chat/:id', function (req, res) {
    // console.log(req.params.id)
    const singleChat = chats.find((c)=>c._id == req.params.id)
    res.send(singleChat)
  })


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server has been started on Port ${PORT}`))