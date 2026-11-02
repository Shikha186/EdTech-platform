const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {

    LOGIN_API: `${BASE_URL}/user/login`,

    SIGNUP_API: `${BASE_URL}/user/signup`,

    SEND_OTP_API: `${BASE_URL}/user/sendOTP`,

    RESET_PASSWORD_API: `${BASE_URL}/user/resetPassword`,

    FORGOT_PASSWORD_API: `${BASE_URL}/user/resetPasswordToken`,


    //Category APIs
    SHOW_ALL_CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
    CATEGORY_PAGE_DETAILS_API: `${BASE_URL}/course/categoryPageDetails`,

    //Contact API
    CREATE_QUERY_API: `${BASE_URL}/contact/createQuery`,

    //profile APIs
     GET_USER_DETAILS_API: `${BASE_URL}/profile/getAllUserDetails`,
     UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
     DELETE_ACCOUNT_API: `${BASE_URL}/profile/deleteAccount`,
     UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
     GET_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,

     //course APIs
     SHOW_ALL_COURSES_API: `${BASE_URL}/course/showAllCourses`,
     COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`,
     COURSE_CATEGORIES_API: `${BASE_URL}/course/showAllCategories`, // Assuming this is your route for categories
     CREATE_COURSE_API: `${BASE_URL}/course/createCourse`,
     EDIT_COURSE_API: `${BASE_URL}/course/editCourse`,
     DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,

     GET_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/getInstructorCourses`,


     //section apis
     CREATE_SECTION_API: `${BASE_URL}/course/createSection`,
     UPDATE_SECTION_API:`${BASE_URL}/course/updateSection`,
     DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`,

     //subsection apis
     CREATE_SUBSECTION_API: `${BASE_URL}/course/createSubSection`,
     UPDATE_SUBSECTION_API: `${BASE_URL}/course/updateSubSection`,
     DELETE_SUBSECTION_API: `${BASE_URL}/course/deleteSubSection`,

};