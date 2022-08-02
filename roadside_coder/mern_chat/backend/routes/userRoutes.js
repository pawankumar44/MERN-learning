const express = require('express')
const router = express.Router()
const {registerUser,authUser} = require('../controllers/userControllers')


//we do from both the way
router.route('/').post(registerUser)//for sign up

router.post('/login',authUser)//for login

module.exports = router