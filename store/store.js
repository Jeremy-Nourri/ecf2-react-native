import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from '../features/slicePokemons';
import typeReducer from '../features/sliceTypes';

export default configureStore({
    reducer: {
        pokemons: pokemonReducer,
        types: typeReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
