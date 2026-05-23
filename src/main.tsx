import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  ReactQueryDevtools,
} from '@tanstack/react-query-devtools';
import { CoordinatesProvider } from './contexts/coordinatesContext';

const queryClient = new QueryClient();

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <CoordinatesProvider>
      <QueryClientProvider client={queryClient} >

        <App />

        {import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </CoordinatesProvider>
  </StrictMode>,
);