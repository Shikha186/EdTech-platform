const Section=require('../models/section');
const Course=require('../models/course');

//create section handler
exports.createSection=async(req,res)=>{
    try{
        //fetch data from req body
        const {sectionName, courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
            });
        } 
        //create section entry in db
        const newSection=await Section.create({
            sectionName:sectionName,
            subSection:[]})
        //update course with new section object id
        //const updatedcourse=
        const updatedcourse=await Course.findByIdAndUpdate(
            {_id:courseId},
            {$push:{courseContent:newSection._id}},
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        });
        // how to use populate here to return the updated course details with section and subsection details instead of just id's
        return res.status(200).json({
            success:true,
            message:"section created and added to course successfully",
            data:updatedcourse
        })

    }
    catch(error){
        console.log("error in creating section",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//update section handler
exports.updateSection=async(req,res)=>{
    try{
        //fetch data from req body
        const {sectionId, sectionName}=req.body;
        //validate data
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
             })
         }
        //update section details in db
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {sectionName:sectionName},
            {new:true}
        );
        //return response
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            data:updatedSection
        });

    }
    catch(error){
        console.log("error in updating section",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//delete section handler
exports.deleteSection=async(req,res)=>{
    try{
        //get section id from parameters
        const {sectionId, courseId}=req.params;
        //validate data
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"section id is required"
             })
         }
         //do we need to remove the section reference from courseContent array in course model? yes we need to remove the section reference from courseContent array in course model
         await Course.findByIdAndUpdate(
            courseId,
            {$pull:{courseContent:sectionId}},
            {new:true}
        );
        //delete section from db
        await Section.findByIdAndDelete({_id:sectionId});
        
        //return response
        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })

    }
    catch(error){
        console.log("error in deleting section",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}