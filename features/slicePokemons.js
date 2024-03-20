import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const BASE_URL = 'https://pokebuildapi.fr/api/v1/pokemon';

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
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

export const slicePokemons = createSlice({
    name: 'pokemons',
    initialState: {
        pokemons: [],
        status: 'idle',
    },
    reducers: {
        filterByType: (state, action) => {
            state.pokemons = state.pokemons.filter(pokemon => pokemon.apiTypes.map(type => type.name).includes(action.payload));
        },
        sortBy: (state, action) => {
            if (action.payload === 'pokedexId') {
                state.pokemons = state.pokemons.sort((a, b) => a.id - b.id);
            } else if (action.payload === 'type') {
            state.pokemons = state.pokemons.sort((a, b) => a.apiTypes[0].name.localeCompare(b.apiTypes[0].name));
            }
        },
        searchByNameAndByPokedexId: (state, action) => {
            state.pokemons = state.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(action.payload.toLowerCase()) || pokemon.id.toString().includes(action.payload)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemons.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {filterByType, sortBy, searchByNameAndByPokedexId} = slicePokemons.actions;
export default slicePokemons.reducer;
