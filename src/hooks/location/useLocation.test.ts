import { createWrapper } from '@/utils/reactQueryWrapper';
import { useLocation, useLocationSearch } from './useLocation';

vi.mock('@/services/location/location.service', () => ({
  getLocationByCoordinates: vi.fn(),
  getLocationBySearch: vi.fn(),
}));

import {
  getLocationByCoordinates,
  getLocationBySearch,
} from '@/services/location/location.service';
import { renderHook, waitFor } from '@testing-library/react';

const mockedCoords = getLocationByCoordinates as unknown as ReturnType<typeof vi.fn>;
const mockedSearch = getLocationBySearch as unknown as ReturnType<typeof vi.fn>;

describe('useLocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve buscar localização com coordenadas válidas', async () => {
    mockedCoords.mockResolvedValue({ city: 'Brasília' });

    const wrapper = createWrapper({ lat: 10, long: -20 });

    const { result } = renderHook(
      () => useLocation(),
      { wrapper },  
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedCoords).toHaveBeenCalledWith(10, -20);
    expect(result.current.data).toEqual({ city: 'Brasília' });
  });

  it('não deve executar query se faltar latitude ou longitude', async () => {
    const wrapper = createWrapper(null);

    const { result } = renderHook(
      () => useLocation(),
      { wrapper },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedCoords).not.toHaveBeenCalled();
  });
});

describe('useLocationSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve buscar quando search tem 3+ caracteres', async () => {
    mockedSearch.mockResolvedValue([
      { city: 'Brasília' },
      { city: 'Goiânia' },
    ]);

    const wrapper = createWrapper({ lat: 10, long: -20 });

    const { result } = renderHook(
      () => useLocationSearch('bra'),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedSearch).toHaveBeenCalledWith('bra');
    expect(result.current.data).toHaveLength(2);
  });

  it('não deve executar search com menos de 3 caracteres', () => {
    const wrapper = createWrapper({ lat: 10, long: -20 });

    const { result } = renderHook(
      () => useLocationSearch('ab'),
      { wrapper },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedSearch).not.toHaveBeenCalled();
  });

  it('deve ignorar espaços na validação do search', () => {
    const wrapper = createWrapper({ lat: 10, long: -20 });

    renderHook(
      () => useLocationSearch('   '),
      { wrapper },
    );

    expect(mockedSearch).not.toHaveBeenCalled();
  });
});