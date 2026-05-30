const RatingAndReview = require("../models/ratingsAndReviews");
const Course = require("../models/course");
const { $where } = require("../models/user");
const mongoose = require("mongoose");


//create rating and review handler
exports.createRatingAndReview= async(req,res)=>{
    try{
        //fetch data from req body
        const userId=req.user.id;
        const {rating, review, courseId}=req.body;
        //validation
        if(!rating || !review || !courseId){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
            });
        }
        //check if user is eligible to give rating and review (i.e has the user enrolled in the course)
        const courseDetails= await Course.findById({_id:courseId, studentsEnrolled: {$elemMatch: {$eq: userId}}},);
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"User is not enrolled in the course"
            });
        }
        //check if user has already given rating and review for the course
        const alreadyReviewed= await RatingAndReview.findOne({courseId:courseId, userId:userId});
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"User has already given rating and review for this course"
            });
        }
        //create rating and review entry in db
        const ratingAndReviewDetails= await RatingAndReview.create({
            rating:rating,
            review:review,
            course:courseId,
            user:userId
        });
        //update course with new rating and review object id
        await Course.findByIdAndUpdate(
            {_id:courseId},
            {$push:{ratingAndReviews:ratingAndReviewDetails._id}},
            {new:true}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"rating and review created successfully",
            ratingAndReviewDetails:ratingAndReviewDetails
        });


    }
    catch(error){
        console.log("error in creating rating and review",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


//get average rating and reviews for a course handler
exports.getAverageRatingAndReviews= async(req,res)=>{
    try{
        //fetch courseId from req params
        const {courseId}=req.body.courseId;
        //validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"CourseId is required"
            });
        }
        //calculate average rating and get all reviews for the course
        const result= await RatingAndReview.aggregate([
            {$match:{courseId: new mongoose.Types.ObjectId(courseId)}},
            {$group:{
                _id:null,
                averageRating:{$avg:"$rating"},
                reviews:{$push:"$review"}
            }}
        ]);

        //return response
        if(result.length===0){
            return res.status(200).json({
                success:true,
                message:"No ratings or reviews found for this course"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Average rating and reviews fetched successfully",
            averageRating: result[0].averageRating,
            reviews: result[0].reviews
        });

    }
    catch(error){
        console.log("error in getting average rating and reviews",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


//get all ratings and reviews for a course handler
exports.getAllRatingsAndReviewsOfSpecificCourse= async(req,res)=>{
    try{
        //fetch courseId from req params
        const {courseId}=req.body.courseId;
        //validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"CourseId is required"
            });
        }
        //get all ratings and reviews for the course
        const ratingsAndReviews= await RatingAndReview.find({courseId:courseId}).populate({path:"userId", select:"firstName lastName email image"}).sort({rating:"desc"}).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched successfully",
            ratingsAndReviews:ratingsAndReviews
        });


    }catch(error){
        console.log("error in getting all ratings and reviews",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


//get all ratings and reviews of all courses
exports.getAllRatingsAndReviews= async(req,res)=>{
    try{
        //get all ratings and reviews for all courses
        const ratingsAndReviews= await RatingAndReview.find({}).populate({path:"userId", select:"firstName lastName email image"}).populate({path:"courseId", select:"courseName"}).sort({rating:"desc"}).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched successfully",
            ratingsAndReviews:ratingsAndReviews
        });
    }catch(error){
        console.log("error in getting all ratings and reviews",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//update rating and review handler