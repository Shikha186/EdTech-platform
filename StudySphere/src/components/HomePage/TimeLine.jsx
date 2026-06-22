import React from "react";
import logo1 from "../../assets/ImageandVideo/LOGO1.svg"
import logo2 from "../../assets/ImageandVideo/LOGO2.svg"
import logo3 from "../../assets/ImageandVideo/LOGO3.svg"
import logo4 from "../../assets/ImageandVideo/LOGO4.svg"
import coverPhoto from "../../assets/ImageandVideo/TimelineImage.png"


const timelineData =[
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully committed to serving the community"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        description:"We are always open to new ideas and suggestions"
    },
    // {
    //     logo:logo4,
    //     heading:"Innovation",
    //     description:"We are always looking for new ways to improve our services"
    // },
    {
        logo:logo4,
        heading:"Solve Problems",
        description:"Code your way to success with our problem-solving courses"
    }

]

export default function TimeLine() {
    return(
        <div className="flex flex-row items-center my-10 justify-center w-full gap-5">
            <div className=" flex flex-col w-[50%]">
                {
                    timelineData.map((item, index) => (
                        <div key={index} className="flex flex-row  gap-4  items-center mt-5">
                            <div className="text-yellow-300 shrink-0 text-xl w-15 h-15 flex justify-center items-center rounded-full border-r bg-white">
                                <img src={item.logo}/>
                            </div>
                            <div className="flex flex-col text-left">
                                <p className="text-[13px] font-bold text-background">{item.heading}</p>
                                <p className="text-[12px] text-muted">{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className=" relative w-[50%]">
                <img src={coverPhoto} alt="cover photo" className="shadow-xl shadow-green-500 w-[90%]"/>
                <div className="absolute -bottom-8 left-7 z-10 flex flex-row items-center gap-8  mx-auto bg-green-900 text-white uppercase py-6 px-8 ">
                    <div className="flex flex-row items-center gap-1  border-r  border-green-400 mx-auto w-[50%]">
                        <p className="font-bold text-3xl w-[40%]">10</p>
                        <p className="tracking-tight text-[12px] text-left text-green-300">Years Experiences</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mx-auto w-[50%] ">
                        <p className="font-bold text-3xl w-[40%]">150</p>
                        <p className="tracking-tight text-[12px] text-left text-green-300">types of courses</p>
                    </div>
                </div>
            </div>
        </div>
    )

}