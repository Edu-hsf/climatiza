import getOpenMeteoAPI from '@/services/openMeteo/openMeteoAPI';
import WeatherData from '@/utils/weather/weatherData';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface WeatherState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    data: WeatherData | null
}

interface FetchWeatherPayload {
    lat: string
    long: string
}

const initialState: WeatherState = {
    status: 'idle',
    data: null
}

export const fetchWeatherAsync = createAsyncThunk<WeatherData, FetchWeatherPayload>(
    'weather/fetchWeatherAsync',
    async (coordinates) => {
        const data = await getOpenMeteoAPI(coordinates.lat, coordinates.long);
        return new WeatherData(data);
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<WeatherData>) => {
            state.data = action.payload;
        },
        clearWeather: (state) => {
            state.data = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchWeatherAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchWeatherAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload;
            })
            .addCase(fetchWeatherAsync.rejected, state => {
                state.status = 'failed'
            })
    }
})

export const { setWeather, clearWeather } = weatherSlice.actions
export default weatherSlice.reducer
