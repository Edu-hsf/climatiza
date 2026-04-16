import type { ButtonHTMLAttributes, ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function HeaderIconButton({ children }: HeaderButtonProps) {
    return (
        <Button variant="ghost" size="icon">
            {children}
        </Button>
    )
}