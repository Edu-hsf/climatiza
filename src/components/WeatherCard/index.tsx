import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Droplet, Eye, Gauge, Sun, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface WeatherCardsProps extends React.ComponentProps<"div"> {
    type: 'temperature' | 'wind_speed' | 'humidity' | 'visibility' | 'pressure' | 'precipitation'
    weatherData?: number | string
    isLoading?: boolean
}

export default function WeatherCard({ type, weatherData, isLoading, ...props }: WeatherCardsProps) {
    let Icon: LucideIcon | null = null;
    let description: string | null = null;

    switch (type) {
        case 'temperature':
            Icon = Thermometer;
            description = 'Sensação Térmica';
            weatherData = weatherData + '°C';
            break;

        case 'wind_speed':
            Icon = Wind;
            description = 'Velocidade do Vento';
            weatherData = weatherData + ' km/h S';
            break;

        case 'humidity':
            Icon = Droplet;
            description = 'Humidade';
            weatherData = weatherData + '%';
            break;

        case 'visibility':
            Icon = Eye;
            description = 'Visibilidade';
            weatherData = weatherData + ' km';
            break;

        case 'pressure':
            Icon = Gauge;
            description = 'Pressão';
            weatherData = weatherData + ' hPa';
            break;

        case 'precipitation':
            Icon = Sun;
            description = 'Precipitação';
            weatherData = weatherData + '%';
            break;

        default:
            break;
    }

    return (
        <Card className={cn("hover:bg-white/15", props.className)} {...props}>
            <CardContent>
                {isLoading ?
                    (
                        <div className="space-y-3.5">
                            <Skeleton className="w-7 h-7 rounded-full" />
                            <Skeleton className="w-40 h-3.5" />
                            <Skeleton className="w-20 h-7" />
                        </div>
                    ) : (
                        <>
                            {Icon && <Icon size={28} className="mb-3" data-testid='weather-icon' />}
                            <p className="text-muted-foreground text-sm mb-1">{description}</p>
                            <strong>
                                <p className="text-foreground text-xl">{weatherData}</p>
                            </strong>
                        </>
                    )
                }
            </CardContent>
        </Card>
    );
}