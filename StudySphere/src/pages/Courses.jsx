import React, { useState, useEffect } from "react";
import CourseCard from "../components/HomePage/CourseCard"; // Adjust this path if your CourseCard is located elsewhere
import { getAllCourses } from "../services/operations/courseAPI";

const Courses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getAllCourses();
        if (result) {
          setAllCourses(result);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 1. Dynamically generate categories (with a fallback for any old database entries missing a category)
  const categories = ["All", ...new Set(
    allCourses.map((course) => course?.category?.name || "Uncategorized")
  )];

  // 2. Filter courses safely by category and search text
  const filteredCourses = allCourses.filter((course) => {
    const courseCategory = course?.category?.name || "Uncategorized";
    const matchesCategory = activeCategory === "All" || courseCategory === activeCategory;
    
    const matchesSearch = course?.courseName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || false;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 text-foreground sm:px-6 lg:px-8">
      
      {/* HEADER SECTION */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Explore Our Catalog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Master new skills with our comprehensive courses. From core fundamentals to advanced building, find the right path for your journey.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-brand text-white shadow-[0_0_10px_rgba(74,108,247,0.5)]" 
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 shrink-0">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-sm"
          />
        </div>
      </div>

      {/* COURSE GRID */}
      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-brand"></div>
            <p className="text-muted-foreground font-medium">Loading courses...</p>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-xl font-semibold text-white mb-2">No Courses Found</p>
          <p className="text-muted-foreground">
            We couldn't find any courses matching your search or category filter.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 text-brand hover:underline font-medium"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Responsive CSS Grid matching CourseCard dimensions */
        <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-18 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Courses;

