const express = require('express');
const router = express.Router();
const User = require("../mongoose_models/User")

//create a User using : POST by endpoint "/api/auth". Doesn't require auth
router.post('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.send(req.body)

    // obj = {
    //     a: 'thios',
    //     number : 34
    // }
    // res.json(obj)
})

module.exports = router