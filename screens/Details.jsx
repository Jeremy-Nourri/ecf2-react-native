import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { capturePokemon } from '../features/slicePokeball';


const Details = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons.pokemons);
    const {name} = route.params;

    const pokemonDetails = pokemons.filter(pokemon => pokemon.name === name);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name,
        });
    }
    , [navigation, name]);

  return (
    <View style={styles.container}>
        <FlatList
            data={pokemonDetails}
            style={styles.flatList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
                <View style={styles.containerItem}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Image
                        style={styles.picture}
                        source={{
                            uri: item.image,
                        }}
                    />
                    <Text>Numéro de Pokedex: {item.pokedexId}</Text>
                    {item.apiTypes.map((type, index) => (
                        <View key={index} style={styles.typeContainer}>
                            <Text>{type.name}</Text>
                            <Image
                                style={styles.picture}
                                source={{
                                    uri: type.image,
                                }}
                            />
                        </View>
                    ))}
                    <Text>{item.description}</Text>
                    <Text>Statistiques :</Text>
                    <View>
                        <Text>HP : {item.stats.HP}</Text>
                        <Text>Attaque : {item.stats.attack}</Text>
                        <Text>Défense : {item.stats.defense}</Text>
                        <Text>Attaque Spéciale : {item.stats.special_attack}</Text>
                        <Text>Défense Spéciale : {item.stats.special_defense}</Text>
                        <Text>Vitesse : {item.stats.speed}</Text>

                    </View>
                </View>
            )}
        />
        <Pressable
            style={styles.button}
            onPress={() => {
                dispatch(capturePokemon(pokemonDetails[0]));
            }}
        >
            <Text>Capturer</Text>
        </Pressable>



    </View>
  );
};
export default Details;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '100%',
        height: '100%',
    },
    containerItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 30,
    },
    picture: {
        width: 200,
        height: 200,
    },
    typeContainer: {
        flexDirection: 'row',
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
});

