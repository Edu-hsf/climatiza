import { useQuery } from '@tanstack/react-query';
import { getLocationByCoordinates, getLocationBySearch } from '@/services/location/location.service';

export function useLocation(latitude: string, longitude: string) {
  return useQuery({
    queryKey: ['location', latitude, longitude],

    queryFn: () => getLocationByCoordinates(latitude, longitude),

    enabled: Boolean(latitude && longitude),

    staleTime: 1000 * 60 * 10,
  });
}

export function useLocationSearch(search: string) {
  const isEnabled = search.trim().length >= 3;

  return useQuery({
    queryKey: ['location-search', search],

    queryFn: () => getLocationBySearch(search),

    enabled: isEnabled,

    staleTime: 1000 * 60 * 5,
  });
}