/* eslint-disable react/no-unstable-nested-components */
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import store from './store/store';

import MyHeader from './components/MyHeader';
import Home from './screens/Home';
import Details from './screens/Details';
import Collection from './screens/Collection';

const App = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        header: ({navigation, route, options, back}) => {
                            const title = getHeaderTitle(options, route.name);
                            return (
                                <MyHeader
                                    title={title}
                                    leftButton={
                                        back ? (
                                            <Pressable
                                                onPress={navigation.goBack}>
                                                <Icon
                                                    name="angle-left"
                                                    size={27}
                                                    color="black"
                                                />
                                            </Pressable>
                                        ) : null
                                    }
                                />
                            );
                        },
                    }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
                    <Stack.Screen name="Collection" component={Collection} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};
export default App;
