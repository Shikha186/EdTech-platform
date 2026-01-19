const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user');


//auth
exports.authenticateUser= async (req,res,next)=>{
    try{
        //extract token
        const token= req.cookies.token || req.header("Authorization").replace("Bearer ","") || req.body.token;

        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access , token missing"
            })
        }
        //verify token
        try{
            const decoded= jwt.verify(token,process.env.JWT_SECRET);
            console.log("decoded token:",decoded);
            req.user= decoded;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access , invalid token"
            })
        }
        next();
        
    }
    catch(error){
        console.log("Error in auth middleware:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in auth middleware"
        })
    }
}

//isStudent
exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="Student"){
            return res.status(403).json({
                success:false,
                message:"Access denied , students only resource"
            })
        }
        next();

    }
    catch(error){
        console.log("Error in isStudent middleware:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in isStudent middleware"
        })
    }
}

//isInstructor
exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="Instructor"){
            return res.status(403).json({
                success:false,
                message:"Access denied , instructors only resource"
            })
        }
        next();

    }
    catch(error){
        console.log("Error in isInstructor middleware:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in isInstructor middleware"
        })
    }
}


//isAdmin
exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="Admin"){
            return res.status(403).json({
                success:false,
                message:"Access denied , admins only resource"
            })
        }
        next();

    }
    catch(error){
        console.log("Error in isAdmin middleware:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in isAdmin middleware"
        })
    }
}
