//import the required modules
const express= require('express');
const router= express.Router();
console.log("user Router initialized");
const {sendOTP,signUp,Login,changePassword}= require('../controllers/auth');
const {authenticateUser,isAdmin,isInstructor,isStudent}= require('../middlewares/authMiddleware');
const {resetPasswordToken,resetPassword}= require('../controllers/resetPassword');
const {updateDisplayPicture}= require('../controllers/auth');



// console.log("sendOTP:", sendOTP);
// console.log("signUp:", signUp);
// console.log("Login:", Login);
// console.log("changePassword:", changePassword);
router.get("/hello", (req,res)=>{
    res.send("Hello User Route");
});
//auth routes
router.post("/sendOTP",sendOTP);
router.post("/signUp",signUp);
router.post("/Login",Login);
router.post("/changePassword",authenticateUser,changePassword);

//reset password routes
// console.log("resetPasswordToken:", resetPasswordToken);
// console.log("resetPassword:", resetPassword);
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

//change dp route
router.put(
    "/updateDisplayPicture",
    authenticateUser,
    updateDisplayPicture
);


module.exports= router;