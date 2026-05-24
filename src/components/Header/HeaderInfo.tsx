import { MapPinIcon } from "lucide-react";

interface HeaderInfoProps {
    city?: string 
    country?: string
}

export default function HeaderInfo ({ city, country }: HeaderInfoProps) {
    return (
        <div className="flex items-center text-lg gap-2">
            <MapPinIcon size={20}/>
            <span>{city}, {country}</span>
        </div>
    );
}