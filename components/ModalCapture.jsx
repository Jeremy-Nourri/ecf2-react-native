import {Modal, StyleSheet, Text, View, Image} from 'react-native';
import capture from '../assets/images/capture.webp';

const ModalCapture = ({modalIsVisible, pokemonName}) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalIsVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image style={styles.image} source={capture} />
                        <Text style={styles.modalText}>{pokemonName} est capturé !</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalCapture;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#316ab2',
    },
    modalView: {
        width: '80%',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '100%',
    },
    modalText: {
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});
