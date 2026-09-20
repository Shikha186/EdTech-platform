
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

const About = () => {
  const token = localStorage.getItem("token");
  return (
    <div className=" w-full">
    <div className="min-h-screen bg-[#000814] text-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section & Motto */}
        <section className="text-center space-y-6 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Driving Innovation in <span className="text-blue-500">Learning</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto">
            "Empowering curious minds to explore beyond boundaries."
          </p>
        </section>

        {/* Founding Story Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-gray-800 shadow-lg">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-blue-400 border-b border-gray-700 pb-2 inline-block">
              Our Founding Story
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                StudySphere was born out of a shared struggle experienced by university students 
                trying to balance rigorous coursework, skill development, and career preparation. 
                We noticed that while information was everywhere, an organized, supportive, and 
                engaging learning ecosystem was missing.
              </p>
              <p>
                What started as a simple idea to consolidate study resources quickly evolved into 
                a comprehensive platform. We wanted to build a space that didn't just host courses, 
                but fostered a community. Through late nights of coding, continuous iterations, 
                and feedback from peers, StudySphere came to life as the ultimate digital companion 
                for lifelong learners.
              </p>
            </div>
          </div>
          
          {/* Image Placeholder - You can replace the src with your own asset */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating" 
                className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20 z-0"></div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors duration-300 shadow-lg group">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              To democratize access to high-quality education by providing an intuitive, feature-rich 
              platform that bridges the gap between complex subjects and eager learners. We strive to 
              equip students with the technical skills and theoretical knowledge they need to thrive 
              in the modern world.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors duration-300 shadow-lg group">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              To become the global catalyst for digital learning, cultivating a worldwide community 
              where knowledge sharing knows no borders. We envision a future where every student 
              feels empowered to chart their own academic and professional journey with confidence.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pb-12">
          <h2 className="text-2xl font-bold mb-6">Ready to join the sphere?</h2>
            <Link 
            /* Dynamic Routing based on authentication status */
            to={token ? "/courses" : "/signup"} 
            className="inline-block bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30"
            >
              Start Learning Today
            </Link>
        </section>

      </div>
    </div>
    <Footer />
    </div>
  );
};

export default About;