const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {

    LOGIN_API: `${BASE_URL}/user/login`,

    SIGNUP_API: `${BASE_URL}/user/signup`,

    SEND_OTP_API: `${BASE_URL}/user/sendOTP`,

    RESET_PASSWORD_API: `${BASE_URL}/user/reset-password`,

    FORGOT_PASSWORD_API: `${BASE_URL}/user/forgot-password`,
};