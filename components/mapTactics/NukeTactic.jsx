import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import nukeLayout from "../../assets/images/mapLayouts/nukeLayout.png";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smoke.png";
import flashImage from "../../assets/images/flash.png";
import molotovImage from "../../assets/images/molotov.png";
import deleteImage from "../../assets/images/delete.png";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {nukePositions} from "../common/positions";

export default function NukeTactic({tactic, refresh}) {
    let _ = require('lodash');
    const [nukeTactic, setNukeTactic] = useState([])
    const [showSmokes, setShowSmokes] = useState(true)
    const [showFlashes, setShowFlashes] = useState(true)
    const [showMolotov, setShowMolotov] = useState(true)
    const [showYellowUtility, setShowYellowUtility] = useState(true)
    const [showBlueUtility, setShowBlueUtility] = useState(true)
    const [showPurpleUtility, setShowPurpleUtility] = useState(true)
    const [showGreenUtility, setShowGreenUtility] = useState(true)
    const [showOrangeUtility, setShowOrangeUtility] = useState(true)
    const getTactic = async () => {

        try {
            const value = await AsyncStorage.getItem(tactic);
            if (value !== null) {
                // We have data!!
                setNukeTactic(JSON.parse(value));
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    useEffect(() => {
        getTactic()
    }, [])
    const [expanded, setExpanded] = useState(false);
    const onItemPress = () => {
        setExpanded(!expanded);
    };


    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            await refresh(prevState => !prevState)
            return true;
        } catch (exception) {
            return false;
        }
    }

    return (
        _.isEmpty(nukeTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        ) : (
            <View key={nukeTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontFamily: 'PoppinsSemiBold'
                            }}>{nukeTactic.tacticName}</Text>

                            {/*<Text style={{color: "#FFF", flex: 1, flexWrap: 'wrap', backgroundColor:"red"}}>{nukeTactic.tacticDescription}xxx</Text>*/}
                        </View>
                        <TouchableOpacity style={styles.removeTactic} onPress={() => removeItemValue(tactic)}>
                            <Image alt="smoke" source={deleteImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                <CollapsableContainer expanded={expanded}>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 22,
                        fontFamily: 'PoppinsMedium',
                        textAlign: "center"
                    }}>{nukeTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular',
                        textAlign: "center"
                    }}>{nukeTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{nukeTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{nukeTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{nukeTactic.molotovAmount}</Text>
                            <Image alt="molotov" source={molotovImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerButtons}>
                        <TouchableOpacity
                            style={[styles.playerButton, {backgroundColor: "#A49500"}, showYellowUtility && styles.selectedPlayer]}
                            onPress={() => setShowYellowUtility(prevState => !prevState)}/>
                        <TouchableOpacity
                            style={[styles.playerButton, {backgroundColor: "#00567F"}, showBlueUtility && styles.selectedPlayer]}
                            onPress={() => setShowBlueUtility(prevState => !prevState)}/>
                        <TouchableOpacity
                            style={[styles.playerButton, {backgroundColor: "#550083"}, showPurpleUtility && styles.selectedPlayer]}
                            onPress={() => setShowPurpleUtility(prevState => !prevState)}/>
                        <TouchableOpacity
                            style={[styles.playerButton, {backgroundColor: "#0A8300"}, showGreenUtility && styles.selectedPlayer]}
                            onPress={() => setShowGreenUtility(prevState => !prevState)}/>
                        <TouchableOpacity
                            style={[styles.playerButton, {backgroundColor: "#CD5A00"}, showOrangeUtility && styles.selectedPlayer]}
                            onPress={() => setShowOrangeUtility(prevState => !prevState)}/>
                    </View>
                    <ImageBackground source={nukeLayout} style={{marginVertical: 20, width: 360, height: 272}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"heavenSmoke"}
                                                      grenadeStyle={styles.smokeHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideHeavenSmoke"}
                                                      grenadeStyle={styles.smokeOutsideHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"lockerSmoke"}
                                                      grenadeStyle={styles.smokeLocker}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"ventSmoke"}
                                                      grenadeStyle={styles.smokeVent}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"mainSmoke"}
                                                      grenadeStyle={styles.smokeMain}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideMainSmoke"}
                                                      grenadeStyle={styles.smokeMainOutside}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideSecretSmoke"}
                                                      grenadeStyle={styles.smokeSecretOutside}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"garageSmoke"}
                                                      grenadeStyle={styles.smokeGarage}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideRedSmoke"}
                                                      grenadeStyle={styles.smokeOutsideRed}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideRedSecretSmoke"}
                                                      grenadeStyle={styles.smokeOutsideRedSecret}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"underHeavenSmoke"}
                                                      grenadeStyle={styles.smokeUnderHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"bAquariumSmoke"}
                                                      grenadeStyle={styles.smokeBAquarium}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"bDoubleDoorsSmoke"}
                                                      grenadeStyle={styles.smokeBDoubleDoors}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"bSingleDoorSmoke"}
                                                      grenadeStyle={styles.smokeBSingleDoor}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"outsideFlash"}
                                                      grenadeStyle={styles.flashOutside}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"rampFlash"}
                                                      grenadeStyle={styles.flashRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"mainFlash"}
                                                      grenadeStyle={styles.flashMain}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"hutRoofMolotov"}
                                                      grenadeStyle={styles.molotovHutRoof}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"aSiteMolotov"}
                                                      grenadeStyle={styles.molotovASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"heavenMolotov"}
                                                      grenadeStyle={styles.molotovHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"ctVentMolotov"}
                                                      grenadeStyle={styles.molotovCTVent}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"redMolotov"}
                                                      grenadeStyle={styles.molotovRed}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"secretMolotov"}
                                                      grenadeStyle={styles.molotovSecret}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"rampBoxMolotov"}
                                                      grenadeStyle={styles.molotovRampBox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"darkMolotov"}
                                                      grenadeStyle={styles.molotovDark}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={nukeTactic} grenadeName={"bSiteMolotov"}
                                                      grenadeStyle={styles.molotovBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                    </ImageBackground>
                    <View>
                        <View style={{
                            // backgroundColor: "#3B3B3B",
                            width: '100%',
                            alignItems: 'center',
                            borderRadius: 10,
                            // marginVertical: 20,
                            padding: 10,
                        }}>
                            <PlayerTasks player={nukeTactic.playerOneTask} utility={nukeTactic.yellowUtility}
                                         color="#A49500" positions={nukePositions}/>
                            <PlayerTasks player={nukeTactic.playerTwoTask} utility={nukeTactic.blueUtility}
                                         color="#00567F" positions={nukePositions}/>
                            <PlayerTasks player={nukeTactic.playerThreeTask} utility={nukeTactic.purpleUtility}
                                         color="#550083" positions={nukePositions}/>
                            <PlayerTasks player={nukeTactic.playerFourTask} utility={nukeTactic.greenUtility}
                                         color="#0A8300" positions={nukePositions}/>
                            <PlayerTasks player={nukeTactic.playerFiveTask} utility={nukeTactic.orangeUtility}
                                         color="#CD5A00" positions={nukePositions}/>
                        </View>
                    </View>
                </CollapsableContainer>
            </View>

        )
    )
}

