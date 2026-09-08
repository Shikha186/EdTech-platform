import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/HomePage/HighlightText.jsx";
import HomeButton from "../components/HomePage/HomeButton.jsx";
import V1 from "../assets/ImageandVideo/V1.mp4";
import CodeBlocks from "../components/HomePage/CodeBlocks.jsx";
import TimeLine from "../components/HomePage/TimeLine.jsx";
import FeaturesSection from "../components/HomePage/FeaturesSection.jsx";
import BecomeInstructor from "../components/HomePage/BecomeInstructor.jsx";
import Footer from "../components/common/Footer.jsx";
import CourseSection from "../components/HomePage/courseSection.jsx";

function Home() {
  return (
    <div className="overflow-x-hidden" >
      {/*Section 1 */}
      <div className="relative flex flex-col items-center mx-auto w-11/12 justify-between ">
       <Link to="/signUp">
        <div className="flex flex-row  items-center w-fit mt-16 p-1 mx-auto bg-muted text-muted-foreground text-sm sm:text-sm md:text-lg lg-text-lg 2xl-text-xl  rounded-full font-bold shadow-sm shadow-[#4a6cf7e6] tansition-all dutration-300 hover:scale-95 hover:bg-background hover:border-3 hover:border-muted hover:shadow-background">
            <div className="flex flex-row items-center justify-center mx-auto gap-1 px-0.5 py-0.5 rounded-full transition-all duration-300">
                <p>Become an Instructor</p>
                <FaArrowRight />  
            </div>
        </div>
       </Link>

       <div className="flex flex-col md:flex-row items-center text-center mt-16  sm:text-xl md:text-2xl lg-text-3xl xl:text-3xl 2xl:text-4xl  mx-auto font-extrabold gap-2 tracking-tight ">
        Learn, Build, and Grow with  
        <HighlightText text={"StudySphere"} textsize={"sm:text-xl md:text-2xl lg-text-3xl xl:text-3xl 2xl:text-4xl"} />
       </div>
       <div className="flex flex-col items-center text-center mt-3 w-[60%] font-semibold text-[12px] sm:text-sm md:text-lg lg-text-lg 2xl-text-xl text-muted-foreground">
        Strengthen your coding skills through structured learning paths, hands-on practice, and real-world challenges. Track your progress, build confidence, and prepare yourself for internships, placements, and a successful tech career.
       </div>
       <div className="flex flex-row items-center  gap-7 mt-8 mb-16">
        <HomeButton active={true} link={"/signUp"}>Learn More</HomeButton>
        <HomeButton active={false} link={"/Login"}>Get Started</HomeButton>
       </div>

       <div className=" mx-2 my-2  w-[70%] md:mx-3 md:my-6  shadow-lg shadow-[#4a6cf7e6] ">
        <video
        muted
        autoPlay
        loop
        >
            <source src={V1} type="video/mp4" />  
        </video>
       </div>

       <div className="text-center text-[12px] w-[75%] sm:text-sm md:text-lg lg:text-lg xl:text:lg 2xl:text-xl italic  text-foreground  px-2 py-2 mx-3 my-5">
        "Every expert programmer was once a beginner who refused to quit. Start your journey today!"
       </div>
       <div className="w-[100%]">
        {/* code block 1 */}
        <CodeBlocks
        position={"lg:flex-row flex-col md:flex-row"}
        heading={
            <div className="sm:text-xl md:text-2xl font-bold tracking-tight ">
                Unlock Your <HighlightText text={"Coding Potential"} textsize={" sm:text-xl  md:text-2xl"} /> with our online courses.
            </div>
        }
        subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        ctabtn1={{ active: true, text: "Try it Yourself", link: "/courses" }}
        ctabtn2={{ active: false, text: "Learn More", link: "/signUp" }}
        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>My First Web Page</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n</body>\n</html>`}
        backgroundGradient="bg-yellow-500/20"
        codeColor="text-yellow-300"
        >
        </CodeBlocks>
       </div>
       <div className="w-[100%] mt-3">
        {/* code block 2 */}
        <CodeBlocks
        position={" flex-col md:flex-row-reverse"}
        heading={
            <div className="sm:text-xl  md:text-2xl font-bold tracking-tight ">
                Start <HighlightText text={"coding in seconds "} textsize={"sm:text-xl  md:text-2xl"} />
            </div>
        }
        subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
        ctabtn1={{ active: true, text: "Continue Lesson", link: "/courses" }}
        ctabtn2={{ active: false, text: "Learn More", link: "/signUp" }}
        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>My First Web Page</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n</body>\n</html>`}
        backgroundGradient="bg-blue-300/20"
        codeColor="text-blue-300"
        >
        </CodeBlocks>
       </div>
       <div className=" my-10 w-full">
            <CourseSection/>
        </div>
      </div>
      {/*Section 2 */}
      <div className="bg-foreground w-full h-fit  mt-20">
        <div className="relative flex flex-col items-center mx-auto w-11/12 justify-between">
            <div className="w-[100%] flex flex-col sm:flex-row justify-between items-center py-10 my-5 mx-auto">
                <div className=" text-left text-2xl text-background font-bold mx-auto w-[50%] ">
                Get the skills you need for a <HighlightText text={"job that is in demand"} textsize={"text-2xl"} />
                </div>
                <div className="flex flex-col gap-5 text-left text-sm text-background mx-auto w-[50%] ">
                    <div>StudySphere is the perfect place to start your coding journey.It provides a comprehensive learning experience designed to help you succeed in the tech industry.</div>
                    <div className="w-fit"><HomeButton active={true} link={"/signUp"}>Learn More</HomeButton></div>
                </div>
            </div>
            {/* image section */}
            <div className="mx-auto my-auto w-full">
                <TimeLine/>
            </div >
        </div>
      </div>
      {/*Section 3 */}
      <div className="relative flex flex-col items-center mx-auto w-11/12 bg-background justify-between">
            <div className="mx-auto my-auto w-full ">
                <FeaturesSection/>
            </div>
            <div className="mx-auto my-5 w-full">
                <BecomeInstructor/>
            </div>
            <div>
                <h2>Reviews from other users</h2>
            </div>
            
            
      </div>
      {/*Section 4-footer */}
      <Footer/>

    </div>
  );
}

export default Home;