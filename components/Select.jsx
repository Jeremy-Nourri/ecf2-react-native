import {View, StyleSheet, Pressable, Text} from 'react-native';
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
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={{label: 'Afficher type :', value: ''}}
                onValueChange={value => handleSelectByType(value)}
                items={types.map((type) => ({
                    label: type.name,
                    value: type.name,
                }))}
                style={{inputAndroid: styles.input}}
            />
            <RNPickerSelect
                placeholder={{label: 'Trier par :', value: ''}}
                onValueChange={value => handleSortBy(value)}
                items={[
                    {label: 'Trier par type', value: 'type'},
                    {label: "Trier par l'idPokedex", value: 'pokedexId'},
                ]}
                style={{inputAndroid: styles.input}}
            />
            <Pressable
                onPress={() => dispatch(fetchPokemons())}
                style={styles.button}>
                <Text style={styles.textButton}>Reset</Text>
            </Pressable>
        </View>
    );
};
export default Select;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
    },
    input: {
        width: 190,
        height: 46,
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 8,
        borderBlockColor: 'black',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#316ab2',
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    textButton: {
        color: 'white',
    },
});

