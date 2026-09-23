import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscKebabVertical, VscCheck, VscTrash } from "react-icons/vsc";
// Ensure these paths match your project structure
import { apiConnector } from "../services/apiConnector"; 
import { endpoints } from "../services/apis";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { GET_USER_ENROLLED_COURSES_API } = endpoints;

  const tabs = ["All", "Pending", "Completed"];

  // =========================================================
  // FETCH COURSES FROM BACKEND
  // =========================================================
  const getEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "GET", 
        GET_USER_ENROLLED_COURSES_API, 
        null, 
        { Authorization: `Bearer ${token}` }
      );

      if (response?.data?.success) {
        setEnrolledCourses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  // Close the kebab menu if the user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // =========================================================
  // FILTERING LOGIC
  // =========================================================
  const filteredCourses = enrolledCourses.filter((course) => {
    // Default progress to 0 if it wasn't calculated properly
    const progress = course.progressPercentage || 0; 
    
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return progress < 100;
    if (activeTab === "Completed") return progress === 100;
    return true;
  });

  // =========================================================
  // ACTION HANDLERS
  // =========================================================
  const toggleMenu = (e, id) => {
    e.stopPropagation(); // Prevents the click from bubbling up and triggering navigation
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleMarkCompleted = (e, id) => {
    e.stopPropagation();
    console.log("Mark as completed:", id);
    // TODO: Add API call to force course completion
    setOpenMenuId(null);
  };

  const handleRemoveCourse = (e, id) => {
    e.stopPropagation();
    console.log("Remove course:", id);
    // TODO: Add API call to unenroll
    setOpenMenuId(null);
  };

  // Helper function to format duration (if backend sends seconds/minutes instead of a string)
  // Assuming backend sends a pre-formatted string based on your screenshot, but if it sends total time:
  const displayDuration = (course) => {
    return course.totalDuration || "2hr 30 mins"; // Replace with actual backend field
  };

  // =========================================================
  // RENDER UI
  // =========================================================
  return (
    <div className="mx-auto w-full max-w-6xl text-foreground pb-10">
      
      {/* HEADER & BREADCRUMBS */}
      <div className="mb-6 flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
      </div>

      {/* FILTER TABS */}
      <div className="mb-8 flex w-max rounded-full bg-muted p-1 border border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm border border-border" // StudySphere active tab style
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COURSE LIST CONTAINER */}
      {!loading && filteredCourses.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-lg font-medium text-muted-foreground">
            You have no {activeTab.toLowerCase()} courses right now.
          </p>
          <Link 
            to="/catalog" 
            className="mt-4 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-opacity-90 shadow-sm"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="overflow-visible rounded-xl border border-border bg-card shadow-sm">
          
          {/* DESKTOP TABLE HEADER */}
          {/* Using CSS Grid to perfectly align headers with the content below */}
          <div className="hidden md:grid grid-cols-[1fr_150px_250px_40px] items-center rounded-t-xl bg-muted px-6 py-4 text-sm font-semibold text-muted-foreground border-b border-border">
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
            <p></p>
          </div>

          {/* LOADING SKELETON */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-brand"></div>
                <p className="text-muted-foreground font-medium">Loading your courses...</p>
              </div>
            </div>
          ) : (
            
            /* TABLE BODY */
            <div className="flex flex-col">
              {filteredCourses.map((course, index) => {
                const progress = course.progressPercentage || 0;
                const isCompleted = progress === 100;

                return (
                  <div 
                    key={course._id} 
                    onClick={() => navigate(`/dashboard/enrolled-courses/view/${course._id}`)} // Make entire row clickable
                    className={`group flex flex-col md:grid md:grid-cols-[1fr_150px_250px_40px] items-start md:items-center gap-4 md:gap-0 px-6 py-5 transition-colors hover:bg-muted/30 cursor-pointer ${
                      index !== filteredCourses.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    
                    {/* COLUMN 1: THUMBNAIL & INFO */}
                    <div className="flex w-full items-center gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-lg object-cover border border-border shadow-sm group-hover:opacity-90 transition-opacity"
                      />
                      <div className="flex flex-col gap-1 overflow-hidden pr-4">
                        <p className="truncate text-base font-semibold text-foreground group-hover:text-brand transition-colors">
                          {course.courseName}
                        </p>
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {course.courseDescription}
                        </p>
                      </div>
                    </div>

                    {/* COLUMN 2: DURATION */}
                    <div className="w-full md:w-auto mt-2 md:mt-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        <span className="md:hidden font-semibold mr-2 text-foreground">Duration:</span>
                        {displayDuration(course)}
                      </p>
                    </div>

                    {/* COLUMN 3: PROGRESS BAR */}
                    <div className="flex w-full flex-col gap-2 md:pr-6">
                      <p className="text-sm font-semibold">
                        {isCompleted ? (
                          <span className="text-green-500">Completed</span>
                        ) : (
                          <span className="text-foreground">Progress {progress}%</span>
                        )}
                      </p>
                      <div className="h-2 w-full rounded-full bg-muted border border-border overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            isCompleted ? "bg-green-500" : "bg-brand"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* COLUMN 4: ACTION MENU */}
                    <div className="relative flex w-full justify-end md:w-auto md:justify-center mt-2 md:mt-0">
                      <button
                        onClick={(e) => toggleMenu(e, course._id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
                      >
                        <VscKebabVertical className="text-xl" />
                      </button>

                      {/* DROPDOWN MENU */}
                      {openMenuId === course._id && (
                        <div 
                          className="absolute right-0 top-10 z-50 flex w-48 flex-col overflow-hidden rounded-md border border-border bg-card shadow-xl origin-top-right animate-in fade-in zoom-in-95 duration-100"
                          onClick={(e) => e.stopPropagation()} 
                        >
                          {!isCompleted && (
                            <button
                              onClick={(e) => handleMarkCompleted(e, course._id)}
                              className="flex items-center gap-x-3 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-brand"
                            >
                              <VscCheck className="text-lg" />
                              Mark as Completed
                            </button>
                          )}
                          <button
                            onClick={(e) => handleRemoveCourse(e, course._id)}
                            className={`flex items-center gap-x-3 px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400 ${
                              !isCompleted ? "border-t border-border" : ""
                            }`}
                          >
                            <VscTrash className="text-lg" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;