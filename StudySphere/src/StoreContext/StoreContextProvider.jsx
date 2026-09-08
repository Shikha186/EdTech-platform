import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchCourses();
    }, []);

    const value = {
        courses,
        loading,
        fetchCourses,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;