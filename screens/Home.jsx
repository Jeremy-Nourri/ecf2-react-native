import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {fetchPokemons, searchByNameAndByPokedexId} from '../features/slicePokemons';

import Card from '../components/Card';
import Select from '../components/Select';


const Home = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons.pokemons);

    const navigation = useNavigation();

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const handleSearch = (text) => {
        if (text === '') {
            dispatch(fetchPokemons());
            return;
        }
        dispatch(searchByNameAndByPokedexId(text));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher par nom ou pokedex id"
                onChangeText={handleSearch}
            />

            <Select />

            <FlatList
                styles={styles.flatList}
                data={pokemons}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <Card
                        name={item.name}
                        imageUrl={item.image}
                        pokedexId={item.id}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    );
};
export default Home;
const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 50,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginHorizontal: 20,
        backgroundColor: 'white',
    },
    flatList: {
        width: '100%',
        height: '100%',
        marginTop: 30,
    },
});
