const mongoose = require('mongoose')

//create a function to connect with database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            // useFindAndModify : true,
        });
        console.log(`MongoDB connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        //exit the process
        process.exit();
    }
}

module.exports = connectDB