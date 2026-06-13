//already entered null values in all profile options during signup this means profile is already created we just need to update function to update its val from null to original user details

const Profile=require("../models/profile");
const User=require("../models/user");


exports.updateProfile= async(req, res)=>{
    try{
        //get data 
        const {dateOfBirth="",about="", contactNumber, gender}=req.body;
        //get user id
        const userId=req.user.id;
        //validation
        if(!contactNumber || !gender || !userId){
            return res.status(401).json({
                success:false,
                message:"all fields are required"
            });
        }
        //find profile
        const userDetails= await User.findById(userId);
        const profileId= userDetails.additionalDetails;
        const profileDetails= await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        profileDetails.about=about;
        await profileDetails.save();

        //return reponse
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails
        })

    }catch(error){
        return res.status(401).json({
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
exports.getAllUserDetails=async (req,res)=>{
    try{
        //get id
        const userId=req.user.id;
        console.log("userId in getAllUserDetails",userId);
        //get data
        const userDetails= await User.findById(userId).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"got all user Details",
            userDetails
        })
    }catch(error){
        return req.status(401).json({
            success:false,
            message:"failed, cannot get all user details",
            error:error
        })

    }

}


