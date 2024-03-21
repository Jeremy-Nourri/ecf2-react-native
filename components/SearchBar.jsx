import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({setIsSearchDisplay, handleSearch}) => {

  return (
        <View style={styles.searchBarContainer}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher par nom ou pokedex id"
                onChangeText={text => handleSearch(text)}
            />
            <Pressable
                style={styles.iconCrossContainer}
                onPress={() => setIsSearchDisplay(false)}>
                <Icon
                    name="times"
                    style={styles.iconCross}
                />
            </Pressable>
        </View>

  );

};
export default SearchBar;
const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#316ab2',
    },
    input: {
        width: '80%',
        height: 50,
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 13,
        backgroundColor: 'white',
        color: 'gray',
    },
    iconCrossContainer: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    iconCross: {
        color: '#F9F9F9',
        fontSize: 30,
    },
});
