import React from "react";
import {Link} from "react-router-dom";


const CourseCard = ({ course }) => {

    return (

        <div className="bg-muted  text-foreground rounded-xl w-[200px] h-[280px] sm:w-73 sm:h-96 shadow-lg shadow-[#4A6cf7] transition-transform duration-300  translate-y-0  hover:translate-y-[-5px] cursor-pointer">

            <img
                src={course.thumbnail}
                alt=""
                className="h-[100px] sm:h-44 w-full object-cover rounded-lg"
            />
            <div className="flex flex-col  my-3 mx-2 p-0.5 w-[90%] sm:w-69">
                <div className="text-sm sm:text-xl font-bold text-foreground sm:h-[56px]  h-[46px]">{course.courseName}</div>
                <div className="text-sm text-muted-foreground h-[40px] py-0.5 line-clamp-2">{course.courseDescription}</div>
                <div className="flex justify-between mt-4">
                    <span>
                        ₹ {course.price}
                    </span>
                    <span>
                        ⭐ {course.ratingAndReviews?.length}
                    </span>
                </div>
                <div className="w-fit my-2">
                    <Link to={`/courses/${course._id}`} className="text-sm font-bold py-1 px-0.5 text-[#4a6cf7] hover:bg-[#4a6cf7] hover:text-white px-1.5 py-2.5 rounded-md transition-all duration-300">
                        Explore Course
                    </Link>
                </div>
            </div>

        </div>

    );
};

export default CourseCard;