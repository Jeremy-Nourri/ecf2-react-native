import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const BASE_URL = 'https://pokebuildapi.fr/api/v1/types';

export const fetchTypes = createAsyncThunk(
    'types/fetchTypes',
    async () => {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const sliceTypes = createSlice({
    name: 'types',
    initialState: {
        types: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.types = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTypes.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default sliceTypes.reducer;
