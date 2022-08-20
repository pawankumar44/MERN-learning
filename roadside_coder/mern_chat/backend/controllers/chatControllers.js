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

const fetchChats = asyncHandler(async (req,res)=>{
    try {
        //check which user is logged in and query that user with its chats
        // Chat.find({users:{$elemMatch:{$eq: req.user._id}}}).then(
        //     result=>res.send(result)
        Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
                path: "latestMessage.sender",
                select: "name pic email"
            })
            res.status(200).send(results)
        })
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


const createdGroupChat = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message: "Please fill all the fields"})
    }
    //send users from front in stringyfy format and in backend we have to parse it
    var users = JSON.parse(req.body.users)
    if(users.length<2){
        return res.status(400)
        .send("More than 2 users are required to form a group chat")
    }
    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users:users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        //fetech group chat from database and send it back to user
        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


const renameGroup = asyncHandler(async(req,res)=>{
    const {chatId, chatName} = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,//find by this id
        {
            // chatName:chatName // chatname to be update
            //since key and value are same we can simply write it
            chatName
        },{
            //get updated value
            new: true//if we not gonna give it will return old name of the group
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    //if nothing inside update chat
    if(!updatedChat){
        res.status(404)
        throw new Error("Chat not found")
    }
    else{
        res.json(updatedChat)
    }
})


const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body
    const added = await Chat.findByIdAndUpdate(
        chatId,
        //push inside users array
        {
            $push: {users:userId},
        },
        {
            new:true
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(404)
        throw new Error("Chat not found")
    }
    else{
        res.json(added)
    }
})


const removeFromGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        //push inside users array
        {
            $pull: {users:userId},
        },
        {
            new:true
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        res.status(404)
        throw new Error("Chat not found")
    }
    else{
        res.json(removed)
    }
})

module.exports = {accessChat,fetchChats,createdGroupChat,
    renameGroup,addToGroup,removeFromGroup}