const express=require("express");
const router= express.Router();
console.log(" ");
console.log("Contact Router initialized");

const {createQuery}= require('../controllers/contactUs');
// console.log("createQuery:", createQuery);
router.post("/createQuery",createQuery);

module.exports= router;