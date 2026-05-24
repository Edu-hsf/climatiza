import { MapPinIcon, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function HeaderSkeleton() {
    return (
        <div className="flex flex-row justify-between p-8">
            <div className="flex items-center text-lg gap-2">
                <MapPinIcon size={20}/>
                <Skeleton className="h-5.5 w-32" />
            </div>
            <Button variant="glass" size="icon">
                <Settings size={24} />
            </Button>
        </div>
    );
}