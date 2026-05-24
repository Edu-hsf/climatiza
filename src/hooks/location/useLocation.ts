import { useQuery } from '@tanstack/react-query';
import { getLocationByCoordinates, getLocationBySearch } from '@/services/location/location.service';
import { useContext } from 'react';
import { CoordinatesContext } from '@/contexts/CoordinatesContext';


export function useLocation() {
  const { coordinates } = useContext(CoordinatesContext);

  return useQuery({
    queryKey: [
      'location',
      coordinates?.lat,
      coordinates?.long,
    ],

    queryFn: () =>
      getLocationByCoordinates(
        coordinates!.lat,
        coordinates!.long,
      ),

    enabled: !!coordinates,

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