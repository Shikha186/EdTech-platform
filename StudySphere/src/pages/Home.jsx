import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/HomePage/HighlightText.jsx";
import HomeButton from "../components/HomePage/HomeButton.jsx";
import V1 from "../assets/ImageandVideo/V1.mp4";
import CodeBlocks from "../components/HomePage/CodeBlocks.jsx";

function Home() {
  return (
    <div >
      {/*Section 1 */}
      <div className="relative flex flex-col items-center mx-auto w-11/12 justify-between ">
       <Link to="/signUp">
        <div className="flex flex-row items-center w-fit mt-16 p-1 mx-auto bg-muted text-muted-foreground text-sm rounded-full font-bold shadow-sm shadow-[#4a6cf7e6] tansition-all dutration-300 hover:scale-95 hover:bg-background hover:border-3 hover:border-muted hover:shadow-background">
            <div className="flex flex-row items-center justify-center mx-auto gap-1 px-0.5 py-0.5 rounded-full transition-all duration-300">
                <p>Become an Instructor</p>
                <FaArrowRight />  
            </div>
        </div>
       </Link>

       <div className="flex flex-row items-center text-center mt-16 text-3xl mx-auto font-semibold gap-1 tracking-tight ">
        Learn, Build, and Grow with  
        <HighlightText text={"StudySphere"} textsize={"text-3xl"} />
       </div>
       <div className="flex flex-col items-center text-center mt-3 w-[60%] font-semibold text-sm text-muted-foreground">
        Strengthen your coding skills through structured learning paths, hands-on practice, and real-world challenges. Track your progress, build confidence, and prepare yourself for internships, placements, and a successful tech career.
       </div>
       <div className="flex flex-row items-center  gap-7 mt-8 mb-16">
        <HomeButton active={true} link={"/signUp"}>Learn More</HomeButton>
        <HomeButton active={false} link={"/Login"}>Get Started</HomeButton>
       </div>

       <div className=" mx-3 my-6 w-[70%]  shadow-lg shadow-[#4a6cf7e6] ">
        <video
        muted
        autoPlay
        loop
        >
            <source src={V1} type="video/mp4" />  
        </video>
       </div>

       <div className="text-center text-lg italic  text-foreground my-5">
        "Every expert programmer was once a beginner who refused to quit. Start your journey today!"
       </div>
       <div className="w-[100%]">
        {/* code block 1 */}
        <CodeBlocks
        position={"lg:flex-row"}
        heading={
            <div className="text-2xl font-bold tracking-tight ">
                Unlock Your <HighlightText text={"Coding Potential"} textsize={"text-2xl"} /> with our online courses.
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
       <div className="w-[100%]">
        {/* code block 2 */}
        <CodeBlocks
        position={"lg:flex-row-reverse"}
        heading={
            <div className="text-2xl font-bold tracking-tight ">
                Start <HighlightText text={"coding in seconds "} textsize={"text-2xl"} />
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
      </div>
      {/*Section 2 */}
      {/*Section 3 */}
      {/*Section 4-footer */}

    </div>
  );
}

export default Home;