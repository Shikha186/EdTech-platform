//import required modules
const express= require('express');
const router= express.Router();
// console.log(" ");
// console.log("Profile Router initialized");
const {updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses}=require('../controllers/Profile');
const {authenticateUser,isAdmin,isInstructor,isStudent}= require('../middlewares/authMiddleware');

// console.log("updateProfile:", updateProfile);
// console.log("deleteAccount:", deleteAccount);
// console.log("getAllUserDetails:", getAllUserDetails);
router.put("/updateProfile",authenticateUser,updateProfile);
router.delete("/deleteAccount",authenticateUser,deleteAccount);
router.get("/getAllUserDetails",authenticateUser,getAllUserDetails);
router.put("/updateDisplayPicture",authenticateUser,updateDisplayPicture);
router.get("/getEnrolledCourses",authenticateUser,getEnrolledCourses);
module.exports= router;