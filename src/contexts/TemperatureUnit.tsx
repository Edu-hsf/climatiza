import { createContext, useEffect, useState } from 'react';

interface Unit {
    id: number
    name: 'celsius' | 'fahrenheit'
}

interface TemperatureUnitContextType {
    unit: Unit
    setUnit: React.Dispatch<React.SetStateAction<Unit>>
}

interface TemperatureUnitProviderProps {
    children: React.ReactNode
}

export const TemperatureUnitContext = createContext<TemperatureUnitContextType>({} as TemperatureUnitContextType);

export function TemperatureUnitProvider({ children }: TemperatureUnitProviderProps) {
    const [unit, setUnit] = useState<Unit>(() => {
        const val = localStorage.getItem('unit');
        const unit = JSON.parse(val as string) as Unit;

        return unit ? unit : { id: 1, name: 'celsius' } as Unit;
    });

    useEffect(() =>
        localStorage.setItem("unit", JSON.stringify({ id: unit.id, name: unit.name })),
        [unit]);

    return (
        <TemperatureUnitContext.Provider value={{ unit, setUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
}