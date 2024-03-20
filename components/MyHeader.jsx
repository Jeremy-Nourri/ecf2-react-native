import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import pokeballImage from '../assets/images/pokeball.png';

const MyHeader = ({title, leftButton}) => {
    const navigation = useNavigation();
    const count = useSelector(state => state.pokeball.count);

    return (
        <View style={styles.container}>
            {leftButton}
            <Text style={styles.title}>{title}</Text>
            <Pressable
                style={styles.pokeball}
                onPress={() => navigation.navigate('Collection')}>
                <Image style={styles.pokeballLogo} source={pokeballImage} />
                <View style={[styles.pokemonCountContainer, {display: count === 0 ? 'none' : 'flex'}]}>
                    <Text style={styles.pokemonCount}>{count}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default MyHeader;

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        marginBottom: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
        color: 'black',
    },
    pokeball: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pokeballLogo: {
        width: 50,
        height: 50,
    },
    pokemonCountContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    pokemonCount: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
    },
};
