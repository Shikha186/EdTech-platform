const Category=require("../models/category");

// Create a new category
exports.createCategory=async(req,res)=>{
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
        const categoryDetails= await Category.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            message:"category created successfully"
        })

    }catch(error){
        console.log("error in creating category",error);
        return res.status(500).json({
            success:false,
            message:error
        })


    }
}


// getall categories handler
exports.showALLCategories=async(req,res)=>{
   try{
     const getCategories=await Category.find({},{name:true, description:true});
     return res.status(200).json({
        success:true,
        message:"all categories are returned successfully"
     })
   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error
    })
   }
}


//category page details handler
exports.categoryPageDetails=async(req,res)=>{
    try{
        //get category id from req body
        const {categoryId}=req.body;
        //get courses under that categoryid
        const selectedCategory=await Category.findById({_id:categoryId}).populate("courses").exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        //get courses from different category 
        const differentCategoryCourses=await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();
        //get top selling courses
        const topSellingCoureses=await Category.find({})
        .populate({
            path: "courses",
            options: {
                sort: { studentsEnrolled: -1 },
                limit: 10
            }
        }).exec();
        //return response with all the details
        return res.status(200).json({
            success:true,
            message:"category details fetched successfully",
            selectedCategory:selectedCategory,
            differentCategoryCourses:differentCategoryCourses,
            topSellingCoureses:topSellingCoureses
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}