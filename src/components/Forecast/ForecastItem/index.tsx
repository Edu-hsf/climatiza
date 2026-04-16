import { type LucideProps } from "lucide-react"
import type { ComponentType, ForwardRefExoticComponent } from "react"

interface ForecastItemProps {
    time?: string
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    temperature?: string
}

export default function ForecastItem ({ time, icon: Icon, temperature }: ForecastItemProps ){
    return (
        <div className="
            flex 
            flex-col 
            glass-border 
            rounded-2xl 
            p-6
            gap-3 
            text-center
            hover:opacity-80
            transition-opacity
        ">
            <p className="text-muted-foreground">
                {time}
            </p>
            <div className="flex justify-center">
                {Icon ? <Icon size={32}/> : ''}
            </div>
            <p className="text-2xl">{temperature}</p>
        </div>
    )
}