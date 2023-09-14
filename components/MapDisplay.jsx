import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {maps} from "../constants/maps";
import {SplashScreen, useRouter} from "expo-router";

import tacticsBg from "../assets/images/maps/tactics.png";
import {useCallback, useState} from "react";
import {useFonts} from "expo-font";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {LinearGradient} from "expo-linear-gradient";

const getFonts = () =>
    Font.loadAsync({
        PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
        PoppinsSemiBold: require("../assets/fonts/PoppinsSemiBold.ttf"),
    });

const MapDisplay = ({navigation}) => {

    const router = useRouter()
    const [fontsloaded, setFontsLoaded] = useState(false);
    // if (fontsloaded) {
    return (
        // <ScrollView style={{backgroundColor: "#0F1114", paddingBottom: 200}}>

        <ScrollView style={{backgroundColor: "#0F1114", flex: 1}} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity style={styles.addTactic} onPress={() => {
                navigation.navigate('add-tactic')
            }}>

                <ImageBackground source={tacticsBg} resizeMode="cover" style={styles.imgBackground}>
                    <LinearGradient
                        colors={["#00A4A4", "#0F1114"]}
                        start={[0.1, 0.1]}
                        end={[0.3, 0.89]}
                        style={styles.linearGradient}
                    >
                        <Text style={styles.addTacticText}>Add Tactic</Text>
                        <Text style={styles.addTacticSubText}>Click to create your own tactic!</Text>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.headerText}>My Tactics</Text>
            <View style={styles.tacticsWrapper}>
                {maps.map(({logo, name, href}, key) => (
                    <TouchableOpacity style={styles.singleTactic} key={key} onPress={() => {
                        navigation.navigate(href)
                    }}>
                        <LinearGradient
                            colors={["#00A4A4", "#0F1114"]}
                            start={[-1, 1]}
                            end={[-1, 0.3]}
                            style={styles.linearGradientButtons}
                        >
                            <View style={{display: "flex", flexDirection: "row", height: '100%'}}>
                                <Image source={logo} style={styles.tacticImage}/>
                                <Text style={styles.text}>{name}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>
            {/*<Text style={styles.headerText}>Smokes guide</Text>*/}
            <View style={styles.stratsRoulette}>
                <Text style={styles.headerText}>Strats Roulette</Text>
                <Text style={styles.stratsRouletteSubText}>Don't respect your enemies?</Text>
                <Text style={styles.stratsRouletteSubText}>Want to have more fun with friends?</Text>
                <View style={styles.stratsRouletteButtonsWrapper}>
                    <View style={styles.stratsRouletteClientButtons}>
                        <TouchableOpacity style={styles.stratsRouletteClientSingleButton}>
                            <LinearGradient
                                colors={["#00A4A4", "#0F1114"]}
                                start={[-1, 1]}
                                end={[-1, 0.3]}
                                style={styles.linearGradientButtons}
                            >
                                <Text style={styles.stratsText}>Add Funny Strat</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.stratsRouletteClientSingleButton}>
                            <LinearGradient
                                colors={["#00A4A4", "#0F1114"]}
                                start={[-1, 1]}
                                end={[-1, 0.3]}
                                style={styles.linearGradientButtons}
                            >
                                <Text style={styles.stratsText}>Your Funny Strats</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.stratsRouletteMoreTactics}>
                        <LinearGradient
                            colors={["#00A4A4", "#0F1114"]}
                            start={[-1, 1]}
                            end={[-1, 0.3]}
                            style={styles.linearGradientButtons}
                        >
                            <Text style={styles.stratsText}>More funny strats</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradientButtons: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
        padding: 3,
    },
    contentContainer: {
        minHeight: 970,
    },
    addTactic: {
        height: 300,
        overflow: "hidden",
        display: "flex",
    },
    addTacticText: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        textTransform: "uppercase",
        fontWeight: '500',
    },
    tacticsWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
    },
    addTacticSubText: {
        color: '#000',
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        backgroundColor: "#00ffff",
        padding: 8,
        borderRadius: 5,
        transform: [{rotate: '-5 deg'}],
        marginTop: 15,
    },
    singleTactic: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        // justifyContent: "center",
        backgroundColor: "#003636",
        width: "45%",
        // padding: 3,
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    tacticImage: {
        height: '100%',
        width: 41,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    text: {
        display: "flex",
        color: 'white',
        fontSize: 24,
        height: '100%',
        textAlignVertical: 'center',
        padding: 5,
        fontWeight: '500'
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: "600",
        textTransform: "uppercase"
    },
    stratsRoulette: {
        backgroundColor: "#202020",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    stratsRouletteButtonsWrapper: {
        backgroundColor: "#202020",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        borderRadius: 10,
    },
    stratsRouletteSubText: {
        color: '#000',
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        backgroundColor: "#00ffff",
        padding: 8,
        borderRadius: 5,
    },
    stratsRouletteClientButtons: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
    },
    stratsRouletteClientSingleButton: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: "45%",
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    stratsRouletteMoreTactics: {
        textAlignVertical: 'center',
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: "86%",
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    stratsText: {
        textAlign: "center",
        display: "flex",
        color: 'white',
        fontSize: 17,
        height: '100%',
        textAlignVertical: "center",
        // padding: 3,
        fontWeight: '600',
        textTransform: "uppercase",
    },
});
export default MapDisplay