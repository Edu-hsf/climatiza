import { useQuery } from '@tanstack/react-query';

import getWeather from '@/services/weather/weather.service';
import { useContext } from 'react';
import { CoordinatesContext } from '@/contexts/CoordinatesContext';
import { TemperatureUnitContext } from '@/contexts/TemperatureUnit';

export function useWeather() {
  const { coordinates } = useContext(CoordinatesContext);
  const { unit } = useContext(TemperatureUnitContext);

  return useQuery({
    queryKey: [
      'weather',
      coordinates?.lat,
      coordinates?.long,
      unit.name,
    ],

    queryFn: () => 
      getWeather(
        coordinates!.lat,
        coordinates!.long,
        unit.name,
      ),

    enabled: !!coordinates,

    staleTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}