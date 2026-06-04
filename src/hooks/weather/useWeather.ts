import { useQuery } from '@tanstack/react-query';

import getWeather from '@/services/weather/weather.service';
import { useContext } from 'react';
import { CoordinatesContext } from '@/contexts/CoordinatesContext';

export function useWeather() {
  const { coordinates } = useContext(CoordinatesContext);

  return useQuery({
    queryKey: [
      'weather',
      coordinates?.lat,
      coordinates?.long,
    ],

    queryFn: () => 
      getWeather(
        coordinates!.lat,
        coordinates!.long,
      ),

    enabled: !!coordinates,

    staleTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}