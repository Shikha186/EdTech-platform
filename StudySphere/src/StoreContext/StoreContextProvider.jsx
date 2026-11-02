import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

    // It must be initialized to 1, not 0
    const [step, setStep] = useState(1);

    // 2. Holds the course data returned from the backend after Step 1
    const [course, setCourse] = useState(null);
  
     // 3. Flag to determine if we are creating a new course or editing an existing one
    const [editCourse, setEditCourse] = useState(false);

    // Inside StoreContext.jsx
    const [cart, setCart] = useState(() => {
    // Load cart from local storage on initial load
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


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
        setUser,
        user, 
        setUser,
        cart, 
        setCart,
        step,
        setStep,
        course,
        setCourse,
        editCourse,
        setEditCourse,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;