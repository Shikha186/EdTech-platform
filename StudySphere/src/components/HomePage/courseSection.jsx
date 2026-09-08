import CourseCard from "./CourseCard";
import { useStore } from "../../StoreContext/StoreContext";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const CourseSection = () => {

    const { courses, loading } = useStore();
    console.log(courses);

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (

        <section className="max-w-7xl w-full min-w-0 mx-auto my-5">

           <div className="flex flex-row items-center justify-between">
             <h1 className="text-4xl font-bold">
                Courses
             </h1>
             <Link to="/courses" className="text-sm font-semibold text-foreground rounded-md border border-background hover:border-[#4a6cf7e6] hover:text-[#4a6cf7e6] transition-all duration-300">
                <div className="px-2.5 py-2.5">View All</div>
             </Link>
           </div>

            <div className=" grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   md:gap-x-12 gap-y-20 mt-12">

                {
                    courses.slice(0,6).map((course)=>(
                         <CourseCard 
                            key={course._id}
                            course={course}
                        />
                    
                    ))
                }

            </div>

        </section>

    );

};

export default CourseSection;