const express = require('express')
const path = require('path')
const app = express()
const port = 3000

//serve a folder using app.use middleware
app.use(express.static(path.join(__dirname,"public")))

// //creating own middleware
// const myMiddle = (req,res,next) =>{
//   console.log(req)
// }
// app.use(myMiddle)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//use url parameters
app.get('/hello/:name', (req, res) => {
  res.send('Hello World!' + req.params.name)
})

//for using file 
app.get('/testfile', (req, res) => {
  res.sendFile(path.resolve(__dirname,"index.html"))
})

//for sending json 
app.get('/jsonfile', (req, res) => {
  res.json({"name":"Pawan"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})