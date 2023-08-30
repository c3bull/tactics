import React, {useEffect, useState} from 'react';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "../components/TabNavigation";
import {SafeAreaView, StatusBar, View} from "react-native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Navigation/>
    )
}

export function Navigation() {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Navigator initialRouteName="TabNavigation"
                             options={{
                                 header: null,
                                 headerShown: false,
                                 headerShadowVisible: false,
                             }} screenOptions={{headerShown: false, headerTitle: "lawl"}}>
                <Stack.Screen name="TabNavigation" component={TabNavigation}

                />
            </Stack.Navigator>
        </SafeAreaView>
    );
}
