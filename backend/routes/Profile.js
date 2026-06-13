//import required modules
const express= require('express');
const router= express.Router();
console.log(" ");
console.log("Profile Router initialized");
const {updateProfile,deleteAccount,getAllUserDetails}=require('../controllers/Profile');
const {authenticateUser,isAdmin,isInstructor,isStudent}= require('../middlewares/authMiddleware');

// console.log("updateProfile:", updateProfile);
// console.log("deleteAccount:", deleteAccount);
// console.log("getAllUserDetails:", getAllUserDetails);
router.put("/updateProfile",authenticateUser,updateProfile);
router.delete("/deleteAccount",authenticateUser,deleteAccount);
router.get("/getAllUserDetails",authenticateUser,getAllUserDetails);

module.exports= router;