const Section=require('../models/section');
const SubSection=require('../models/subSection');
const {uploadImageToCloudinary}=require('../utils/imageUploader');
const env=require('dotenv').config();



//create subsection handler
exports.createSubSection=async(req,res)=>{
    try{
        //fetch data from req body
        const{sectionId, title, timeDuration,description}=req.body;
        //extract video file from req file
        const video=req.files.videoFile;
        //data validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
             })
         }
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.VIDEO_FOLDER);
        //create subsection entry in db
        const SubSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
            //videoPublicId:uploadDetails.public_id
        });
        //update section with new subsection object id
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$push:{subSection:SubSectionDetails._id}},
            {new:true}
        ).populate("subSection");
        // how to use populate here to return the updated section details with subsection details instead of just id's  
        
        
        //return response with success message
        return res.status(200).json({
            success:true,
            message:"subsection created and added to section successfully",
            data:updatedSection
        })

    }
    catch(error){
        console.log("error in creating subsection",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//update subsection handler
exports.updateSubSection=async(req,res)=>{
    try{
        //fetch data from req body
        const {subSectionId, title, timeDuration, description}=req.body;
        //extract video file from req file
        const video=req.files.videoFile;
        //data validation
        if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
             })
         }
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.VIDEO_FOLDER);
        //update subsection details in db   
        await SubSection.findByIdAndUpdate(
            {_id:subSectionId},
            {   title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
                //videoPublicId:uploadDetails.public_id
            },
            {new:true}
        );
        //return response with success message
        return res.status(200).json({
            success:true,
            message:"subsection updated successfully"
        });    
        

    }
    catch(error){
        console.log("error in updating subsection",error);
        return res.status(500).json({
            success:false,
            message:error.message
         });
     
    }
}
//check once if update is correct or not


//delete subsection handler
exports.deleteSubSection=async(req,res)=>{
    try{
        //get subsection id from parameters
        const {subSectionId, sectionId}=req.params;
        //validate data
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"subsection id is required"
             })
         }
         //remove subsection reference
        await Section.findByIdAndUpdate(
            sectionId,
            {$pull:{subSection:subSectionId}},
            {new:true}
        );
        //delete subsection from db
        const deletedSubSection =await SubSection.findByIdAndDelete({_id:subSectionId});
        //return response with success message
        return res.status(200).json({
            success:true,
            message:"subsection deleted successfully",
            data:deletedSubSection
        });

    }
    catch(error){
        console.log("error in deleting subsection",error);
        return res.status(500).json({
            success:false,
            message:error.message
         });
     
    }

}