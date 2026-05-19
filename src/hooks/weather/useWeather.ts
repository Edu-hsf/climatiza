import { useQuery } from '@tanstack/react-query';

import getWeather from '@/services/weather/weather.service';

export function useWeather(
  latitude?: string,
  longitude?: string,
) {
  return useQuery({
    queryKey: [
      'weather',
      latitude,
      longitude,
    ],

    queryFn: () =>
      getWeather(
        latitude!,
        longitude!,
      ),

    enabled:
      !!latitude && !!longitude,

    staleTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}