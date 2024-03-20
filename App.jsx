import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <View>
                <Text>App</Text>
            </View>
        </Provider>
    );
};
export default App;

const styles = StyleSheet.create({});
