const express = require('express')
const mysqlConnection = require('../connection')
const router = express.Router();

router.get('/',(req,res)=>{
    //make database connection and query part
    mysqlConnection.query("select * from student",
    (err,rows,fields)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

module.exports = router
