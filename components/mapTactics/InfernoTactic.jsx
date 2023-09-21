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
import infernoLayout from "../../assets/images/mapLayouts/infernoLayout.png";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smokeImg.png";
import flashImage from "../../assets/images/flashImg.png";
import molotovImage from "../../assets/images/molotovImg.png";
import deleteImage from "../../assets/images/delete.webp";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {infernoPositions} from "../common/positions";

export default function InfernoTactic({tactic, refresh}) {
    let _ = require('lodash');
    const [infernoTactic, setInfernoTactic] = useState([])
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
                console.log('nazwa tatkiyty ', tactic)
                // We have data!!
                setInfernoTactic(JSON.parse(value));
                console.log(JSON.parse(value));
                console.log('mt ', JSON.stringify(infernoTactic));

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
        _.isEmpty(infernoTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        ) : (
            <View key={infernoTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontFamily: 'PoppinsSemiBold'
                            }}>{infernoTactic.tacticName}</Text>

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
                    }}>{infernoTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular',
                        textAlign: "center"
                    }}>{infernoTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{infernoTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{infernoTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{infernoTactic.molotovAmount}</Text>
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
                    <ImageBackground source={infernoLayout} style={{marginVertical: 20, width: 360, height: 320}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bCTSmoke"}
                                                      grenadeStyle={styles.smokeBCT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bSpoolsSmoke"}
                                                      grenadeStyle={styles.smokeBSpools}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bSiteSmoke"}
                                                      grenadeStyle={styles.smokeBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bCTDeepSmoke"}
                                                      grenadeStyle={styles.smokeBCTDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"topBananaSmoke"}
                                                      grenadeStyle={styles.smokeTopBanana}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"topMidSmoke"}
                                                      grenadeStyle={styles.smokeTopMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"midLongSmoke"}
                                                      grenadeStyle={styles.smokeMidLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"midShortSmoke"}
                                                      grenadeStyle={styles.smokeMidShort}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"connectorSmoke"}
                                                      grenadeStyle={styles.smokeConnector}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"farLongSmoke"}
                                                      grenadeStyle={styles.smokeFarLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"librarySmoke"}
                                                      grenadeStyle={styles.smokeLibrary}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"behindASiteSmoke"}
                                                      grenadeStyle={styles.smokeBehindASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"graveyardSmoke"}
                                                      grenadeStyle={styles.smokeGraveyard}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"truckSmoke"}
                                                      grenadeStyle={styles.smokeTruck}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"miniPitSmoke"}
                                                      grenadeStyle={styles.smokeMiniPit}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"pitSmoke"}
                                                      grenadeStyle={styles.smokePit}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bCTFlash"}
                                                      grenadeStyle={styles.flashBCT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bEntranceFlash"}
                                                      grenadeStyle={styles.flashBEntrance}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"topBananaFlash"}
                                                      grenadeStyle={styles.flashTopBanana}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bSiteFlash"}
                                                      grenadeStyle={styles.flashBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"topMidFlash"}
                                                      grenadeStyle={styles.flashTopMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"longFlash"}
                                                      grenadeStyle={styles.flashLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"aAppsFlash"}
                                                      grenadeStyle={styles.flashAApps}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bCarMolotov"}
                                                      grenadeStyle={styles.molotovBCar}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bFirstBoxMolotov"}
                                                      grenadeStyle={styles.molotovBFirstBox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bSecondBoxMolotov"}
                                                      grenadeStyle={styles.molotovBSecondBox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bThirdBoxMolotov"}
                                                      grenadeStyle={styles.molotovBThirdBox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bDarkMolotov"}
                                                      grenadeStyle={styles.molotovBDark}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"bSpoolsMolotov"}
                                                      grenadeStyle={styles.molotovBSpools}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"longMolotov"}
                                                      grenadeStyle={styles.molotovLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"appsMolotov"}
                                                      grenadeStyle={styles.molotovApps}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"roofMolotov"}
                                                      grenadeStyle={styles.molotovRoof}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"miniPitMolotov"}
                                                      grenadeStyle={styles.molotovMiniPit}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={infernoTactic} grenadeName={"pitMolotov"}
                                                      grenadeStyle={styles.molotovPit}
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
                            <PlayerTasks player={infernoTactic.playerOneTask} utility={infernoTactic.yellowUtility}
                                         color="#A49500" positions={infernoPositions}/>
                            <PlayerTasks player={infernoTactic.playerTwoTask} utility={infernoTactic.blueUtility}
                                         color="#00567F" positions={infernoPositions}/>
                            <PlayerTasks player={infernoTactic.playerThreeTask} utility={infernoTactic.purpleUtility}
                                         color="#550083" positions={infernoPositions}/>
                            <PlayerTasks player={infernoTactic.playerFourTask} utility={infernoTactic.greenUtility}
                                         color="#0A8300" positions={infernoPositions}/>
                            <PlayerTasks player={infernoTactic.playerFiveTask} utility={infernoTactic.orangeUtility}
                                         color="#CD5A00" positions={infernoPositions}/>
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
    smokeBCT: {
        position: 'absolute',
        top: 58,
        left: 210,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSpools: {
        position: 'absolute',
        top: 25,
        left: 172,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSite: {
        position: 'absolute',
        top: 60,
        left: 180,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBCTDeep: {
        position: 'absolute',
        top: 50,
        left: 245,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopBanana: {
        position: 'absolute',
        top: 107,
        left: 184,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopMid: {
        position: 'absolute',
        top: 216,
        left: 224,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidLong: {
        position: 'absolute',
        top: 190,
        left: 240,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidShort: {
        position: 'absolute',
        top: 240,
        left: 240,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnector: {
        position: 'absolute',
        top: 155,
        left: 269,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeFarLong: {
        position: 'absolute',
        top: 173,
        left: 285,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeLibrary: {
        position: 'absolute',
        top: 170,
        left: 320,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBehindASite: {
        position: 'absolute',
        top: 193,
        left: 303,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGraveyard: {
        position: 'absolute',
        top: 230,
        left: 303,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTruck: {
        position: 'absolute',
        top: 258,
        left: 280,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMiniPit: {
        position: 'absolute',
        top: 258,
        left: 295,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokePit: {
        position: 'absolute',
        top: 258,
        left: 310,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBCT: {
        position: 'absolute',
        top: 61,
        left: 210,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBEntrance: {
        position: 'absolute',
        top: 80,
        left: 195,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopBanana: {
        position: 'absolute',
        top: 110,
        left: 155,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 66,
        left: 170,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopMid: {
        position: 'absolute',
        top: 215,
        left: 239,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLong: {
        position: 'absolute',
        top: 175,
        left: 245,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashAApps: {
        position: 'absolute',
        top: 275,
        left: 230,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 232,
        left: 279,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBCar: {
        position: 'absolute',
        top: 102,
        left: 172,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBFirstBox: {
        position: 'absolute',
        top: 70,
        left: 172,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSecondBox: {
        position: 'absolute',
        top: 70,
        left: 155,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBThirdBox: {
        position: 'absolute',
        top: 62,
        left: 140,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBDark: {
        position: 'absolute',
        top: 27,
        left: 140,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSpools: {
        position: 'absolute',
        top: 25,
        left: 172,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLong: {
        position: 'absolute',
        top: 172,
        left: 243,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovApps: {
        position: 'absolute',
        top: 253,
        left: 225,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovRoof: {
        position: 'absolute',
        top: 253,
        left: 244,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovMiniPit: {
        position: 'absolute',
        top: 273,
        left: 290,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPit: {
        position: 'absolute',
        top: 263,
        left: 322,
        // backgroundColor: "#FFECEC",
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