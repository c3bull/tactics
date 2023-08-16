import React, {useEffect, useState} from 'react';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "../components/TabNavigation";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Navigation/>
    )
}

export function Navigation() {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="TabNavigation" screenOptions={{headerShown: false, headerTitle: ""}}>
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false, headerShadowVisible: false, headerTitle: ""}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}