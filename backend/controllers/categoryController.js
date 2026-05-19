const Tag=require("../models/tags");

// Create a new tag
exports.createTag=async(req,res)=>{
    try{
        //fetch data
        const {name, description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"enter all the fields properly"
            })
        }
        //create entry in db
        const tagDetails= await Tag.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            message:"tag created successfully"
        })

    }catch(error){
        console.log("error in creating tag",error);
        return res.status(500).json({
            success:true,
            messsage:error
        })


    }
}


// getall tags handler
exports.showALLTags=async(req,res)=>{
   try{
     const getTags=await Tag.find({},{name:true, description:true});
     return res.status(200).json({
        success:true,
        message:"all tags are returned successfully"
     })
   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error
    })
   }
}