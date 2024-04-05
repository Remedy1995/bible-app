// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator'; // Your stack navigator

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (

      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={StackNavigator} />
        {/* Add more Drawer.Screen components for other screens */}
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;
