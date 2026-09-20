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

};