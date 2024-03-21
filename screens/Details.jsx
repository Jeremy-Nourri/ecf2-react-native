import {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {capturePokemon, removePokemon} from '../features/slicePokeball';
import pokeballIcon from '../assets/images/pokeball.png';
import ModalCapture from '../components/ModalCapture';

const Details = ({route, navigation}) => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons.pokemons);
    const {name} = route.params;

    const [isCapturing, setIsCapturing] = useState(false);

    const pokemonDetails = pokemons.filter(pokemon => pokemon.name === name);

    const pokeball = useSelector(state => state.pokeball.pokeball);

    const isInPokeball = pokeball.some(pokemon => pokemon.name === name);

    const handleCapture = () => {
        setIsCapturing(true);
        dispatch(capturePokemon(pokemonDetails[0]));
        setTimeout(() => {
            setIsCapturing(false);
        }, 2000);
    };

    const handleRelease = () => {
        dispatch(removePokemon(pokemonDetails[0].id));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name,
        });
    }, [navigation, name]);

    return isCapturing ? (
        <ModalCapture modalIsVisible={isCapturing} pokemonName={name} />
    ) : (
        <View style={styles.container}>
            <FlatList
                data={pokemonDetails}
                style={styles.flatList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.containerItem}>
                        <View style={styles.topContainerItem}>
                            <Image
                                style={styles.picture}
                                source={{
                                    uri: item.image,
                                }}
                            />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.pokedexId}>
                                Pokedex id : {item.pokedexId}
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>Types</Text>
                        <View style={styles.typeContainer}>
                            {item.apiTypes.map((type, index) => (
                                <View
                                    key={index}
                                    style={styles.typeSubContainer}>
                                    <Image
                                        style={styles.typePicture}
                                        source={{
                                            uri: type.image,
                                        }}
                                    />
                                    <Text style={styles.text}>{type.name}</Text>
                                </View>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Statistiques</Text>
                        <View style={styles.sectionText}>
                            <Text style={styles.text}>
                                HP : {item.stats.HP}
                            </Text>
                            <Text style={styles.text}>
                                Attaque : {item.stats.attack}
                            </Text>
                            <Text style={styles.text}>
                                Défense : {item.stats.defense}
                            </Text>
                            <Text style={styles.text}>
                                Attaque Spéciale : {item.stats.special_attack}
                            </Text>
                            <Text style={styles.text}>
                                Défense Spéciale : {item.stats.special_defense}
                            </Text>
                            <Text style={styles.text}>
                                Vitesse : {item.stats.speed}
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>Évolutions</Text>
                        <View style={styles.sectionText}>
                            <Text style={styles.text}>
                                {item.apiEvolutions.length === 0
                                    ? 'Aucune évolution'
                                    : item.apiEvolutions.map(
                                          (evolution, index) => (
                                              <Text key={index}>
                                                  {evolution.name} / Pokedex id{' '}
                                                  {evolution.pokedexId}
                                              </Text>
                                          ),
                                      )}
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>Pré évolution</Text>
                        <View style={styles.sectionText}>
                                {item.apiPreEvolution === 'none' ? (
                                    'Aucune pré évolution'
                                ) : (
                                    <Text style={styles.text}>
                                        {item.apiPreEvolution.name} / Pokedex id{' '}
                                        {item.apiPreEvolution.pokedexIdd}
                                    </Text>
                                )}
                        </View>
                    </View>
                )}
            />
            {!isInPokeball ? (
                <Pressable
                    style={styles.button}
                    onPress={handleCapture}
                    disabled={isInPokeball}>
                    <Text style={styles.textButton}>Capturer</Text>
                    <Image style={styles.pokeballIcon} source={pokeballIcon} />
                </Pressable>
            ) : (
                <Pressable
                    style={styles.button}
                    onPress={handleRelease}
                    disabled={!isInPokeball}>
                    <Text style={styles.textButton}>Relâcher</Text>
                    <Image style={styles.pokeballIcon} source={pokeballIcon} />

                </Pressable>
            )}
        </View>
    );
};

export default Details;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        width: '100%',
        height: '100%',
    },
    containerItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainerItem: {
        width: '100%',
        height: 430,
        alignItems: 'center',
        backgroundColor: '#316ab2',
    },
    picture: {
        marginVertical: 20,
        width: 300,
        height: 300,
    },
    name: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    pokedexId: {
        fontSize: 16,
        color: 'white',
    },
    typeContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeSubContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    typePicture: {
        width: 100,
        height: 100,
    },
    sectionTitle: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'lightgrey',
        paddingVertical: 15,
        color: 'black',
    },
    sectionText: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },

    button: {
        backgroundColor: '#316ab2',
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 3,
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10,
    },
    pokeballIcon: {
        width: 30,
        height: 30,
    },
});
