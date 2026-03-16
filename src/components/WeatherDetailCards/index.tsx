import type { LucideProps } from "lucide-react"
import type { ComponentType } from "react"

interface WeatherDetailCardsProps {
    icon: ComponentType<LucideProps>
    label: string
    data: string
}

export default function WeatherDetailCards ({icon: Icon, label, data}: WeatherDetailCardsProps) {
    return (
        <div className="glass-border rounded-2xl p-6">
            <Icon size={28} className="mb-3"/>
            <p className="text-white/70 text-sm mb-1">{label}</p>
            <p className="text-xl">{data}</p>
        </div>
    )
}