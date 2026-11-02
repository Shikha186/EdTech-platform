// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { VscAdd } from "react-icons/vsc";
// import CoursesTable from "./CoursesTable";
// // import { fetchInstructorCourses } from "../../services/operations/courseAPI";

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       // const result = await fetchInstructorCourses();
//       // if (result) {
//       //   setCourses(result);
//       // }
//     };
//     fetchCourses();
//   }, []);

//   return (
//     <div className="mx-auto w-full max-w-6xl text-foreground pb-10">
//       <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
//         <h1 className="text-3xl font-bold">My Courses</h1>
//         <button
//           onClick={() => navigate("/dashboard/add-course")}
//           className="flex items-center gap-x-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 shadow-sm"
//         >
//           <VscAdd className="text-lg" />
//           <span>Add Course</span>
//         </button>
//       </div>

//       <CoursesTable courses={courses} setCourses={setCourses} />
//     </div>
//   );
// };

// export default MyCourses;


import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import CoursesTable from "../../Dashboard/MyCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../../services/operations/courseAPI";
import { StoreContext } from "../../../../StoreContext/StoreContext";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  // Get token from context to authorize the API call
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const getCourses = async () => {
      if (token) {
          const result = await fetchInstructorCourses(token);
          if (result) {
            setCourses(result);
          }
      }
    };
    getCourses();
  }, [token]);

  return (
    <div className="mx-auto w-full max-w-6xl text-foreground pb-10">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-x-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 shadow-sm"
        >
          <VscAdd className="text-lg" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Pass the fetched courses into your table component */}
      <CoursesTable courses={courses} setCourses={setCourses} />
    </div>
  );
};

export default MyCourses;