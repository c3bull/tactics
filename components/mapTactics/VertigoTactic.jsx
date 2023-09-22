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
import vertigoLayout from "../../assets/images/mapLayouts/vertigoLayout.png";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smoke.png";
import flashImage from "../../assets/images/flash.png";
import molotovImage from "../../assets/images/molotov.png";
import deleteImage from "../../assets/images/delete.png";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {vertigoPositions} from "../common/positions";

export default function VertigoTactic({tactic, refresh}) {
    let _ = require('lodash');
    const [vertigoTactic, setVertigoTactic] = useState([])
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
                setVertigoTactic(JSON.parse(value));
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
        _.isEmpty(vertigoTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        ) : (
            <View key={vertigoTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontFamily: 'PoppinsSemiBold'
                            }}>{vertigoTactic.tacticName}</Text>

                            {/*<Text style={{color: "#FFF", flex: 1, flexWrap: 'wrap', backgroundColor:"red"}}>{vertigoTactic.tacticDescription}xxx</Text>*/}
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
                    }}>{vertigoTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular',
                        textAlign: "center"
                    }}>{vertigoTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{vertigoTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{vertigoTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{vertigoTactic.molotovAmount}</Text>
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
                    <ImageBackground source={vertigoLayout} style={{marginVertical: 20, width: 360, height: 310}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"generatorSmoke"}
                                                      grenadeStyle={styles.smokeGenerator}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"generatorLeftSmoke"}
                                                      grenadeStyle={styles.smokeGeneratorLeft}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"bCTSmoke"}
                                                      grenadeStyle={styles.smokeBCT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"windowSmoke"}
                                                      grenadeStyle={styles.smokeWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"midElevatorSmoke"}
                                                      grenadeStyle={styles.smokeMidElevator}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aElevatorSmoke"}
                                                      grenadeStyle={styles.smokeAElevator}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aSiteSmoke"}
                                                      grenadeStyle={styles.smokeASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aSiteLeftSmoke"}
                                                      grenadeStyle={styles.smokeASiteLeft}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aSiteRightSmoke"}
                                                      grenadeStyle={styles.smokeASiteRight}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"headshotSmoke"}
                                                      grenadeStyle={styles.smokeHeadshot}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"heavenSmoke"}
                                                      grenadeStyle={styles.smokeHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aCTSmoke"}
                                                      grenadeStyle={styles.smokeACT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"gapSmoke"}
                                                      grenadeStyle={styles.smokeGap}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"bSiteFlash"}
                                                      grenadeStyle={styles.flashBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"windowFlash"}
                                                      grenadeStyle={styles.flashWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"bStairsFlash"}
                                                      grenadeStyle={styles.flashBStairs}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"midFlash"}
                                                      grenadeStyle={styles.flashMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"gapFlash"}
                                                      grenadeStyle={styles.flashGap}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"rampFlash"}
                                                      grenadeStyle={styles.flashRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"bSiteMolotov"}
                                                      grenadeStyle={styles.molotovBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"tetrisMolotov"}
                                                      grenadeStyle={styles.molotovTetris}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"bCornerMolotov"}
                                                      grenadeStyle={styles.molotovBCorner}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"windowMolotov"}
                                                      grenadeStyle={styles.molotovWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"ctSpawnMolotov"}
                                                      grenadeStyle={styles.molotovCTSpawn}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"elevatorMidMolotov"}
                                                      grenadeStyle={styles.molotovMidElevator}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"gapMolotov"}
                                                      grenadeStyle={styles.molotovGap}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"sidewalkMolotov"}
                                                      grenadeStyle={styles.molotovSidewalk}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"headshotMolotov"}
                                                      grenadeStyle={styles.molotovHeadshot}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={vertigoTactic} grenadeName={"heavenMolotov"}
                                                      grenadeStyle={styles.molotovHeaven}
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
                            <PlayerTasks player={vertigoTactic.playerOneTask} utility={vertigoTactic.yellowUtility}
                                         color="#A49500" positions={vertigoPositions}/>
                            <PlayerTasks player={vertigoTactic.playerTwoTask} utility={vertigoTactic.blueUtility}
                                         color="#00567F" positions={vertigoPositions}/>
                            <PlayerTasks player={vertigoTactic.playerThreeTask} utility={vertigoTactic.purpleUtility}
                                         color="#550083" positions={vertigoPositions}/>
                            <PlayerTasks player={vertigoTactic.playerFourTask} utility={vertigoTactic.greenUtility}
                                         color="#0A8300" positions={vertigoPositions}/>
                            <PlayerTasks player={vertigoTactic.playerFiveTask} utility={vertigoTactic.orangeUtility}
                                         color="#CD5A00" positions={vertigoPositions}/>
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
    smokeGenerator: {
        position: 'absolute',
        top: 58,
        left: 108,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGeneratorLeft: {
        position: 'absolute',
        top: 30,
        left: 121,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBCT: {
        position: 'absolute',
        top: 41,
        left: 137,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidElevator: {
        position: 'absolute',
        top: 120,
        left: 207,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAElevator: {
        position: 'absolute',
        top: 150,
        left: 255,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 165,
        left: 277,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASiteLeft: {
        position: 'absolute',
        top: 180,
        left: 265,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASiteRight: {
        position: 'absolute',
        top: 180,
        left: 287,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeadshot: {
        position: 'absolute',
        top: 175,
        left: 305,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 123,
        left: 283,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeACT: {
        position: 'absolute',
        top: 123,
        left: 302,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGap: {
        position: 'absolute',
        top: 252,
        left: 194,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 32,
        left: 55,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBStairs: {
        position: 'absolute',
        top: 125,
        left: 52,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMid: {
        position: 'absolute',
        top: 105,
        left: 120,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashGap: {
        position: 'absolute',
        top: 252,
        left: 194,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 263,
        left: 240,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 180,
        left: 280,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 15,
        left: 78,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTetris: {
        position: 'absolute',
        top: 50,
        left: 33,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBCorner: {
        position: 'absolute',
        top: 3,
        left: 35,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCTSpawn: {
        position: 'absolute',
        top: 60,
        left: 235,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovMidElevator: {
        position: 'absolute',
        top: 120,
        left: 207,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovGap: {
        position: 'absolute',
        top: 200,
        left: 193,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSidewalk: {
        position: 'absolute',
        top: 195,
        left: 230,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeadshot: {
        position: 'absolute',
        top: 175,
        left: 305,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 123,
        left: 283,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
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