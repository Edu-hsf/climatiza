import { type LucideProps } from "lucide-react"
import type { ComponentType } from "react"

interface ForecastItemProps {
    time?: string
    icon?: ComponentType<LucideProps>
    temperature?: string
}

export default function ForecastItem ({ time, icon: Icon, temperature }: ForecastItemProps ){
    return (
        <div className="
            flex 
            flex-col 
            glass 
            rounded-2xl 
            p-6 border 
            border-white/20 
            hover:bg-white/15 
            gap-3 
            text-center
        ">
            <p className="text-white/80">
                {time}
            </p>
            <div className="flex justify-center">
                {Icon ? <Icon size={32}/> : ''}
            </div>
            <p className="text-2xl">{temperature}</p>
        </div>
    )
}