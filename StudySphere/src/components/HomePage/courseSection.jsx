import React, { useState, useEffect } from 'react';

// Inline SVG components to replace external react-icons dependency
const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className={className}><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
);
const ChartIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>
);
const TrendUpIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}><path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32-73 73-47-47 96-96c9.4-9.4 24.6-9.4 33.9 0l32 32 70.1-70.1-39.3-39.3c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0z"/></svg>
);

// --- MOCK DATA BASED ON YOUR DATABASE ENTRY ---
const mockDatabaseResponse = [
  {
    _id: "6a2cd88485198672641f742a",
    courseName: "Master WebDev: MERN Stack",
    courseDescription: "you will learn full mern stack from basics to advance...",
    instructor: "6a2cd51b1904db696a23a80b",
    whatYouWillLearn: "frontend-Reactjs,css,javascript,html,tailwind and backend-nodejs...",
    courseContent: [1, 2, 3, 4, 5], 
    price: 1000,
    // Using a placeholder image for the preview since the Cloudinary link was cut off
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    category: "6a2c387a7b63eee208a5bf0f", 
    tags: [],
    studentsEnrolled: Array(1250).fill("student"), // Simulating 1250 enrolled students
    instructions: [],
    status: "Published", // Changed from Draft to Published for display
    __v: 0
  }
];


// 1. THE REUSABLE CARD COMPONENT
const CourseCard = ({ course }) => {
  return (
    <div className="bg-[#1C1E24] rounded-xl overflow-hidden flex flex-col border border-white/5 hover:border-brand/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,108,247,0.15)] group">
      
      {/* Thumbnail & Badges Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-800">
        <img 
          src={course.thumbnail} 
          alt={course.courseName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Top Right Rating Badge (Hardcoded for now as it's not in DB) */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <StarIcon className="w-3 h-3" /> 4.8
        </div>
        
        {/* Bottom Left Status Badge */}
        {course.status === 'Published' && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Live Course
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Course Title */}
        <h3 className="text-white font-bold text-lg leading-tight mb-4 line-clamp-2">
          {course.courseName}
        </h3>
        
        {/* Level Indicator (Hardcoded default since not in DB) */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 mt-auto">
          <ChartIcon className="w-4 h-4 text-gray-500" />
          <span>Beginner to Advanced</span>
        </div>
        
        {/* Stats & Explore */}
        <div className="flex items-center justify-between mt-auto mb-4">
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-semibold">
            <TrendUpIcon className="w-4 h-4" />
            {/* We use the length of your studentsEnrolled array! */}
            <span>{course.studentsEnrolled?.length}+ interested Geeks</span>
          </div>
          <span className="text-brand text-sm font-semibold cursor-pointer hover:text-blue-400">
            Explore now
          </span>
        </div>

        {/* Dynamic Price/Discount Button */}
        <button className="w-full py-2.5 bg-[#FFD700] hover:bg-yellow-400 text-black font-bold rounded text-sm transition-colors mt-2">
          {course.price === 0 ? "FREE" : `Enroll for ₹${course.price}`}
        </button>
      </div>
    </div>
  );
};


// 2. THE MAIN SECTION COMPONENT
export default function CourseSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from your Node.js backend
  useEffect(() => {
    // In your real app, this will be: 
    // axios.get('/api/courses?limit=6').then(res => setCourses(res.data))
    
    setTimeout(() => {
      // Duplicating your single database entry 3 times just to show the grid working
      setCourses([mockDatabaseResponse[0], mockDatabaseResponse[0], mockDatabaseResponse[0]]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-[#0A0D14] min-h-screen py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">Courses</h2>
          <button className="px-5 py-2 rounded-full border border-gray-600 text-brand text-sm font-semibold hover:bg-white/5 transition-colors">
            View All
          </button>
        </div>

        {/* Grid Area */}
        {loading ? (
          <div className="text-white text-center py-20">Loading courses from database...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              // Passing your exact database object into the reusable component!
              <CourseCard key={course._id + index} course={course} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}