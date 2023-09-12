import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "../components/TabNavigation";
import {SafeAreaView, StatusBar} from "react-native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Navigation/>
    )
}

export function Navigation() {

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor="transparent"
                       translucent={true} />

            <Stack.Navigator initialRouteName="TabNavigation"
                             options={{
                                 header: false,
                                 headerShown: false,
                                 headerShadowVisible: false,
                             }} screenOptions={{headerShown: false, headerTitle: ""}}>
                <Stack.Screen name="TabNavigation" component={TabNavigation}/>
            </Stack.Navigator>
        </SafeAreaView>
    );
}
