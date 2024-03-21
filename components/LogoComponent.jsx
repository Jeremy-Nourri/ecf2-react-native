import {StyleSheet, View, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import pokemonLogo from '../assets/images/pokemon-logo.png';

const LogoComponent = ({setIsSearchDisplay}) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pokemonLogoContainer}
                onPress={() => navigation.navigate('Home')}>
                <Image style={styles.pokemonLogo} source={pokemonLogo} />
            </Pressable>
            <View style={styles.iconSearchContainer}>
                <Pressable
                    onPress={() => setIsSearchDisplay(true)}>
                    <Icon name="search" style={styles.iconSearch} />
                </Pressable>
            </View>
        </View>
    );
};

export default LogoComponent;
const styles = StyleSheet.create({
    pokemonLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#316ab2',
    },
    pokemonLogo: {
        width: '40%',
        height: 62,
    },
    iconSearchContainer: {
        position: 'absolute',
        right: 40,
        top: 25,
    },
    iconSearch: {
        color: '#F9F9F9',
        fontSize: 30,
    },

});
