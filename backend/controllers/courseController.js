const Course=require('../models/course');
const Category=require('../models/category');
const User=require('../models/user');
const ratingAndReviews=require('../models/ratingsAndReviews')
const {uploadImageToCloudinary}=require('../utils/imageUploader');

//create course handler
exports.createCourse=async(req,res)=>{
    try{
        //fetch data from req body
        const {courseName, courseDescription, whatYouWillLearn, price, category, tags}=req.body;

        //fetch thumbnail from req file
        const thumbnail=req.files.thumbnail;
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tags){
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
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.COURSE_THUMBNAIL_FOLDER);

        //create course entry in db
        const courseDetails=await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tags:tags
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


// Get all courses of a specific instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user token
        const instructorId = req.user.id;

        // Find all courses belonging to this instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            data: instructorCourses,
        });
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};


//fetch all courses handler

exports.showAllCourses=async(req,res)=>{
    try{
        const getALLcourses=await Course.find({},{
            courseName:true,
            courseDescription:true,
            price:true,
            thumbnail:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
            category:true,
        }).populate("instructor").populate("category").exec();

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

// edit course handler
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;

        // 1. Find the existing course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 2. Check if a new thumbnail was uploaded
        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.COURSE_THUMBNAIL_FOLDER
            );
            course.thumbnail = thumbnailImage.secure_url;
        }

        // 3. Update only the fields that were provided in the request
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                // Ignore courseId as it shouldn't be updated
                if (key === "courseId") continue;

                // Tags are sent as a stringified array from FormData, so we must parse them
                if (key === "tags") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        // 4. Save the updated course
        await course.save();

        // 5. Fetch the updated course and populate all necessary fields
        // This deep population ensures the frontend has the latest sections/subsections for Step 2
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // 6. Return response
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse, // Matches response?.data?.data in your frontend courseAPI.js
        });

    } catch (error) {
        console.error("Error in editing course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while editing course",
            error: error.message,
        });
    }
};


// delete course handler
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // 1. Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 2. Unenroll students or handle clean-up if needed (optional)

        // 3. Delete sections and subsections associated with the course
        const sections = course.courseContent;
        for (const sectionId of sections) {
            // Find section to get its subsections
            const section = await Section.findById(sectionId);
            if (section) {
                // Delete all subsections of this section
                await SubSection.deleteMany({ _id: { $in: section.subSection } });
                // Delete the section itself
                await Section.findByIdAndDelete(sectionId);
            }
        }

        // 4. Remove course reference from the Instructor's profile
        await User.findByIdAndUpdate(course.instructor, {
            $pull: { courses: courseId },
        });

        // 5. Remove course reference from the Category
        await Category.findByIdAndUpdate(course.category, {
            $pull: { courses: courseId },
        });

        // 6. Finally, delete the course itself
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message,
        });
    }
};