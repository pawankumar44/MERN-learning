const express = require('express');
const router = express.Router();
const User = require("../mongoose_models/User")
const { body, validationResult } = require('express-validator');

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
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: "Please enter unique value for email"})});
    // res.send(req.body);

    // obj = {
    //     a: 'thios',
    //     number : 34
    // }
    res.json({"nice":"nice"})
    } catch (error) {
        console.error(error.message);
        req.status(500).send("some error occured")
    }
    
})

module.exports = router