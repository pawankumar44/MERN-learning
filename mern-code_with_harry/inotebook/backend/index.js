const connectToMongo = require("./db");

connectToMongo();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//we can write all the routes in same place but this is not the good habit of coding and can access it by appending it with path

// app.get('/v1/login', (req, res) => {
//     res.send('Hello login!')
//   })

// app.get('/v2/signup', (req, res) => {
//     res.send('Hello signup!')
//   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})