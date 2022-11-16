const express = require('express')
const dotenv = require('dotenv') // to use env file
const {chats} = require('./data/data')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const {errorHandler,notFound} = require("../backend/middlewares/errorMiddleware")
// const cors = require('cors')

dotenv.config();

//connect to database below .env config
connectDB()

const app = express()

// app.use(express.json());//tell server to accept the json data
// app.use(cors({
//   origin: "http://localhost:3000"
// }))

app.get('/', function (req, res) {
  res.send('API running successfully')
})

// app.get('/api/chat', function (req, res) {
//     res.send(chats)
//   })

// //get single chat by id
// app.get('/api/chat/:id', function (req, res) {
//     // console.log(req.params.id)
//     const singleChat = chats.find((c)=>c._id == req.params.id)
//     res.send(singleChat)
//   })

//making endpoint for users
app.use('/api/user',userRoutes)//all further work done from userRoutes module
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

//error handling middleware
//for not found url
app.use(notFound)

//normal error handler
app.use(errorHandler)


const PORT = process.env.PORT || 5000
//asign server to a variable because we need in socket.io
const server = app.listen(PORT,console.log(`Server has been started on Port ${PORT}`))

// Set-up socket.io
//acquire and call the function
const io = require('socket.io')(server,{
  //pingTimeout timeout if no communication occur to save bandwidth
  pingTimeout : 60000,
  
  cors:{
    // origin: "http://localhost:3000/",
    origin: "http://localhost:3000",
    // handlePreflightRequest: (req, res) => {
    //   res.writeHead(200,{
    //     "Access-Control-Allow-Origin":"http://localhost:3000",
    //     "Access-Control-Allow-Methods":"GET,POST",
    //     "Access-Control-Allow-Headers":"my-custom-header",
    //     "Access-Control-Allow-Credentials":true,
    //   })
    //   res.end();
    // }
  },
})

//create a connection by giving "connection" name
io.on("conncetion",(socket) => {
  console.log("connected to socket.io")

  //whenever user connected to the app he should be connected to his own personal socket
  //this will take user data from frontend
  //frontend will send data and we will join a room
  socket.on('setup',(userData)=>{
    //room will be exclusive for that particular user only
    socket.join(userData._id);
    // console.log(userData._id)
    socket.emit("connected")
  })

  //when we click on chat it creates room for users 
  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log("User Joined Room: " + room)
  })

  socket.on('new message',(newMessageRecieved)=>{
    var chat = newMessageRecieved.chat;
    if(!chat.users) return console.log("chat.users not defined")

    //emit message to all of the user of the room in group chat not me
    chat.users.forEach(users =>{
      if(users._id === newMessageRecieved.sender._id)return;

      socket.in(users._id).emit("message recieved",newMessageRecieved)
    })
  })

})