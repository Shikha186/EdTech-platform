// for forgot password - reset password controller
const User=require('../models/user');
const mailSender=require('../utils/mailSender');
const bcrypt=require('bcrypt');
const crypto = require("crypto");

//reset password token
exports.resetPasswordToken=async(req,res)=>{
    try{
        //get email from req body
    const {email}= req.body;
    //check email exists or not,   email validations 
    const user= await User.findOne({email:email});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User with this email does not exist"
        })
    }
    //generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time
    const updatedDetails=await User.findOneAndUpdate({email:email},{
        resetPasswordToken:token,
        resetPasswordTokenExpires: Date.now() + 5*60*1000 // token valid for 5 minutes
    },{new:true});
    console.log("updated user details with reset token",updatedDetails);
    //create url
    const url=`http://localhost:3000/update_password/${token}`;
    //send mail containing url
    await mailSender(email, "password reset link",`Click <a href=${url}>here</a> to reset your password. This link is valid for 5 minutes.`);
    return res.status(200).json({
        success:true,
        message:"Password reset link sent to your email"
    });

    }
    catch(error){
        console.log("error in reset password token controller",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in reset password token controller"
        })
    }
    
}

//reset password 
exports.resetPassword=async(req,res)=>{
    try{
        //data fetch
        const {token , newPassword, confirmPassword}= req.body;
        //validations
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"New password and confirm password do not match"
            })
        }
        //get user details based on token
        const userDetails=await User.findOne({resetPasswordToken:token});
        //if no user found , invalid token
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid token"
            })
        }
        //if user found, check for expiration, if expired token , send error
        if (Date.now() > userDetails.resetPasswordTokenExpires){
            return res.status(400).json({
                success:false,
                message:"Token expired , please try again"
            })
        }
        
        //if not expired, hash new password
        const hashedPassword= await bcrypt.hash(newPassword,10);
        //update user password and reset token fields
        await User.findOneAndUpdate({resetPasswordToken:token},{
            password:hashedPassword},
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        });
        //send mail of password changed successfully
    }
    catch(error){
        console.log("error in reset password controller",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in reset password controller"
        })
    }
}