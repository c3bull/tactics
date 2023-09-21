import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import Mirage from "./maps/Mirage";
import {
    mirageLogo,
    ancientLogo,
    nukeLogo,
    anubisLogo,
    vertigoLogo,
    overpassLogo,
    infernoLogo
} from "../assets/images/mapLogos/mapLogos"
import tactiIcon from "../assets/adaptive-icon.png";

const Tab = createBottomTabNavigator();
import MapDisplay from "./MapDisplay";
import Inferno from "./maps/Inferno";
import Overpass from "./maps/Overpass";
import Vertigo from "./maps/Vertigo";
import Nuke from "./maps/Nuke";
import Anubis from "./maps/Anubis";
import Ancient from "./maps/Ancient";
import {Image} from "react-native";
import AddTactic from "./addTactic";
import StratsRoulette from "./StratsRoulette";

export default function TabNavigation() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarButton: [
                    "add-tactic",
                    "strats-roulette",
                ].includes(route.name)
                    ? () => {
                        return null;
                    } : undefined,
                tabBarIcon: () => {
                    if (route.name === 'home') {
                        // return <MaterialIcons color="#FFF" size={35} name="home"/>
                        return <Image source={tactiIcon} style={{height: 30, width: 30}} name="home"/>
                    }
                    if (route.name === 'mirage') {
                        return <Image source={mirageLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'inferno') {
                        return <Image source={infernoLogo} style={{height: 30, width: 30}} name="inferno"/>
                    }
                    if (route.name === 'overpass') {
                        return <Image source={overpassLogo} style={{height: 30, width: 30}} name="overpass"/>
                    }
                    if (route.name === 'ancient') {
                        return <Image source={ancientLogo} style={{height: 30, width: 30}} name="ancient"/>
                    }
                    if (route.name === 'nuke') {
                        return <Image source={nukeLogo} style={{height: 30, width: 30}} name="nuke"/>
                    }
                    if (route.name === 'vertigo') {
                        return <Image source={vertigoLogo} style={{height: 30, width: 30}} name="vertigo"/>
                    }
                    if (route.name === 'anubis') {
                        return <Image source={anubisLogo} style={{height: 30, width: 30}} name="anubis"/>
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#0F1114',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    borderRadius: 5,
                },
                tabBarActiveTintColor: "#FFF",
                tabBarActiveBackgroundColor: "#272727",
            })}
        >
            <Tab.Screen name="home" component={MapDisplay} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="mirage" component={Mirage} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="inferno" component={Inferno} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="overpass" component={Overpass} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="ancient" component={Ancient} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="nuke" component={Nuke} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="vertigo" component={Vertigo} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="anubis" component={Anubis} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="add-tactic" component={AddTactic} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Tab.Screen name="strats-roulette" component={StratsRoulette}
                        options={{headerShown: false, tabBarShowLabel: false}}/>
        </Tab.Navigator>
    );
}
