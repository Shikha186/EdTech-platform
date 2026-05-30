//import the required modules
const express= require('express');
const router= express.Router();
console.log(" ");
console.log("Course Router initialized");

const {createCourse,showAllCourses,getCourseDetails}= require('../controllers/courseController');
const {authenticateUser,isAdmin,isInstructor,isStudent}= require('../middlewares/authMiddleware');

const {createCategory,showALLCategories,categoryPageDetails}=require('../controllers/categoryController');

const {createRatingAndReview,getAverageRatingAndReviews,getAllRatingsAndReviewsOfSpecificCourse,getAllRatingsAndReviews}=require('../controllers/ratingAndReview');

const{createSection,updateSection,deleteSection}=require('../controllers/sectionController');
const{createSubSection,updateSubSection,deleteSubSection}=require('../controllers/subSectionController');

// console.log("createCourse:", createCourse);
// console.log("showAllCourses:", showAllCourses);
// console.log("getCourseDetails:", getCourseDetails);


router.post("/createCourse",authenticateUser,isInstructor,createCourse);
router.get("/showAllCourses",showAllCourses);
router.get("/getCourseDetails/:courseId",getCourseDetails);



// console.log("createCategory:", createCategory);
// console.log("showALLCategories:", showALLCategories);
// console.log("categoryPageDetails:", categoryPageDetails);
//CREATE CATEGORY routes 
router.post("/createCategory",authenticateUser,isAdmin,createCategory);
router.get("/showALLCategories",showALLCategories);
router.post("/categoryPageDetails",categoryPageDetails);


// console.log("createRatingAndReview:", createRatingAndReview);
// console.log("getAverageRatingAndReviews:", getAverageRatingAndReviews);
// console.log("getAllRatingsAndReviewsOfSpecificCourse:", getAllRatingsAndReviewsOfSpecificCourse);
// console.log("getAllRatingsAndReviews:", getAllRatingsAndReviews);
//create rating and review routes
router.post("/createRatingAndReview",authenticateUser,isStudent,createRatingAndReview);
router.get("/getAverageRatingAndReviews",getAverageRatingAndReviews);
router.get("/getAllRatingsAndReviewsOfSpecificCourse",getAllRatingsAndReviewsOfSpecificCourse);
router.get("/getAllRatingsAndReviews",getAllRatingsAndReviews);


// console.log("createSection:", createSection);
// console.log("updateSection:", updateSection);
// console.log("deleteSection:", deleteSection);
//create section routes
router.post("/createSection",authenticateUser,isInstructor,createSection);
router.put("/updateSection",authenticateUser,isInstructor,updateSection);
router.delete("/deleteSection",authenticateUser,isInstructor,deleteSection);


// console.log("createSubSection:", createSubSection);
// console.log("updateSubSection:", updateSubSection);
// console.log("deleteSubSection:", deleteSubSection);
//create subsection routes
router.post("/createSubSection",authenticateUser,isInstructor,createSubSection);
router.put("/updateSubSection",authenticateUser,isInstructor,updateSubSection);
router.delete("/deleteSubSection",authenticateUser,isInstructor,deleteSubSection);

module.exports= router;