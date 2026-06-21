import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeButton({ children, active, link }) {
    return(
        <Link to={link}>
            <div className={`text-center text-[13px] px-3 py-2  rounded-md font-semibold shadow-sm  shadow-muted-foreground transition-all duration-300 hover:scale-95  hover:border-2 hover:border-muted  cursor-pointer  ${active ? "bg-brand text-foreground": "bg-brand/20 text-muted-foreground"}`}>
                {children}
            </div>
        </Link>
    )

}