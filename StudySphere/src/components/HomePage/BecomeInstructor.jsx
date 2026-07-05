import React from 'react'
import teacher from "../../assets/ImageandVideo/teacher.jpg"
import HighlightText from './HighlightText'
import HomeButton from './HomeButton'
import { FaArrowRight } from "react-icons/fa";


export default function BecomeInstructor(){
    return(
        <div className='w-full h-fit mx-10 my-15 px-7 py-6 gap-1 flex flex-row items-center overflow-hidden'>
                <div className='w-[50%] flex items-center justify-center my-5'>
                    <img src={teacher} alt="instructor photo" className="w-[60%] h-auto object-cover shadow-[-12px_-12px_0px_#ffffff]"/>
                </div>
                <div className='w-[40%] flex flex-col mr-3 my-5'>
                    <div className='text-3xl font-bold text-left'>
                        Become an 
                        <HighlightText text={"Instructor"} textsize={"text-3xl"}></HighlightText>
                    </div>
                    <div className='text-sm my-7'>
                        Instructors from around the world teach millions of students on StudySphere. We provide the tools and skills to teach what you love.
                    </div>
                    <div className='w-fit '>
                        <HomeButton active={true} link={"/signUp"}>
                        <div className='flex flex-row items-center gap-1'> Start Teaching 
                        <FaArrowRight/></div>
                        </HomeButton>
                    </div>
                </div>
        </div>
    )
}