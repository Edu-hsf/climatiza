import { createContext, useEffect, useState } from 'react';

interface Coordinates {
    lat: number
    long: number
}

interface CoordinatesContextType {
    coordinates: Coordinates | null
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates | null>>
}

interface CoordinatesProviderProps {
    children: React.ReactNode
}

export const CoordinatesContext = createContext<CoordinatesContextType>({} as CoordinatesContextType);

export function CoordinatesProvider({ children }: CoordinatesProviderProps) {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
            });
        }
    }, []);

    return (
        <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
            {children}
        </CoordinatesContext.Provider>
    );
}