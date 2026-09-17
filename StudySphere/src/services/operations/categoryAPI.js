import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
    SHOW_ALL_CATEGORIES_API,
    CATEGORY_PAGE_DETAILS_API,
} = endpoints;


// Get all categories
export const getAllCategories = async () => {
    try {
        const response = await apiConnector(
            "GET",
            SHOW_ALL_CATEGORIES_API
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};


// Get category page details
export const getCategoryPageDetails = async (categoryId) => {
    try {
        const response = await apiConnector(
            "POST",
            CATEGORY_PAGE_DETAILS_API,
            { categoryId }
        );

        return response;
    } catch (error) {
        console.error("Error fetching category page details:", error);
        throw error;
    }
};