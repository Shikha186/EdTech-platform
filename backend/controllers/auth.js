const User=require("../models/user");
const  OTP=require("../models/otp");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/profile");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");

//send opt for verification
exports.sendOTP=async(req,res)=>{
    try{
        //fetch email from request body
        const {email}=req.body;

        //check if email already exist in database or not
        const checkEmail= await User.findOne({email});
        if(checkEmail){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }

        //generate otp 
        const otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("otp generated",otp);

        //check otp unique or not
        let result=await OTP.findOne({otp: otp});
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result=await OTP.findOne({otp: otp});
        }

        //create entry in db
        const otpPayload={email,otp};
        const otpBody= await OTP.create(otpPayload);
        console.log(otpBody);
        console.log("sendOTP controller hit");


        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        }); 

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//signup controller
exports.signUp=async(req,res)=>{
    try{
        //fetch details from request body
        const {firstname,lastname,email,password,confirmPassword,accountType,additionalDetails,otp}=req.body;
        // validate data
        if(!firstname || !lastname || !email || !password || !confirmPassword || !accountType || !otp){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //match password and confirm password
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match"

            })
        }
        //check if user already exists
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }
        //find most resent otp in db
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp",recentOtp);
        //validate otp
        if(recentOtp.length==0 ){
            return res.status(400).json({
                success:false,
                message:"OTP not found, please request for a new OTP"
            })
        }else if(recentOtp[0].otp!=otp){
            return res.status(400).json({
                success:false,
                message:" Invalid Otp entered"
            })
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //profile details 
        const profileDetails= await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
            address:null,
        });
        //create user in db, dicebar api is used to create random avatar for user based on their name
        const user=await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstname} ${lastname}`
        });
        console.log("user created",user);

        return res.status(201).json({
            success:true,
            message:"User created successfully",
            user,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//login controller
exports.Login=async(req,res)=>{
    try{
        //fetch email and password from request body
        const {email,password}=req.body;
        //validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //check user exists or not
        const user= await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exist"
            })
        }
        // match password
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        //generate Jwt token
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        const token=await jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d"
        });
        user.token=token;
        user.password=undefined;
        console.log("user logged in successfully",user);
        //create cookies
        const options={
            expires:new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"User logged in successfully",
            user,
            token
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//changepassword controller
exports.changePassword=async(req,res)=>{
    //get data from request body
    //get oldpassword, newpassword , confirm password
    //validation
    //update password in db
    //send mail of password updated
    //return response
}