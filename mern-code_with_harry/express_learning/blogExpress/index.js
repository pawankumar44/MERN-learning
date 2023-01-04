const express = require('express')
const path = require('path')
const app = express()
const port = 3000

//serve a folder using app.use middleware
//static folder will have js, css and etc.
app.use(express.static(path.join(__dirname,"static")))

//access the route file which will router further
app.use('/',require(path.join(__dirname,'routes/blog.js')))


app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`)
})