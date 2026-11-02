import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VscEdit, VscTrash, VscCheck } from "react-icons/vsc";
import { CiClock1 } from "react-icons/ci";
import { StoreContext } from "../../../../StoreContext/StoreContext";
import { deleteCourse } from "../../../../services/operations/courseAPI";

const CoursesTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // ACTION HANDLERS
  // =========================================================
  
  const handleEdit = (courseId) => {
    // Navigates to the Edit Course wrapper page, passing the courseId in the URL
    navigate(`/dashboard/edit-course/${courseId}`);
  };

  const handleCourseDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course? This action cannot be undone.");
    
    if (confirmDelete) {
        setLoading(true);
        try {
            // Call the backend delete controller
            const success = await deleteCourse({ courseId }, token);

            if (success) {
                // Remove the deleted course from the UI instantly without reloading the page
                const updatedCourses = courses.filter((course) => course._id !== courseId);
                setCourses(updatedCourses);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        } finally {
            setLoading(false);
        }
    }
  };

  // =========================================================
  // RENDER UI
  // =========================================================
  
  if (courses?.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-sm mt-8">
        <p className="text-xl font-medium text-foreground">No courses found</p>
        <p className="text-muted-foreground mt-2">You haven't created any courses yet.</p>
        <button 
            onClick={() => navigate("/dashboard/add-course")}
            className="mt-6 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-opacity-90 shadow-sm"
        >
            Create Your First Course
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-left text-sm text-foreground">
        
        {/* TABLE HEADER */}
        <thead className="border-b border-border bg-muted text-muted-foreground">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold w-[60%]">
              Course Details
            </th>
            <th scope="col" className="px-6 py-4 font-semibold">
              Duration
            </th>
            <th scope="col" className="px-6 py-4 font-semibold">
              Price
            </th>
            <th scope="col" className="px-6 py-4 font-semibold text-right">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-border">
          {courses.map((course) => (
            <tr 
                key={course._id} 
                className="transition-colors hover:bg-muted/30"
            >
              
              {/* COLUMN 1: THUMBNAIL & INFO */}
              <td className="px-6 py-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[120px] w-full sm:w-[200px] shrink-0 rounded-lg object-cover border border-border shadow-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      {course.courseName}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 w-full max-w-[400px]">
                      {course.courseDescription}
                    </p>
                    
                    {/* STATUS PILL */}
                    <div className="mt-2 w-fit">
                        {course.status === "Published" ? (
                            <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 border border-green-500/20">
                                <VscCheck className="text-sm" />
                                <span>Published</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 border border-yellow-500/20">
                                <CiClock1 className="text-sm" />
                                <span>Draft</span>
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </td>

              {/* COLUMN 2: DURATION */}
              <td className="px-6 py-6 font-medium text-muted-foreground align-top pt-8">
                2h 30m
              </td>

              {/* COLUMN 3: PRICE */}
              <td className="px-6 py-6 font-semibold text-brand align-top pt-8">
                ₹ {course.price}
              </td>

              {/* COLUMN 4: ACTIONS */}
              <td className="px-6 py-6 align-top pt-8">
                <div className="flex items-center justify-end gap-3">
                  <button
                    disabled={loading}
                    onClick={() => handleEdit(course._id)}
                    className="flex items-center justify-center rounded-md bg-secondary/80 p-2.5 text-white transition-all hover:bg-secondary hover:scale-105"
                    title="Edit Course"
                  >
                    <VscEdit className="text-lg" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleCourseDelete(course._id)}
                    className="flex items-center justify-center rounded-md bg-red-500/10 p-2.5 text-red-500 transition-all hover:bg-red-500 hover:text-white hover:scale-105"
                    title="Delete Course"
                  >
                    <VscTrash className="text-lg" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;