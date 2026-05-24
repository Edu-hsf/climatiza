import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { AspectRatio } from "radix-ui";

interface WeatherCardsProps {
    icon: ComponentType<LucideProps>
    label: string
    data: string
}

export default function WeatherCard ({icon: Icon, label, data}: WeatherCardsProps) {
    return (
        <AspectRatio>
            <Icon size={28} className="mb-3"/>
            <p className="text-muted-foreground text-sm mb-1">{label}</p>
            <p className="text-xl">{data}</p>
        </AspectRa>
    );
}