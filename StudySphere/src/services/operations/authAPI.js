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

// API call to generate reset token and send the email
export const getPasswordResetToken = async (email) => {
  try {
    const response = await apiConnector("POST", FORGOT_PASSWORD_API, {
      email,
    });
    
    console.log("FORGOT PASSWORD API RESPONSE...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.log("FORGOT PASSWORD API ERROR...", error);
    throw error;
  }
};

// API call to update the password using the token
export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await apiConnector("POST", RESET_PASSWORD_API, {
      token,
      newPassword,
      confirmPassword,
    });
    
    console.log("RESET PASSWORD API RESPONSE...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.log("RESET PASSWORD API ERROR...", error);
    throw error;
  }
};
