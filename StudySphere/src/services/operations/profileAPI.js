import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

// Make sure to add GET_USER_DETAILS_API to your apis.js endpoints!
const { GET_USER_DETAILS_API, UPDATE_PROFILE_API, DELETE_ACCOUNT_API, UPDATE_DISPLAY_PICTURE_API, GET_USER_ENROLLED_COURSES_API } = endpoints;

// Get user details

export const getUserDetails = async (token) => {

    return await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
            Authorization: `Bearer ${token}`
        }
    );
};


// Update profile

export const updateProfile = async (data, token) => {

    return await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        data,
        {
            Authorization: `Bearer ${token}`
        }
    );
};


// Delete account

export const deleteAccount = async (token) => {

    return await apiConnector(
        "DELETE",
        DELETE_ACCOUNT_API,
        null,
        {
            Authorization: `Bearer ${token}`
        }
    );
};

export const updateDisplayPicture = async (token, formData) => {
  try {
    const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
      Authorization: `Bearer ${token}`,
      // Browser automatically sets correct multipart/form-data headers when sending FormData
    });

    console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API ERROR...", error);
    throw error;
  }
};



export async function getUserEnrolledCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET_USER_ENROLLED_COURSES_API RESPONSE...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    // Assign the array of courses to the result
    result = response.data.data;
    
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API ERROR...", error);
    toast.error("Could not fetch enrolled courses")
  }
  
  return result;
}