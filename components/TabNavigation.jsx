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
// import mirageLogo from "../assets/images/mapLogos/mirageLogo.png";
const Tab = createBottomTabNavigator();
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapDisplay from "./MapDisplay";
import Inferno from "./maps/Inferno";
import Overpass from "./maps/Overpass";
import Vertigo from "./maps/Vertigo";
import Nuke from "./maps/Nuke";
import Anubis from "./maps/Anubis";
import Ancient from "./maps/Ancient";
import {Image} from "react-native";
import nuke from "./maps/Nuke";
import AddTactic from "./addTactic";

export default function TabNavigation() {

    const {colors} = useTheme()

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarButton: [
                    "add-tactic",
                    "czego nie pokazywac2",
                ].includes(route.name)
                    ? () => {
                        return null;
                    } : undefined,
                tabBarIcon: () => {
                    if (route.name === 'home') {
                        return <MaterialIcons color="#FFF" size={35} name="home"/>
                    }
                    if (route.name === 'mirage') {
                        return <Image source={mirageLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'inferno') {
                        return <Image source={infernoLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'overpass') {
                        return <Image source={overpassLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'ancient') {
                        return <Image source={ancientLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'nuke') {
                        return <Image source={nukeLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'vertigo') {
                        return <Image source={vertigoLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                    if (route.name === 'anubis') {
                        return <Image source={anubisLogo} style={{height: 30, width: 30}} name="mirage"/>
                    }
                },
                tabBarStyle: {
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#0F1114',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: "#FFF"
            })}
        >
            <Tab.Screen name="home" component={MapDisplay} options={{headerShown: false}}/>
            <Tab.Screen name="mirage" component={Mirage} options={{headerShown: false}}/>
            <Tab.Screen name="inferno" component={Inferno} options={{headerShown: false}}/>
            <Tab.Screen name="overpass" component={Overpass} options={{headerShown: false}}/>
            <Tab.Screen name="ancient" component={Ancient} options={{headerShown: false}}/>
            <Tab.Screen name="nuke" component={Nuke} options={{headerShown: false, headerTitle: ""}}/>
            <Tab.Screen name="vertigo" component={Vertigo} options={{headerShown: false}}/>
            <Tab.Screen name="anubis" component={Anubis} options={{headerShown: false}}/>
            <Tab.Screen name="add-tactic" component={AddTactic} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}
