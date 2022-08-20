const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModels')
const Message = require('../models/messageModel')
const User = require('../models/userModel')

const sendMessage = asyncHandler(async(req,res)=>{
    const {content,chatId} = req.body
    if(!content || !chatId){
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    try {
        //query our data base
        var message = await Message.create(newMessage)
        //whatever we got inside message we will have to populate
        message = await message.populate("sender","name pic")
        message = await message.populate("chat")
        //populate chat users in message variable
        message = await User.populate(message,{
            path:"chat.users",
            select: "name pic email"
        })
        //find by id and update the chat with latest message
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


//fetch all messages of particular chat
const allMessages = asyncHandler(async(req,res)=>{
    try {
        const messages = await Message.find({
           chat: req.params.chatId //get chat id from link params
        })
        //now after getting object we need to populate it
        .populate(
            "sender",
            "name pic email"
        )
        .populate("chat")
        //now send it
        res.json(messages)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports = {sendMessage,allMessages}