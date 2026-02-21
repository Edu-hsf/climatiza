import type { ButtonHTMLAttributes, ReactNode } from "react"

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function HeaderIconButton({ children, ...props }: HeaderButtonProps) {
    return (
        <button  
            className="
                glass 
                text-white
                w-fit
                h-fit
                p-3
                rounded-full
            "
            {...props}
        >
            {children}
        </button>
    )
}