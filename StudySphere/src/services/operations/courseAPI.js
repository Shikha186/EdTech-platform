import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

const { SHOW_ALL_COURSES_API, COURSE_DETAILS_API , COURSE_CATEGORIES_API, CREATE_COURSE_API, EDIT_COURSE_API, DELETE_COURSE_API, CREATE_SECTION_API, UPDATE_SECTION_API, CREATE_SUBSECTION_API, UPDATE_SUBSECTION_API, DELETE_SUBSECTION_API } = endpoints;

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

export const fetchCourseDetails = async (courseId) => {
  let result = null;
  try {
    // Note: Using POST because  backend expects req.body.courseId
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId });
    console.log("COURSE_DETAILS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.courseDetails;
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR:", error);
  }
  return result;
};


export const fetchInstructorCourses = async (token) => {
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            endpoints.GET_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("INSTRUCTOR COURSES API RESPONSE:", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR:", error);
    }
    return result;
};


// Fetch available categories for the dropdown
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        // Check your exact backend response structure. Usually it's response.data.categories
        result = response?.data?.data || response?.data?.categories; 
    } catch (error) {
        console.log("COURSE_CATEGORY_API ERROR:", error);
    }
    return result;
}

// Add a new course (Step 1)
export const addCourseDetails = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE COURSE API RESPONSE:", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.courseDetails;
    } catch (error) {
        console.log("CREATE COURSE API ERROR:", error);
    }
    return result;
}

// Edit an existing course (Step 1)
export const editCourseDetails = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("EDIT COURSE API RESPONSE:", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR:", error);
    }
    return result;
}

export const deleteCourse = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        result = true;
    } catch (error) {
        console.log("DELETE COURSE API ERROR:", error);
    }
    return result;
};


export const createSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST",CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = response?.data?.data; // Returns the updated course
    } catch (error) {
        console.log("CREATE SECTION API ERROR:", error);
    }
    return result;
}

export const updateSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("PUT",UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = response?.data?.data; // Returns the updated section/course
    } catch (error) {
        console.log("UPDATE SECTION API ERROR:", error);
    }
    return result;
}

// Add these below your existing functions
export const createSubSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = response?.data?.data; // Returns the updated Section
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR:", error);
    }
    return result;
}

// Inside courseAPI.js
export const deleteSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = response?.data?.data;
    } catch (error) {
        console.log("DELETE SECTION API ERROR:", error);
    }
    return result;
}

export const updateSubSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST",UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = response?.data?.data; // Returns the updated SubSection
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR:", error);
    }
    return result;
}

export const deleteSubSection = async (data, token) => {
    let result = null;
    try {
        // Axios delete can accept data in the 'data' property
        const response = await apiConnector("DELETE", `${DELETE_SUBSECTION_API}/${data.sectionId}/${data.subSectionId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response.data.message);
        result = true;
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR:", error);
    }
    return result;
}