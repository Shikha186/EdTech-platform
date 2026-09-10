import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
    LOGIN_API,
    SIGNUP_API,
    SEND_OTP_API,
    RESET_PASSWORD_API,
    FORGOT_PASSWORD_API
} = endpoints;

export const login = async (email, password) => {

    const response = await apiConnector(
        "POST",
        LOGIN_API,

        {
            email,
            password,
        }

    );

    return response.data;
};

export const signUp = async (signupData) => {

    const response = await apiConnector(

        "POST",
        SIGNUP_API,

        signupData

    );

    return response.data;
};

export const sendOTP = async (email) => {

    const response = await apiConnector(
        "POST",
        SEND_OTP_API,
        { email }
    );

    return response.data;
};
