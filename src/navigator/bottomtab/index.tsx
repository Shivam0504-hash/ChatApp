import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../../screens/chatscreen';
import Account from '../../screens/account';
import Favourite from '../../screens/favourite';
import Menu from '../../screens/menu';
import { Icons } from '../../assets';
import { ScreenNames } from '../screenNames';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={ScreenNames.ChatScreen}
      component={ChatScreen}
      options={{
        headerShown: false,
        tabBarIcon: () => <Image source={Icons.homeicon} style={{ width: 24, height: 24 }} />,
        tabBarLabel: 'Chats',
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        headerShown: false,
        tabBarIcon: () => <Image source={Icons.account} style={{ width: 24, height: 24 }} />,
        tabBarLabel: 'Account',
      }}
    />
    <Tab.Screen
      name="Favourite"
      component={Favourite}
      options={{
        headerShown: false,
        tabBarIcon: () => <Image source={Icons.star} style={{ width: 24, height: 24 }} />,
        tabBarLabel: 'Favourites',
      }}
    />
    <Tab.Screen
      name="Menu"
      component={Menu}
      options={{
        headerShown: false,
        tabBarIcon: () => <Image source={Icons.menu} style={{ width: 24, height: 24 }} />,
        tabBarLabel: 'Menu',
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;