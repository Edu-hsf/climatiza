import type { LucideProps } from "lucide-react"
import type { ComponentType } from "react"
import { Card } from "../ui/card"

interface WeatherDetailCardsProps {
    icon: ComponentType<LucideProps>
    label: string
    data: string
}

export default function WeatherDetailCards ({icon: Icon, label, data}: WeatherDetailCardsProps) {
    return (
        <Card>
            <Icon size={28} className="mb-3"/>
            <p className="text-muted-foreground text-sm mb-1">{label}</p>
            <p className="text-xl">{data}</p>
        </Card>
    )
}