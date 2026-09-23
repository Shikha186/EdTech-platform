//already entered null values in all profile options during signup this means profile is already created we just need to update function to update its val from null to original user details

const Profile=require("../models/profile");
const User=require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


exports.updateProfile= async(req, res)=>{
    try{
        //get data 
        const {dateOfBirth="",about="", contactNumber, gender}=req.body;
        //get user id
        const userId=req.user.id;
        //validation
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"user is not authorized to update profile"
            });
        }
        //find profile
        const userDetails= await User.findById(userId);
        const profileId= userDetails.additionalDetails;
        const profileDetails= await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth=dateOfBirth || null;
        profileDetails.gender=gender||null;
        profileDetails.contactNumber=contactNumber ||null;
        profileDetails.about=about ||null;
        await profileDetails.save();

        //return reponse
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error,
            message:"profile couldn't be updated"
        })

    }
}



//DeleteAccount handler function
exports.deleteAccount= async(req,res) =>{
    try{
        // get user id
        const userId=req.user.id;
        //validation
        const userDetails= await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not Found"
            })
        }
        //delete profile
        const profileId=userDetails.additionalDetails;
        await Profile.findByIdAndDelete({_id:profileId});
        // unenroll user from enrolled user
        //delete user
        await User.findByIdAndDelete({_id:userId});
        //return response
        return res.status(200).json({
            success:true,
            message:"user account deleted"
        })

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Account of user couldn't be deleted"
        })

    }

}
// how can we schedule delete acc request
//cron job



//get all userdetails handler function
exports.getAllUserDetails = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "got all user Details",
            userDetails
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "failed, cannot get all user details",
            error: error.message
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        // Fetch the file sent from the frontend FormData
        const displayPicture = req.files?.displayPicture;
        const userId = req.user.id;

        if (!displayPicture) {
            return res.status(404).json({
                success: false,
                message: "Display picture not found",
            });
        }

        // Upload the image to Cloudinary (Replace 'StudySphere' with your preferred folder name)
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME || "StudySphere",
            1000,
            1000
        );

        console.log("Cloudinary Upload Response: ", image);

        // Update the user's image field in the database
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate("additionalDetails");

        return res.status(200).json({
            success: true,
            message: "Image Updated successfully",
            data: updatedProfile,
        });
        
    } catch (error) {
        console.error("Error updating display picture:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Find the user and populate the courses array
        const userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent", // Assuming your Course model references sections here
                    populate: {
                        path: "subSection", // Assuming Sections reference videos here
                    }
                }
            })
            .populate("courseProgress")
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        // 2. Calculate progress for each enrolled course
        let coursesWithProgress = userDetails.courses.map((course) => {
            // Count total videos (subsections) in the course
            let totalSubSections = 0;
            course.courseContent.forEach((section) => {
                totalSubSections += section.subSection.length;
            });

            // Find the progress document that matches this course's ID
            let progressDoc = userDetails.courseProgress.find(
                (progress) => progress.courseId.toString() === course._id.toString()
            );

            // Calculate the percentage
            let completedVideosCount = progressDoc ? progressDoc.completedvideos.length : 0;
            let progressPercentage = 0;
            
            if (totalSubSections > 0) {
                progressPercentage = Math.round((completedVideosCount / totalSubSections) * 100);
            }

            // Return the course data merged with the new progress field
            return {
                ...course.toObject(),
                progressPercentage,
                totalSubSections,
                completedVideosCount
            };
        });

        return res.status(200).json({
            success: true,
            data: coursesWithProgress,
        });

    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

