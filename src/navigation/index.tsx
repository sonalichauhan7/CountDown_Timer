import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './route';
import Timer from '../screen/timer';
import AddTimer from '../screen/addTimer';

const Stack = createNativeStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={Routes.Timer} component={Timer} options={{ headerShown: false }} />
                <Stack.Screen name={Routes.AddTimer} component={AddTimer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;