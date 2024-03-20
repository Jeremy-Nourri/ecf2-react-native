import {Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {clearPokeball, fetchPokeball, removePokemon} from '../features/slicePokeball';
import Card from '../components/Card';


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
            {pokeball.length === 0 ? (
                <Text>Vous n'avez pas de pokémon dans votre collection</Text>
            ) : (
                <>
                    <View style={styles.cardsContainer}>
                        <FlatList
                            data={pokeball}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => (
                                <>
                                    <Card
                                        name={item.name}
                                        imageUrl={item.image}
                                        pokedexId={item.id}
                                        navigation={navigation}
                                    />
                                    <Pressable
                                        style={styles.iconRemove}
                                        onPress={() => {
                                            dispatch(removePokemon(item.id));
                                        }}>
                                        <Icon
                                            name="times-circle"
                                            size={30}
                                            color="red"
                                            style={{textAlign: 'center'}}
                                        />
                                    </Pressable>
                                </>
                            )}
                        />
                    </View>
                    <Pressable
                        style={styles.clearButton}
                        onPress={handleClearPokeball}>
                        <Text style={styles.clearButtonText}>
                            Vider ma collection
                        </Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

export default Collection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconRemove: {
        position: 'absolute',
        top: 17,
        right: 27,
        backgroundColor: 'white',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: 'red',
        marginHorizontal: 20,
        marginVertical: 30,
        borderRadius: 10,
        padding: 20,
        elevation: 3,
    },
    clearButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