const styles = StyleSheet.create({
    wrap: {
        borderColor: "#ccc",
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
    },
    container: {
        flexDirection: "row",
        width: 360,
        backgroundColor: "#272727",
        margin: 2,
        borderRadius: 5,
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 5
    },
    textContainer: {
        width: '85%'
    },
    removeTactic: {
        borderLeftWidth: 2,
        borderLeftColor: "#000",
        display: "flex",
        justifyContent: "center",
        width: '15%',
        alignItems: 'center',
        backgroundColor: "#A80000"
    },
    details: {
        margin: 10
    },
    text: {
        opacity: 0.7
    },
    grenades: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        gap: 25,
    },
    selectedGrenade: {
        backgroundColor: "#097100",
        borderRadius: 100,
        borderColor: "#FFF",
        borderWidth: 3,
        padding: 10
    },
    selectedPlayer: {
        borderColor: "#FFF",
        borderWidth: 3
    },
    singleGrenade: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#272727",
        borderRadius: 100,
        borderColor: "#FFF",
        borderWidth: 3,
        padding: 10
    },
    smokeHeaven: {
        position: 'absolute',
        top: 156,
        left: 212,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideHeaven: {
        position: 'absolute',
        top: 161,
        left: 225,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeLocker: {
        position: 'absolute',
        top: 177,
        left: 219,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeVent: {
        position: 'absolute',
        top: 203,
        left: 182,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeMain: {
        position: 'absolute',
        top: 213,
        left: 193,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeMainOutside: {
        position: 'absolute',
        top: 226,
        left: 208,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeSecretOutside: {
        position: 'absolute',
        top: 234,
        left: 220,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeGarage: {
        position: 'absolute',
        top: 232,
        left: 236,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideRed: {
        position: 'absolute',
        top: 246,
        left: 204,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideRedSecret: {
        position: 'absolute',
        top: 245,
        left: 216,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeUnderHeaven: {
        position: 'absolute',
        top: 132,
        left: 213,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBAquarium: {
        position: 'absolute',
        top: 50,
        left: 77,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBDoubleDoors: {
        position: 'absolute',
        top: 74,
        left: 77,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBSingleDoor: {
        position: 'absolute',
        top: 92,
        left: 40,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashOutside: {
        position: 'absolute',
        top: 235,
        left: 195,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 180,
        left: 195,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 133,
        left: 190,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashMain: {
        position: 'absolute',
        top: 213,
        left: 193,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovHutRoof: {
        position: 'absolute',
        top: 188,
        left: 179,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovASite: {
        position: 'absolute',
        top: 162,
        left: 195,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 156,
        left: 218,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovCTVent: {
        position: 'absolute',
        top: 207,
        left: 205,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovRed: {
        position: 'absolute',
        top: 245,
        left: 200,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovSecret: {
        position: 'absolute',
        top: 257,
        left: 228,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovRampBox: {
        position: 'absolute',
        top: 92,
        left: 189,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovDark: {
        position: 'absolute',
        top: 44,
        left: 67,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 90,
        left: 57,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    playerButtons: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 15,
        gap: 10
    },
    playerButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
})