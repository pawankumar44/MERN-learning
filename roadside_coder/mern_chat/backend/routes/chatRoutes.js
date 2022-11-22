const express = require('express')
const {accessChat,fetchChats,createdGroupChat,
    renameGroup,addToGroup,removeFromGroup} = require('../controllers/chatControllers')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

//first go through protect middleware, so if user is not logged in then can't access the route
router.route('/').post(protect,accessChat)//for accessing or creating the chat
router.route('/').get(protect,fetchChats)//get all of chat from database of particular user 
router.route('/group').post(protect,createdGroupChat)//for creation of a group
router.route('/rename').put(protect,renameGroup)//rename a particular group
router.route('/groupadd').put(protect,addToGroup)//Add someone to group
router.route('/groupremove').put(protect,removeFromGroup)//remove someone or leave the group

// for notification



module.exports = router