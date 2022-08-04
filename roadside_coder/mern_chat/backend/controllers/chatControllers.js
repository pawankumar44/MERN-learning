const asyncHandler = require('express-async-handler')
const Chat = require("../models/chatModels")
const User = require("../models/userModel")
//creating or feteching one on one chat
const accessChat = asyncHandler(async(req,res)=>{
    //get user id
    const {userId} = req.body
    //check if the chat with user id exists then return it
    //if doesn't exist then create the app with this user id
    if(!userId){
        console.log("UserId param not sent with request")
        return res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,//since it is one on one chat
        $and:[
            //current user and user id we have sent
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
        //if chat found then populate the users array
        //populate latest message
    }).populate("users","-password").populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select: "name pic email",
    })

    //check if chat exists
    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{
        //create a new chat
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id,userId],
        }
        //now query it and save in database
        try {
            const createdChat = await Chat.create(chatData)
            //now send it to user
            const FullChat = await Chat.findOne({
                _id:createdChat._id}).populate(
                    "users",
                    "-password"
                )
            //send it
            res.status(200).json(FullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

module.exports = {accessChat}