const express = require('express');
const router = express.Router();
const User = require("../mongoose_models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//jwt authentication
const JWT_SECRET = "Pawanisalazy$guy";//use this to sign jwt


//create a User using : POST by endpoint "/api/auth". Doesn't require auth . No login required
router.post('/createuser',[
    body("email","Enter a valid email").isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the same email exists already or not 

    try {
        let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error : "Sorry a user with this email already exists"})
    }

    //salting the password
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt) ;
    //create a new user 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: "Please enter unique value for email"})});
    // res.send(req.body);

    // obj = {
    //     a: 'thios',
    //     number : 34
    // }

    //do jwt
    const data = {
        user : {
            id : user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    // console.log(jwtData);
    // res.json({"nice":"nice"})
    res.json({authToken})
    } catch (error) {
        console.error(error.message);
        req.status(500).send("some error occured")
    }
    
})

//Authenticate a User using : POST by endpoint "/api/auth/login". No login required
router.post('/login',[
    body("email","Enter a valid email").isEmail(),
    body("password","Password can\'t be string").exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //extract email and password through destructuring
    const {email,password} = req.body;
    try {
        //check whether credentials exists or not 
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        //compare whether the password is correct or not ,user.password = password stored in the db
        const passwordCompare  = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        else {
            //if everything fine then we will send the payload(data of user)
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})


module.exports = router