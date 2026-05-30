const Course=require('../models/course');
const Category=require('../models/category');
const User=require('../models/user');
const {UploadImageToCloudinary}=require('../utils/imageUploader');

//create course handler
exports.createCourse=async(req,res)=>{
    try{
        //fetch data from req body
        const {courseName, courseDescription, whatYouWillLearn, price, category}=req.body;

        //fetch thumbnail from req file
        const thumbnail=req.files.thumbnail;
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
            })
        }

        //check for instructor
        const instructorId=req.user.id;
        const instructorDetails=await User.findById(instructorId);
        console.log("instructor details",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor not found"
            })
        }

        //check if category is valid
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        //upload thumbnail to cloudinary
        const thumbnailImage=await UploadImageToCloudinary(thumbnail,process.env.COURSE_THUMBNAIL_FOLDER);

        //create course entry in db
        const courseDetails=await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })
        //add the new course to instructor's course list
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id}, 
            {$push:{courses:courseDetails._id}},
            {new:true}
        )

        //update category with new course
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {$push:{courses:courseDetails._id}},
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"course created successfully",
            courseDetails:courseDetails
        })
    }catch(error){
        console.log("error in creating course",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//fetch all courses handler

exports.showAllCourses=async(req,res)=>{
    try{
        const getALLcourses=await Course.find({},{
            courseName:true,
            courseDescription:true,
            price:true,
            thumbnail:true,
            ratingandReviews:true,
            studentsEnrolled:true
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"all courses fetched successfully",
            courses:getALLcourses
        })

    }catch(error){
        console.log("error in fetching all courses",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get course details handler
exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body;
        const courseDetails=await Course.findById({_id:courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"course details fetched successfully",
            courseDetails:courseDetails
        })

    }
    catch(error){
        console.log("error in fetching course details",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}