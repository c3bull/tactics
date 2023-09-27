import React, {useCallback, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "../components/TabNavigation";
import {SafeAreaView, StatusBar} from "react-native";
import {SplashScreen} from "expo-router";
import * as Font from "expo-font";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Navigation/>
    )
}

export function Navigation() {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
                    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
                    PoppinsSemiBold: require("../assets/fonts/PoppinsSemiBold.ttf"),
                });
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    const onLayoutRootView = async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
            <StatusBar backgroundColor="transparent"
                       translucent={true}/>

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
