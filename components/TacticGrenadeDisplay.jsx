import {ImageBackground, StyleSheet, View} from "react-native";
import React from "react";
import smokeYellow from "../assets/images/smokeYellow.png";
import smokeBlue from "../assets/images/smokeBlue.png";
import smokePurple from "../assets/images/smokePurple.png";
import smokeGreen from "../assets/images/smokeGreen.png";
import smokeOrange from "../assets/images/smokeOrange.png";
import flashImage from "../assets/images/flash.webp";
import flashBlueImage from "../assets/images/flashBlue.png";
import flashPurpleImage from "../assets/images/flashPurple.png";
import flashGreenImage from "../assets/images/flashGreen.png";
import flashOrangeImage from "../assets/images/flashOrange.png";
import molotovYellow from "../assets/images/molotovYellow.png";
import molotovBlue from "../assets/images/molotovBlue.png";
import molotovPurple from "../assets/images/molotovPurple.png";
import molotovGreen from "../assets/images/molotovGreen.png";
import molotovOrange from "../assets/images/molotovOrange.png";

export default function TacticGrenadeDisplay({tactic, grenadeName, grenadeStyle}) {
    return (
        <View>
            {JSON.stringify(tactic).includes(grenadeName) && <View style={[grenadeStyle,
            //     grenadeName && (
            //     tactic.yellowUtility.toString().includes(grenadeName) && styles.selectedGrenadeYellow ||
            //     tactic.blueUtility.toString().includes(grenadeName) && styles.selectedGrenadeBlue ||
            //     tactic.purpleUtility.toString().includes(grenadeName) && styles.selectedGrenadePurple ||
            //     tactic.greenUtility.toString().includes(grenadeName) && styles.selectedGrenadeGreen ||
            //     tactic.orangeUtility.toString().includes(grenadeName) && styles.selectedGrenadeOrange
            // )
            ]}>
                {grenadeName.toLowerCase().includes("smoke") && tactic.yellowUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={smokeYellow} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("smoke") && tactic.blueUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={smokeBlue} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("smoke") && tactic.purpleUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={smokePurple} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("smoke") && tactic.greenUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={smokeGreen} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("smoke") && tactic.orangeUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={smokeOrange} resizeMode="contain" style={styles.image}/>}

                {grenadeName.toLowerCase().includes("flash") && tactic.yellowUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={flashImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") && tactic.blueUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={flashBlueImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") && tactic.purpleUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={flashPurpleImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") && tactic.greenUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={flashGreenImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") && tactic.orangeUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={flashOrangeImage} resizeMode="contain" style={styles.image}/>}

                {grenadeName.toLowerCase().includes("molotov") && tactic.yellowUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={molotovYellow} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") && tactic.blueUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={molotovBlue} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") && tactic.purpleUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={molotovPurple} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") && tactic.greenUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={molotovGreen} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") && tactic.orangeUtility.toString().includes(grenadeName) &&
                    <ImageBackground source={molotovOrange} resizeMode="contain" style={styles.image}/>}
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        // margin: 2
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