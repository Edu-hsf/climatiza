import getWeather from "@/services/weather/weather.service";
import { createWrapper } from "@/utils/reactQueryWrapper";
import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "./useWeather";

vi.mock('@/services/weather/weather.service', () => ({
    default: vi.fn(),
}));

const mockedGetWeather = getWeather as unknown as ReturnType<typeof vi.fn>;

describe('useWeather', () => {
    it('não deve buscar quando não há latitude/longitude', async () => {
        const wrapper = createWrapper(null);

        const { result } = renderHook(
            () => useWeather(),
            { wrapper },
        );

        expect(result.current.fetchStatus).toBe('idle');
        expect(mockedGetWeather).not.toHaveBeenCalled();
    });

    it('deve buscar weather corretamente', async () => {
        mockedGetWeather.mockResolvedValue({
            temp: 25,
        });

        const wrapper = createWrapper({ lat: 10, long: -20 });

        const { result } = renderHook(
            () => useWeather(),
            { wrapper },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockedGetWeather).toHaveBeenCalledWith(10, -20);
        expect(result.current.data).toEqual({ temp: 25 });
    });

    it('deve manter configuração do query corretamente', async () => {
        mockedGetWeather.mockResolvedValue({ temp: 30 });

        const wrapper = createWrapper({ lat: 10, long: -20 });

        const { result } = renderHook(
            () => useWeather(),
            { wrapper },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        // valida comportamento real (cache evita refetch imediato)
        const firstCallCount = mockedGetWeather.mock.calls.length;

        renderHook(() => useWeather(), { wrapper });

        expect(mockedGetWeather.mock.calls.length).toBe(firstCallCount);
    });
});