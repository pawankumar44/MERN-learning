const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    //we need user id to differentiate the notes
    //we will use foreign key concept here
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user' //refernce model(of which collection the above foregin key used)
    },
    title:{
        type:String,
        required: true, 
    },
    description:{
        type:String,
        required: true, 
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now 
    },
  });

  module.exports = mongoose.model('notes',NotesSchema);