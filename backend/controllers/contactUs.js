const ContactUs=require("../models/contactUs");
const mailSender=require("../utils/mailSender");
const {contactUsEmail}=require("../mail/templates/contactUsEmail");



//create query/message sent by person to admin when msg is sent sender receives a success and admin receives mail with the query details
exports.createQuery=async(req,res)=>{
    try{
        //fetch data from req body
        const {name,email,message,contactNumber}=req.body;

        //create new contact us entry
        const newContactUs=new ContactUs({
            name,
            email,
            message,
            contactNumber
        });

        //save to database
        await newContactUs.save();
        //send mail to admin with the query details
        await mailSender(
            process.env.ADMIN_EMAIL,
            "New Query Received",
            contactUsEmail(name, email, message, contactNumber)
        );
        //send mail to sender confirming receipt of query
        await mailSender(
            email,
            "Query Received",
            `Dear ${name},\n\nThank you for reaching out to us. We have received your query and will get back to you as soon as possible.\n\nBest regards,\nThe Team`
        );

        //send success response
        return res.status(201).json({
            success:true,
            message:"Query submitted successfully"
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}