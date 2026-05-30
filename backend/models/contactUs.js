const mongoose = require('mongoose');

const contactUsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    contactNumber:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports= mongoose.model("ContactUs",contactUsSchema);