const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires:300 // OTP expires in 5 minutes
    }
})

// verification email function 
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse= await mailSender(email,"OTP Verification",`Your OTP for verification is ${otp}. It is valid for 5 minutes.`);
        console.log("otp verification mail sent successfully",mailResponse);

    }catch(error){
        console.log("otp verification error while sending mail",error);
    }

};
// pre-save hook to send OTP email
OTPSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports= mongoose.model("OTP",OTPSchema);