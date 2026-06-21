import React from 'react'
import HighlightText from './HighlightText.jsx'
import HomeButton from './HomeButton.jsx'
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'

export default function CodeBlocks({position,heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) {
    return(
        <div className={` flex  ${position}  mt-15  mx-10 items-center justify-center gap-15 w-[90%]`}>
            {/* section1 */}
            <div className="flex flex-col gap-5 mx-5 w-[50%]">
                <div className=" tracking-tight">{heading}</div>
                <div className="text-muted-foreground w-[85%] text-sm">{subheading}</div>
                <div className="flex flex-row w-[100%] gap-5 mt-5">
                    <HomeButton active={ctabtn1.active} link={ctabtn1.link}>
                        <div className="flex flex-row items-center justify-center">
                            {ctabtn1.text}
                            <FaArrowRight/>
                            </div>
                    </HomeButton>
                    <HomeButton active={ctabtn2.active} link={ctabtn2.link}>
                        {ctabtn2.text}
                    </HomeButton>
                </div>

            </div>
            {/* Code Block */}
            <div className={` relative flex flex-row w-[50%] h-fit text-left overflow-hidden rounded-md p-5 mx-5 border border-muted-foreground `}>
                {/* bg-gradient */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] ${backgroundGradient} rounded-full blur-[100px] pointer-events-none`}></div>
                <div className=" relative z-10 flex flex-col text-center text-muted-foreground w-[10%] text-[12px] font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                </div>
                <div className={`relative z-10 w-[90%] flex flex-col gap-2 font-mono font-bold pr-2 ${codeColor} `}>
                    <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    cursor={true}
                    style={{whiteSpace: "pre-line", fontSize: "12px", display: "block"}}
                    />
                </div>
            </div>
    

        </div>

    )
}