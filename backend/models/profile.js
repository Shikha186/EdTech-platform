const e = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    gender:{
        type:String,
        enum:['Male','Female','Other'],
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:String,
        trim:true
    }
})
module.exports = mongoose.model('Profile', userSchema);