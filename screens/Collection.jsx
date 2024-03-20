import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { clearPokeball, fetchPokeball } from '../features/slicePokeball';
import Card from '../components/Card';
import { useEffect } from 'react';


const Collection = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPokeball());
    }, [dispatch]);

    const pokeball = useSelector(state => state.pokeball.pokeball);

    const handleClearPokeball = () => {
        dispatch(clearPokeball());
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.clearButton}
                onPress={handleClearPokeball}>
                <Text style={styles.clearButtonText}>Vider ma collection</Text>
            </Pressable>
            <View style={styles.cardsContainer}>
                {pokeball.map((pokemon, index) => (
                    <Card
                        key={index}
                        name={pokemon.name}
                        imageUrl={pokemon.image}
                        pokedexId={pokemon.id}
                        navigation={navigation}
                    />
                ))}
            </View>
        </View>
    );

};

export default Collection;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearButton: {
        backgroundColor: 'red',
        margin: 10,
        borderRadius: 10,
        padding: 20,
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

