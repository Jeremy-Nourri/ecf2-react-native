import {StyleSheet, Text, View, Pressable, Image} from 'react-native';

const Card = ({navigation, name, imageUrl, pokedexId}) => {
    return (
        <View style={styles.containerPressable}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Details', {name: name});
                }}>
                    <Image
                        style={styles.picture}
                        source={{
                            uri: imageUrl,
                        }}
                    />
                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>{name}</Text>
                    <Text style={styles.textDetails}>
                        Id Pokedex: {pokedexId}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
export default Card;

const styles = StyleSheet.create({
    containerPressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        width: '90%',
        height: 120,
        borderRadius: 10,
        elevation: 5,
    },
    picture: {
        width: 100,
        height: 100,
    },
    containerTitle: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    containerDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textDetails: {
        fontSize: 15,
    },
});
