import type { ReactNode } from "react";

interface HeaderRootProps {
    children: ReactNode,
}

export default function HeaderRoot ({ children }: HeaderRootProps) {
    return (
        <div className="flex flex-row justify-between p-8">
            { children }
        </div>
    )
}