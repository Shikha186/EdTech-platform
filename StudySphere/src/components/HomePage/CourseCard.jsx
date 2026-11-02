// import React from "react";
// import {Link} from "react-router-dom";


// const CourseCard = ({ course }) => {

//     return (

//         <div className="bg-muted  text-foreground rounded-xl w-[200px] h-[280px] sm:w-73 sm:h-96 shadow-lg shadow-[#4A6cf7] transition-transform duration-300  translate-y-0  hover:translate-y-[-5px] cursor-pointer">

//             <img
//                 src={course.thumbnail}
//                 alt=""
//                 className="h-[100px] sm:h-44 w-full object-cover rounded-lg"
//             />
//             <div className="flex flex-col  my-3 mx-2 p-0.5 w-[90%] sm:w-69">
//                 <div className="text-sm sm:text-xl font-bold text-foreground sm:h-[56px]  h-[46px]">{course.courseName}</div>
//                 <div className="text-sm text-muted-foreground h-[40px] py-0.5 line-clamp-2">{course.courseDescription}</div>
//                 <div className="flex justify-between mt-4">
//                     <span>
//                         ₹ {course.price}
//                     </span>
//                     <span>
//                         ⭐ {course.ratingAndReviews?.length}
//                     </span>
//                 </div>
//                 <div className="w-fit my-2">
//                     <Link to={`/courses/${course._id}`} className="text-sm font-bold py-1 px-0.5 text-[#4a6cf7] hover:bg-[#4a6cf7] hover:text-white px-1.5 py-2.5 rounded-md transition-all duration-300">
//                         Explore Course
//                     </Link>
//                 </div>
//             </div>

//         </div>

//     );
// };

// export default CourseCard;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Adjust this path to wherever your StoreContext is located
import { StoreContext } from "../../StoreContext/StoreContext"; 
import toast from "react-hot-toast";

const CourseCard = ({ course }) => {
    // Bring in user (to check enrollment) and cart state from your context
    const { user, cart = [], setCart } = useContext(StoreContext);
    const navigate = useNavigate();

    // 1. Check if the user is already enrolled
    // We check both raw ID and populated object ID just in case your backend sends either
    const isEnrolled = user?.courses?.some(
        (enrolledCourse) => enrolledCourse === course._id || enrolledCourse._id === course._id
    );

    // 2. Check if the course is already in the cart
    const isInCart = cart.some((cartItem) => cartItem._id === course._id);

    // 3. Handle Add to Cart click
    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevents the Link click if wrapped in a link

        if (!user) {
            toast.error("Please log in to add items to your cart.");
            navigate("/login");
            return;
        }

        if (!isEnrolled && !isInCart) {
            const updatedCart = [...cart, course];
            setCart(updatedCart);
            // Sync with local storage so cart persists on refresh
            localStorage.setItem("cart", JSON.stringify(updatedCart)); 
            toast.success("Course added to cart!");
        }
    };

    return (
        <div className="bg-muted text-foreground rounded-xl w-[200px] h-[310px] sm:w-73 sm:h-[400px] shadow-lg shadow-[#4A6cf7]/20 transition-transform duration-300 translate-y-0 hover:translate-y-[-5px] flex flex-col overflow-hidden">
            
            <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-[100px] sm:h-44 w-full object-cover"
            />
            
            <div className="flex flex-col flex-grow my-3 mx-2 p-0.5 w-[90%] sm:w-69">
                <div className="text-sm sm:text-xl font-bold text-foreground sm:h-[56px] h-[46px] line-clamp-2">
                    {course.courseName}
                </div>
                
                <div className="text-xs sm:text-sm text-muted-foreground h-[40px] py-0.5 line-clamp-2 mt-1">
                    {course.courseDescription}
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="font-semibold text-brand">
                        ₹ {course.price}
                    </span>
                    <span className="text-sm font-medium text-yellow-500">
                        ⭐ {course.ratingAndReviews?.length || 0}
                    </span>
                </div>
                
                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link 
                        to={`/courses/${course._id}`} 
                        className="text-xs sm:text-sm font-bold py-1.5 px-2 text-center text-brand hover:bg-brand hover:text-white rounded-md transition-all duration-300 border border-brand/20 sm:border-none"
                    >
                        Explore
                    </Link>

                    {isEnrolled ? (
                        <span className="text-xs sm:text-sm font-bold py-1.5 px-2 text-center text-green-500 bg-green-500/10 rounded-md">
                            Enrolled
                        </span>
                    ) : isInCart ? (
                        <button 
                            onClick={() => navigate("/dashboard/cart")}
                            className="text-xs sm:text-sm font-bold py-1.5 px-2 text-center text-white bg-secondary/80 hover:bg-secondary rounded-md transition-all duration-300"
                        >
                            Go to Cart
                        </button>
                    ) : (
                        <button 
                            onClick={handleAddToCart}
                            className="text-xs sm:text-sm font-bold py-1.5 px-2 text-center text-white bg-brand hover:bg-brand/90 rounded-md transition-all duration-300 shadow-sm"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;