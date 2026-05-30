const {instance} = require("../config/razorpay");
const Course = require("../models/course");
const Category = require("../models/category");
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

//capture payment and initiate the razorpay order
exports.capturePayment=async (req,res)=>{
    try{
        //get userId and courseId from req body
        const {courseId}=req.body;
        const userId=req.user.id;
        //validation
        // validate user
        const userDetails= await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not Found"
            })
        }
        // validate courseId
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"CourseId is required"
            })
        }

        //fetch course details from db
        const courseDetails= await Course.findById(courseId);
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course not Found"
            })
        }
        //check if user is already enrolled in the course
        const uid= new mongoose.Types.ObjectId(userId);
        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"User is already enrolled in the course"
            });
        }
        
        //capture payment and create order
        const amount= courseDetails.price;
        const currency="INR";
        const options={
            amount:amount*100, //amount in paise
            currency:currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId:userId,
            }
        };

        //initiate the payment using razorpay
            const paymentResponse= await instance.orders.create(options);
            console.log("payment response from razorpay",paymentResponse);
            //return response
            return res.status(200).json({
                success:true,
                message:"Payment initiated successfully",
                courseName:courseDetails.courseName,
                courseDescription:courseDetails.courseDescription,
                thumbnail:courseDetails.thumbnail,
                amount:paymentResponse.amount,
                currency:paymentResponse.currency,
                orderId:paymentResponse.id,
            });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }     
        

}



//verify signature of razorpay and server
exports.verifySignature=async(req,res)=>{
    try{
        const webhookSecret= process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature=req.headers["x-razorpay-signature"];
        const shasum= crypto.createHmac("sha256",webhookSecret);//hash based message authentication code that gives object which need to be converted to string 
        shasum.update(JSON.stringify(req.body));
        const digest= shasum.digest("hex");
        if(signature === digest){
            console.log("payment is authorized");
            //add course to user's enrolled courses list and add user to course's students enrolled list
            const {courseId, userId}= req.body.payload.payment.entity.notes;//we have sent courseId and userId in notes while creating order
            try{
                //fulfill the enrollment process
                const enrolledCourse= await Course.findByIdAndUpdate(
                    {_id:courseId},
                    {$push:{studentsEnrolled:userId}},
                    {new:true}
                );
                if(!enrolledCourse){
                    return res.status(400).json({
                        success:false,
                        message:"Course not found"
                    });
                }
                const enrolledUser= await User.findByIdAndUpdate(
                    {_id:userId},
                    {$push:{Courses:courseId}},
                    {new:true}
                );
                if(!enrolledUser){
                    return res.status(400).json({
                        success:false,
                        message:"User not found"
                    });
                }
                console.log("enrollment successful");
                //send enrollment email to user
                const emailResponse= await mailSender(enrolledUser.email, "congratulations on enrolling the course", courseEnrollmentEmail(enrolledUser.firstName, enrolledCourse.courseName));//make courseEnrollmentEmail template that takes user's first name and course name as parameters and returns the email template
                console.log("enrollment email sent successfully",emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Payment verified and enrollment successful"
                });
            }catch(error){
                console.log("error in enrolling the course",error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
            
        }
        else{
            console.log("payment verification failed");
            return res.status(400).json({
                success:false,
                message:"Invalid signature"
            });
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}