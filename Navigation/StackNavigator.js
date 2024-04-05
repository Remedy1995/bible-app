// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
// import Screen3 from './Screen3';
// import Screen4 from './Screen4';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      {/* <Stack.Screen name="Screen3" component={Screen1} />
      <Stack.Screen name="Screen4" component={Screen2} /> */}
      {/* <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen4" component={Screen4} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigator;
