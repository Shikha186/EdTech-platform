import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import { StoreContext } from "../StoreContext/StoreContext";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, cart, setCart } = useContext(StoreContext);

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(true);
      const result = await fetchCourseDetails(courseId);
      if (result) {
        setCourseData(result);
      }
      setLoading(false);
    };
    getCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-brand"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white text-xl">
        Course Not Found
      </div>
    );
  }

  // Check enrollment and cart status
  const isEnrolled = user?.courses?.some(
    (c) => c === courseId || c._id === courseId
  );
  const isInCart = cart.some((item) => item._id === courseId);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to cart.");
      navigate("/login");
      return;
    }
    if (!isEnrolled && !isInCart) {
      const updatedCart = [...cart, courseData];
      setCart(updatedCart);
      alert("Course added to cart!");
    }
  };

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    instructor,
    courseContent,
    ratingAndReviews,
    studentsEnrolled,
  } = courseData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 text-foreground sm:px-6 lg:px-8">
      
      {/* HERO SECTION */}
      <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-sm">
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white">{courseName}</h1>
          <p className="text-lg text-muted-foreground">{courseDescription}</p>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-yellow-500">⭐ {ratingAndReviews?.length || 0} Reviews</span>
            <span className="text-muted-foreground">{studentsEnrolled?.length || 0} Students Enrolled</span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            Created by <span className="text-brand font-semibold">{instructor?.firstname} {instructor?.lastname}</span>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-3xl font-bold text-white sm:mr-6">₹ {price}</p>
            
            {isEnrolled ? (
              <button 
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className="w-full sm:w-auto rounded-md bg-green-500/20 text-green-500 px-8 py-3 font-bold transition-all hover:bg-green-500/30"
              >
                Go to Dashboard
              </button>
            ) : isInCart ? (
              <button 
                onClick={() => navigate("/dashboard/cart")}
                className="w-full sm:w-auto rounded-md bg-secondary px-8 py-3 font-bold text-white transition-all hover:bg-secondary/80"
              >
                Go to Cart
              </button>
            ) : (
              <>
                <button 
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto rounded-md bg-brand px-8 py-3 font-bold text-white transition-all hover:bg-brand/90"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => { handleAddToCart(); navigate("/dashboard/cart"); }}
                  className="w-full sm:w-auto rounded-md bg-white text-black px-8 py-3 font-bold transition-all hover:bg-gray-200"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>

        {/* THUMBNAIL */}
        <div className="w-full lg:w-[450px] shrink-0">
          <img 
            src={thumbnail} 
            alt={courseName} 
            className="w-full rounded-xl object-cover shadow-[0_0_20px_rgba(74,108,247,0.3)]"
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* MAIN CONTENT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* WHAT YOU WILL LEARN */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What you'll learn</h2>
            <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {whatYouWillLearn}
            </p>
          </div>

          {/* COURSE CURRICULUM */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Course Content</h2>
            <div className="text-sm text-muted-foreground mb-4">
              {courseContent?.length || 0} sections
            </div>
            
            <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card">
              {courseContent?.length > 0 ? (
                courseContent.map((section, index) => (
                  <div key={section._id} className={`p-5 ${index !== courseContent.length - 1 ? "border-b border-border" : ""}`}>
                    <h3 className="font-semibold text-lg text-white mb-3">
                      {section.sectionName || `Section ${index + 1}`}
                    </h3>
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-muted">
                      {section.subSection?.map((sub) => (
                        <div key={sub._id} className="flex justify-between items-center text-muted-foreground text-sm py-1">
                          <p>▶ {sub.title}</p>
                          {sub.timeDuration && <span>{sub.timeDuration}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-muted-foreground">No content uploaded yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* INSTRUCTOR SIDEBAR */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Instructor</h2>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={instructor?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstname} ${instructor?.lastname}`} 
                alt="instructor" 
                className="h-14 w-14 rounded-full object-cover border border-border"
              />
              <div>
                <p className="font-semibold text-white">{instructor?.firstname} {instructor?.lastname}</p>
                <p className="text-sm text-muted-foreground">{instructor?.email}</p>
              </div>
            </div>
            {instructor?.additionalDetails?.about && (
              <p className="text-sm text-muted-foreground mt-4 line-clamp-4">
                {instructor.additionalDetails.about}
              </p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CourseDetails;