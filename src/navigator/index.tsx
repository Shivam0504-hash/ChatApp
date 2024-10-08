import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashscreen';
import BottomTabNavigator from './bottomtab'; // Import the BottomTabNavigator
import { ScreenNames } from './screenNames';
import NewChatScreen from '../screens/newchatscreen';
import ChatRoomScreen from '../screens/chatroom';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.SplashScreen}>
        {/* Splash Screen */}
        <Stack.Screen
          name={ScreenNames.SplashScreen}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        
        {/* Bottom Tab Navigator */}
        <Stack.Screen
          name="Main" // Name for the bottom tab navigator
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.NewChatScreen} // Name for the bottom tab navigator
          component={NewChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.ChatRoomScreen} // Name for the bottom tab navigator
          component={ChatRoomScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;