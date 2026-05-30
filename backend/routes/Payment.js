//import the required modules
const express= require('express');
const router= express.Router();
console.log("");
console.log("Payment Router initialized");


const {capturePayment,verifySignature}= require('../controllers/payment');
const {authenticateUser,isAdmin,isStudent,isInstructor}= require('../middlewares/authMiddleware');
// console.log("capturePayment:", capturePayment);
// console.log("verifySignature:", verifySignature);
// console.log("authenticateUser:", authenticateUser);
// console.log("isStudent:", isStudent);

router.post("/capturePayment",authenticateUser,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);

module.exports= router;