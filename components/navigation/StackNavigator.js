import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import Login from '../login';
import Register from '../register';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      
      
    </Stack.Navigator>
  );
};

export default HomeStack;