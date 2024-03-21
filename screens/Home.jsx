import {StyleSheet, View, FlatList, Text, Image} from 'react-native';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
    fetchPokemons,
    searchByNameAndByPokedexId,
} from '../features/slicePokemons';
import {fetchPokeball} from '../features/slicePokeball';

import loader from '../assets/images/loader.gif';

import Card from '../components/Card';
import Select from '../components/Select';
import SearchBar from '../components/SearchBar';
import LogoComponent from '../components/LogoComponent';

const Home = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons.pokemons);
    const status = useSelector(state => state.pokemons.status);

    const navigation = useNavigation();

    const [isSearchDisplay, setIsSearchDisplay] = useState(false);

    useEffect(() => {
        dispatch(fetchPokemons());
        dispatch(fetchPokeball());
    }, [dispatch]);

    const handleSearch = text => {
        if (text === '') {
            dispatch(fetchPokemons());
            return;
        }
        dispatch(searchByNameAndByPokedexId(text));
    };

    return (
        <View style={styles.container}>
            {status === 'loading' && (
                <View style={styles.statusContainer}>
                    <Image style={styles.loader} source={loader} />
                    <Text style={styles.loaderText}>
                        Chargement en cours...
                    </Text>
                </View>
            )}

            {status === 'failed' && (
                <View style={styles.statusContainer}>
                    <Text>Une erreur s'est produite</Text>
                </View>
            )}

            {status === 'succeeded' && (
                <>
                    {isSearchDisplay === true ? (
                        <SearchBar
                            handleSearch={handleSearch}
                            setIsSearchDisplay={setIsSearchDisplay}
                        />
                    ) : (
                        <LogoComponent
                            setIsSearchDisplay={setIsSearchDisplay}
                        />
                    )}
                    <View style={styles.cardsContainer}>
                        <FlatList
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
                    <Select />
                </>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#316ab2',
    },
    loaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F9F9F9',
    },

    cardsContainer: {
        backgroundColor: '#316ab2',
    },
});
