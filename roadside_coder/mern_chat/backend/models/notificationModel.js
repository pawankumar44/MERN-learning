const mongoose = require('mongoose');

const notifi = mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    messages : {
        type: mongoose.Schema.Types.Array
    }
})

const Notification = mongoose.model("Notification",notifi)

module.exports = Notification;