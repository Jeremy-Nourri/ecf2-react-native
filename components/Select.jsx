import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';

import {filterByType, sortBy, fetchPokemons} from '../features/slicePokemons';
import { fetchTypes } from '../features/sliceTypes';

const Select = () => {
    const dispatch = useDispatch();

    const types = useSelector(state => state.types.types);

    useEffect(() => {
        dispatch(fetchTypes());
    }
    , [dispatch]);

    const handleSelectByType = (value) => {
        if (value === '') {
            dispatch(fetchPokemons());
            return;
        } else {
            dispatch(filterByType(value));
        }
    };

    const handleSortBy = (value) => {
        if (value === '') {
            dispatch(fetchPokemons());
            return;
        } else {
            dispatch(sortBy(value));
        }
    };

    return (
        <View>
            <RNPickerSelect
                placeholder={{label: 'Afficher un type :', value: ''}}
                onValueChange={value => handleSelectByType(value)}
                items={types.map((type) => ({
                    label: type.name,
                    value: type.name,
                }))}
            />
            <RNPickerSelect
                placeholder={{label: 'Trier par :', value: ''}}
                onValueChange={value => handleSortBy(value)}
                items={[
                    {label: 'Tri par type', value: 'type'},
                    {label: "Tri par l'idPokedex", value: 'pokedexId'},
                ]}
            />
        </View>
    );
};
export default Select;
