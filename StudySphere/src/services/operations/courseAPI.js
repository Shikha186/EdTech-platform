import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

const { SHOW_ALL_COURSES_API } = endpoints;

export const getAllCourses = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", SHOW_ALL_COURSES_API);
    
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    
    // Assign the courses array to our result
    result = response?.data?.courses;
    
  } catch (error) {
    console.log("SHOW_ALL_COURSES_API ERROR...", error);
    toast.error(error.message)
  }
  return result;
};