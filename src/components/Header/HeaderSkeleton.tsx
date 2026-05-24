import { MapPinIcon, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function HeaderSkeleton() {
    return (
        <div className="flex flex-row justify-between p-8">
            <div className="flex items-center text-lg gap-2">
                <MapPinIcon size={20} className="hidden" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Button variant="glass" size="icon" className="hidden">
                <Settings size={24} />
            </Button>
        </div>
    );
}