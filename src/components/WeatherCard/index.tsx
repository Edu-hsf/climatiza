import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Droplet, Eye, Gauge, Sun, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface WeatherCardsProps extends React.ComponentProps<"div"> {
    type: 'temperature' | 'wind_speed' | 'humidity' | 'visibility' | 'pressure' | 'precipitation'
    value?: number
    unit?: string
    isLoading?: boolean
}

const CARD_CONFIG: Record<WeatherCardsProps['type'], { Icon: LucideIcon; description: string }> = {
    temperature: { Icon: Thermometer, description: 'Sensação Térmica' },
    wind_speed: { Icon: Wind, description: 'Velocidade do Vento' },
    humidity: { Icon: Droplet, description: 'Humidade' },
    visibility: { Icon: Eye, description: 'Visibilidade' },
    pressure: { Icon: Gauge, description: 'Pressão' },
    precipitation: { Icon: Sun, description: 'Precipitação' },
};

export default function WeatherCard({ type, value, unit, isLoading, ...props }: WeatherCardsProps) {
    const { Icon, description } = CARD_CONFIG[type];

    return (
        <Card className={cn("hover:bg-white/15", props.className)} {...props}>
            <CardContent className="flex flex-col">
                {isLoading ?
                    (
                        <div className="space-y-3.5 min-w-0 flex-1">
                            <Skeleton className="w-7 max-w-full h-7 rounded-full" />
                            <Skeleton className="w-40 max-w-full h-3.5" />
                            <Skeleton className="w-20 max-w-full h-7" />
                        </div>
                    ) : (
                        <>
                            {Icon && <Icon size={28} className="mb-3" data-testid='weather-icon' />}
                            <p className="text-muted-foreground text-sm mb-1">{description}</p>
                            <strong>
                                <p className="text-foreground text-xl">{value}{unit && unit[0] === '°' ? unit : ' ' + unit}</p>
                            </strong>
                        </>
                    )
                }
            </CardContent>
        </Card>
    );
}