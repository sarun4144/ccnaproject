const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
       await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connect mongoose DB')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;