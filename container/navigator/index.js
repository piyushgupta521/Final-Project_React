import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Views/Home';
import Basket from '../Views/Basket';
import ProductDetail from '../Views/ProductDetail';

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{animation:'fade'}} >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Basket" component={Basket} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Navigation;