import { CoordinatesContext } from '@/contexts/CoordinatesContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function createWrapper(coordinates: { lat: number, long: number } | null) {
  const queryClient = createTestQueryClient();

  return function Wrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <QueryClientProvider client={queryClient}>
        <CoordinatesContext.Provider value={{ coordinates, setCoordinates: vi.fn() }}>
          {children}
        </CoordinatesContext.Provider>
      </QueryClientProvider>
    );
  };
}