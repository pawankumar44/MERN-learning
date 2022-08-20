const express = require('express')
const { sendMessage } = require('../controllers/messageController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').post(protect,sendMessage)//protect middleware and send message controller

//fetch all messages of one single chat
// router.route('/:chatId').get(protect,allMessages)

module.exports = router