import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchPokeball = createAsyncThunk(
    'pokeball/fetchPokeball',
    async () => {
        try {
            const pokeball = await AsyncStorage.getItem('pokeball');
            return pokeball ? JSON.parse(pokeball) : [];
        } catch (error) {
            console.error(error);
        }
    }
);

export const capturePokemon = createAsyncThunk(
    'pokeball/capturePokemon',
    async (pokemon) => {
        try {
            let pokeball = await AsyncStorage.getItem('pokeball');
            pokeball = pokeball ? JSON.parse(pokeball) : [];
            pokeball.push(pokemon);
            await AsyncStorage.setItem('pokeball', JSON.stringify(pokeball));
            return pokeball;
        } catch (error) {
            console.error(error);
        }
    }
);

export const removePokemon = createAsyncThunk(
    'pokeball/removePokemon',
    async (pokemonId) => {
        try {
            let pokeball = await AsyncStorage.getItem('pokeball');
            pokeball = pokeball ? JSON.parse(pokeball) : [];
            pokeball = pokeball.filter(poke => poke.id !== pokemonId);
            await AsyncStorage.setItem('pokeball', JSON.stringify(pokeball));
            return pokeball;
        } catch (error) {
            console.error(error);
        }
    }
);

export const clearPokeball = createAsyncThunk(
    'pokeball/removePokeball',
    async () => {
        try {
            await AsyncStorage.removeItem('pokeball');
            return [];
        } catch (error) {
            console.error(error);
        }
    }
);

export const slicePokeball = createSlice({
    name: 'pokeball',
    initialState: {
        pokeball: [],
        count: 0,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokeball.fulfilled, (state, action) => {
                state.pokeball = action.payload;
                state.count = action.payload.length;
                console.log(state.count);
            })
            .addCase(capturePokemon.fulfilled, (state, action) => {
                state.pokeball = action.payload;
                state.count = action.payload.length;
                console.log(state.count);
            })
            .addCase(clearPokeball.fulfilled, (state, action) => {
                state.pokeball = action.payload;
                state.count = action.payload.length;
                console.log(state.count);
            })
            .addCase(removePokemon.fulfilled, (state, action) => {
                state.pokeball = action.payload;
                state.count = action.payload.length;
                console.log(state.count);
            });
    },
});
export default slicePokeball.reducer;
