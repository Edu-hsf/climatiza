import { getLocationByCoordinates } from '@/services/mapBox/mapBoxAPI';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface LocationState {
    status: 'idle' | 'loading' | 'failed'
    coordinates: { lat: number; long: number };
    country: string;
    city: string;
}

interface LocationPayload {
  coordinates: { lat: number; long: number }
  country: string
  city: string
}

const initialState: LocationState = {
    status: 'idle',
    coordinates: { lat: 0, long: 0 },
    country: '',
    city: ''
}

export const changeLocationAsync = createAsyncThunk<LocationPayload>(
        'location/changeLocationAsync',
        async () => {
            if (!("geolocation" in navigator)) throw new Error('Unfortunately, your browser is not compatible with location services.')

            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })

            const { latitude, longitude } = position.coords

            const currentlocation = await getLocationByCoordinates(latitude, longitude)

            return {
                coordinates: { lat: latitude, long: longitude },
                country: currentlocation.features[0].properties.context.country.name,
                city: currentlocation.features[0].properties.name
            }
        }
    )

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeLocation: (state, action: PayloadAction<LocationPayload>) => {
            state.coordinates = action.payload.coordinates;
            state.country = action.payload.country;
            state.city = action.payload.city;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(changeLocationAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(changeLocationAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.coordinates = action.payload.coordinates;
                state.country = action.payload.country;
                state.city = action.payload.city;
            })
            .addCase(changeLocationAsync.rejected, state => {
                state.status = 'failed'
            })
    }
})

export const { changeLocation } = locationSlice.actions
export default locationSlice.reducer
