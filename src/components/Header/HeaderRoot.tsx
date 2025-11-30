import type { ReactNode } from "react";

interface HeaderRootProps {
    children: ReactNode,
}

export default function HeaderRoot ({ children }: HeaderRootProps) {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr] grid-flow-row px-4 h-auto">
            { children }
        </div>
    )
}