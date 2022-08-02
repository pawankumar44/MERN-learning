const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { compare } = require('bcryptjs');

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email: {type:String,required: true,unique: true},
    password: {type:String,required: true},
    pic: {type:String,default:"https://cdn-icons-png.flaticon.com/512/23/23171.png"},
},{timestamps:true})

//method to match password
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//method to not save plane password
//pre means before saving
//takes next because its gonna be a middleware
userSchema.pre('save',async function (next){
    //if current password is not modified 
    if(!this.isModified){
        next() // move on to next i.e. don't run code after it 
    }
    //generate a new password 
    const salt = await bcrypt.genSalt(10)//the higher the number the more strong salt will be generate
    this.password = await bcrypt.hash(this.password,salt)
})


const User = mongoose.model("User",userSchema)

module.exports = User;