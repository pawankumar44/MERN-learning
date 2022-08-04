const express = require('express')
const router = express.Router()
const {protect} = require("../middlewares/authMiddleware")
const {registerUser,authUser, allUsers} = require('../controllers/userControllers')


//we do from both the way
router.route('/').post(registerUser).get(protect,allUsers)//for sign up, if same routing address the we can append antoher route to it

router.post('/login',authUser)//for login, can be done in both syntax

// router.route('/').get(allUsers)

module.exports = router