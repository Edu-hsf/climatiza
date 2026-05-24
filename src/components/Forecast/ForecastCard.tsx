import { toTimeFormat } from "@/utils/formatter";
import { type LucideProps } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface ForecastCardProps {
    time?: Date | string
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    temperature?: number
}

export default function ForecastCard({ time, icon: Icon, temperature }: ForecastCardProps) {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-3">
                <p className="text-muted-foreground">
                    {time && toTimeFormat(time)}
                </p>
                <div className="flex justify-center">
                    {Icon ? <Icon size={40} /> : ''}
                </div>
                <p className="text-2xl">{temperature}°C</p>
            </CardContent>
        </Card>
    );
}