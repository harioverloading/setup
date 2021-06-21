import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {LogBox, StatusBar, Text, View} from 'react-native';
import {Provider as StateProvider, useSelector} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/login/LoginScreen';
export default function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <StateProvider store={store}>
      <Inital />
    </StateProvider>
  );
}
const Stack = createStackNavigator();
function Inital() {
  const patientProfile = useSelector(state => state.patientProfile);
  useEffect(() => {
    {
      console.log(patientProfile);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar hidden={false} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
