import {StyleSheet, Text, View, Pressable, Image} from 'react-native';

const Card = ({navigation, name, imageUrl, pokedexId}) => {
    return (
        <View style={styles.containerPressable}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Details', {name: name});
                }}>
                <View style={styles.containerPicture}>
                    <Image
                        style={styles.picture}
                        source={{
                            uri: imageUrl,
                        }}
                    />
                </View>
                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>{name}</Text>
                    <View style={styles.containerDetails}>
                        <Text style={styles.textDetails}>
                            Id Pokedex: {pokedexId}
                        </Text>
                    </View>
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
        height: 100,
        borderRadius: 10,
    },
    containerPicture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture: {
        width: 50,
        height: 50,
    },
    containerTitle: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 20,
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
