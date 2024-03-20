import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from '../features/slicePokemons';
import typeReducer from '../features/sliceTypes';
import pokeballReducer from '../features/slicePokeball';

export default configureStore({
    reducer: {
        pokemons: pokemonReducer,
        types: typeReducer,
        pokeball: pokeballReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
