//import the required modules
const express= require('express');
const router= express.Router();

const {capturePayment,verifySignature}= require('../controllers/payment');
const {authenticateUser,isAdmin,isStudent,isInstructor}= require('../middlewares/authMiddleware');

router.post("/capturePayment",authenticateUser,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);

module.exports= router;