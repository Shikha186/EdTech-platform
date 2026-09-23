import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

    const fetchCourses = async () => {

        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:4000/api/v1/course/showAllCourses"
            );

            console.log("API Response:", response.data);

            if (response.data.success) {
                // Backend returns courses array
                setCourses(response.data.courses);
            }

        } catch (error) {
            console.log("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    // New function to fetch fresh user details from the database
    const fetchUserDetails = async () => {
        if (!token) return;
        
        try {
            // Replace this URL with your actual route for getAllUserDetails
            const response = await axios.get(
                "http://localhost:4000/api/v1/profile/getUserDetails", 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                // Update state with fresh DB data (including the image URL)
                setUser(response.data.userDetails);
                // Sync localStorage with the latest DB data
                localStorage.setItem("user", JSON.stringify(response.data.userDetails));
            }
        } catch (error) {
            console.log("Error fetching user details from DB:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (token) {
            fetchUserDetails();
        }
    }, [token]);

    const value = {
        courses,
        loading,
        fetchCourses,
        token,
        user,
        setToken,
        setUser
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;