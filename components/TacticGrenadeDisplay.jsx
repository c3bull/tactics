import {ImageBackground, StyleSheet, View} from "react-native";
import React from "react";
import smokeImage from "../assets/images/smoke.webp";
import flashImage from "../assets/images/flash.webp";
import molotovImage from "../assets/images/molotov.webp";

export default function TacticGrenadeDisplay({tactic, grenadeName, grenadeStyle}) {
    return (
        <View>
            {JSON.stringify(tactic).includes(grenadeName) && <View style={[grenadeStyle, grenadeName && (
                tactic.yellowUtility.toString().includes(grenadeName) && styles.selectedGrenadeYellow ||
                tactic.blueUtility.toString().includes(grenadeName) && styles.selectedGrenadeBlue ||
                tactic.purpleUtility.toString().includes(grenadeName) && styles.selectedGrenadePurple ||
                tactic.greenUtility.toString().includes(grenadeName) && styles.selectedGrenadeGreen ||
                tactic.orangeUtility.toString().includes(grenadeName) && styles.selectedGrenadeOrange
            )]}>
                {grenadeName.toLowerCase().includes("smoke") &&
                    <ImageBackground source={smokeImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") &&
                    <ImageBackground source={flashImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") &&
                    <ImageBackground source={molotovImage} resizeMode="contain" style={styles.image}/>}
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        margin: 2
    },
    selectedGrenadeYellow: {
        backgroundColor: "#D5C200",
    },
    selectedGrenadeBlue: {
        backgroundColor: "#00ACFF",
    },
    selectedGrenadePurple: {
        backgroundColor: "#B600CF",
    },
    selectedGrenadeGreen: {
        backgroundColor: "#0EB900",
    },
    selectedGrenadeOrange: {
        backgroundColor: "#F07400",
    },
});