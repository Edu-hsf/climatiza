import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function HeaderIconButton({ children, ...props }: HeaderButtonProps) {
    return (
        <Button variant="glass" size="icon" {...props}>
            {children}
        </Button>
    );
}