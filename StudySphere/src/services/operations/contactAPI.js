import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { CREATE_QUERY_API } = endpoints;

export const submitContactForm = async (data) => {
  try {
    const response = await apiConnector("POST", CREATE_QUERY_API, data);
    
    console.log("CREATE QUERY API RESPONSE...", response);

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.log("CREATE QUERY API ERROR...", error);
    throw error;
  }
};