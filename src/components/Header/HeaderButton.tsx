import type { ButtonHTMLAttributes, ReactNode } from "react"

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function HeaderIconButton({ children }: HeaderButtonProps) {
    return (
        <button  
            className="
                glass 
                w-fit
                h-fit
                p-3
                rounded-full
                hover:bg-white/15 
            "
        >
            {children}
        </button>
    )
}