import { createContext, useEffect, useState } from 'react';

const CoordinatesContext = createContext({});

interface Coordinates {
    lat: number
    long: number
}

interface CoordinatesProviderProps {
    children: React.ReactNode
}

export function CoordinatesProvider({ children }: CoordinatesProviderProps) {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            return setError(true);
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
        });
    }, []);

    return (
        <CoordinatesContext.Provider value={{ coordinates, setCoordinates, error }}>
            {children}
        </CoordinatesContext.Provider>
    );
}