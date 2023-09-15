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
import overpassLayout from "../../assets/images/mapLayouts/overpassLayout.png";
import _, {isEmpty} from "lodash";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smokeImg.png";
import flashImage from "../../assets/images/flashImg.png";
import molotovImage from "../../assets/images/molotovImg.png";
import deleteImage from "../../assets/images/delete.webp";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {overpassPositions} from "../common/positions";

export default function OverpassTactic({tactic, refresh}) {
    let _ = require('lodash');
    const [overpassTactic, setOverpassTactic] = useState([])
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
                setOverpassTactic(JSON.parse(value));
                console.log(JSON.parse(value));
                console.log('mt ', JSON.stringify(overpassTactic));

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
        _.isEmpty(overpassTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        ) : (
            <View key={overpassTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontWeight: "bold"
                            }}>{overpassTactic.tacticName}</Text>

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
                        fontSize: 25,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{overpassTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontWeight: '500',
                        textAlign: "center"
                    }}>{overpassTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{overpassTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{overpassTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{overpassTactic.molotovAmount}</Text>
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
                    <ImageBackground source={overpassLayout} style={{marginVertical: 20, width: 360, height: 345}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aBankSmoke"}
                                                      grenadeStyle={styles.smokeABank}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aVanSmoke"}
                                                      grenadeStyle={styles.smokeAVan}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aSiteSmoke"}
                                                      grenadeStyle={styles.smokeASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"stairsSmoke"}
                                                      grenadeStyle={styles.smokeStairs}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"truckSmoke"}
                                                      grenadeStyle={styles.smokeTruck}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"heavenSmoke"}
                                                      grenadeStyle={styles.smokeHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"abcSmoke"}
                                                      grenadeStyle={styles.smokeAbc}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bridgeSmoke"}
                                                      grenadeStyle={styles.smokeBridge}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bSiteSmoke"}
                                                      grenadeStyle={styles.smokeBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"squeakySmoke"}
                                                      grenadeStyle={styles.smokeSqueaky}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bananaSmoke"}
                                                      grenadeStyle={styles.smokeBanana}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bathroomSmoke"}
                                                      grenadeStyle={styles.smokeBathroom}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"connectorSmoke"}
                                                      grenadeStyle={styles.smokeConnector}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"midFlash"}
                                                      grenadeStyle={styles.flashMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"longFlash"}
                                                      grenadeStyle={styles.flashLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aSiteLongFlash"}
                                                      grenadeStyle={styles.flashASiteLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"monsterFlash"}
                                                      grenadeStyle={styles.flashMonster}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"shortFlash"}
                                                      grenadeStyle={styles.flashShort}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bSiteFlash"}
                                                      grenadeStyle={styles.flashBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"aSiteMolotov"}
                                                      grenadeStyle={styles.molotovASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"truckMolotov"}
                                                      grenadeStyle={styles.molotovTruck}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"heavenMolotov"}
                                                      grenadeStyle={styles.molotovHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"pitMolotov"}
                                                      grenadeStyle={styles.molotovPit}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"bSiteMolotov"}
                                                      grenadeStyle={styles.molotovBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"waterMolotov"}
                                                      grenadeStyle={styles.molotovWater}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"barrelsMolotov"}
                                                      grenadeStyle={styles.molotovBarrels}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={overpassTactic} grenadeName={"sandbagsMolotov"}
                                                      grenadeStyle={styles.molotovSandbags}
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
                            <PlayerTasks player={overpassTactic.playerOneTask} utility={overpassTactic.yellowUtility}
                                         color="#A49500" positions={overpassPositions}/>
                            <PlayerTasks player={overpassTactic.playerTwoTask} utility={overpassTactic.blueUtility}
                                         color="#00567F" positions={overpassPositions}/>
                            <PlayerTasks player={overpassTactic.playerThreeTask} utility={overpassTactic.purpleUtility}
                                         color="#550083" positions={overpassPositions}/>
                            <PlayerTasks player={overpassTactic.playerFourTask} utility={overpassTactic.greenUtility}
                                         color="#0A8300" positions={overpassPositions}/>
                            <PlayerTasks player={overpassTactic.playerFiveTask} utility={overpassTactic.orangeUtility}
                                         color="#CD5A00" positions={overpassPositions}/>
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
    smokeABank: {
        position: 'absolute',
        top: 22,
        left: 135,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAVan: {
        position: 'absolute',
        top: 47,
        left: 123,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 58,
        left: 143,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 41,
        left: 164,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTruck: {
        position: 'absolute',
        top: 66,
        left: 162,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 73,
        left: 185,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAbc: {
        position: 'absolute',
        top: 115,
        left: 180,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBridge: {
        position: 'absolute',
        top: 118,
        left: 213,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSite: {
        position: 'absolute',
        top: 99,
        left: 215,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeSqueaky: {
        position: 'absolute',
        top: 157,
        left: 183,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBanana: {
        position: 'absolute',
        top: 139,
        left: 149,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBathroom: {
        position: 'absolute',
        top: 171,
        left: 121,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnector: {
        position: 'absolute',
        top: 188,
        left: 150,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMid: {
        position: 'absolute',
        top: 190,
        left: 115,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLong: {
        position: 'absolute',
        top: 235,
        left: 64,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 50,
        left: 140,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASiteLong: {
        position: 'absolute',
        top: 55,
        left: 105,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMonster: {
        position: 'absolute',
        top: 105,
        left: 265,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashShort: {
        position: 'absolute',
        top: 155,
        left: 205,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 100,
        left: 222,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovASite: {
        position: 'absolute',
        top: 47,
        left: 130,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTruck: {
        position: 'absolute',
        top: 65,
        left: 157,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 71,
        left: 182,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPit: {
        position: 'absolute',
        top: 107,
        left: 205,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 100,
        left: 223,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWater: {
        position: 'absolute',
        top: 80,
        left: 217,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBarrels: {
        position: 'absolute',
        top: 77,
        left: 237,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSandbags: {
        position: 'absolute',
        top: 130,
        left: 234,
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