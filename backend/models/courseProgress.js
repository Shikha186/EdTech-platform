const mongoose= require('mongoose');


const CourseProgressSchema= new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedvideos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
    }]
})