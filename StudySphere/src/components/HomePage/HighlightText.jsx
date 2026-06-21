import React from 'react'

export default function HighlightText({ text,textsize }) {
    return(
        <span className={`font-bold
        ${textsize} font-extrabold tracking-tight
        bg-gradient-to-r from-brand to-[#a3b8ff]
        bg-clip-text text-transparent
        [text-shadow:_0_4px_30px_rgba(74,108,247,0.8)]`}>{"  "}{text}</span>
    )
}