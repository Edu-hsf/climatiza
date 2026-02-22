import type { ButtonHTMLAttributes, ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function HeaderIconButton({ children }: HeaderButtonProps) {
    return (
        <NavLink to='/settings'>
            <button
                className="
                glass 
                w-fit
                h-fit
                p-3
                rounded-full
                hover:bg-white/15 
                cursor-pointer
            "
            >
                {children}
            </button>
        </NavLink>
    )
}