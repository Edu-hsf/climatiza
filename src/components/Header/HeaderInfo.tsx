import type { ReactNode } from "react"

interface HeaderInfoProps {
    children: ReactNode
}

export default function HeaderInfo ({ children }: HeaderInfoProps) {
    return (
        <div className="
            flex
            items-center
            text-lg
            gap-2
        ">
            { children }
        </div>
    )
}