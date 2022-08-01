const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const router = require('../routes/userRoutes')
const generateToken = require('../config/generateToken')
//any error occurred we need to handle those error 
//we handle by using a package express-async-handler

const registerUser = asyncHandler(async (req,res)=> {
    const { name, email, password, pic } = req.body 
    //check if any of these undefined , we gonna through a error
    //pic is optional
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Enter all the fields")
    }
    //check user already exists in database or not
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists");
    }

    //create a new user
    const user = await User.create({
        name,email,password,pic
    })
    //if user create successfully send response to user
    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else {
        res.json.status(400)
        throw new Error("Failed to create the user")
    }
})

//export the function. 
//this will not be gonna default export
module.exports = {registerUser}