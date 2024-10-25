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
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smoke.png";
import flashImage from "../../assets/images/flash.png";
import molotovImage from "../../assets/images/molotov.png";
import deleteImage from "../../assets/images/delete.png";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {miragePositions} from "../common/positions";
import Collapsible from 'react-native-collapsible';

export default function MirageTactic({tactic, refresh, tacticSite}) {
    let _ = require('lodash');
    const [mirageTactic, setMirageTactic] = useState([])
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
                setMirageTactic(JSON.parse(value));
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
        _.isEmpty(mirageTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ffff"/>
            </View>
        ) : (
            <View key={mirageTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View
                        style={[styles.container, tacticSite === "tSite" ? styles.tSiteContainer : styles.ctSiteContainer]}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontFamily: 'PoppinsSemiBold'
                            }}>{mirageTactic.tacticName}</Text>

                            {/*<Text style={{color: "#FFF", flex: 1, flexWrap: 'wrap', backgroundColor:"red"}}>{mirageTactic.tacticDescription}xxx</Text>*/}
                        </View>
                        <TouchableOpacity style={styles.removeTactic} onPress={() => removeItemValue(tactic)}>
                            <Image alt="smoke" source={deleteImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                <CollapsableContainer expanded={expanded} >
                    <Text style={{
                        color: "#FFF",
                        fontSize: 22,
                        fontFamily: 'PoppinsMedium',
                        textAlign: "center"
                    }}>{mirageTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular',
                        textAlign: "center",
                        marginHorizontal: 20,
                    }}>{mirageTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.molotovAmount}</Text>
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
                    <ImageBackground source={mirageLayout} style={{marginVertical: 20, width: 360, height: 272}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ctSmoke"}
                                                      grenadeStyle={styles.smokeCT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aSiteSmoke"}
                                                      grenadeStyle={styles.smokeASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleSmoke"}
                                                      grenadeStyle={styles.smokeJungle}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"stairsSmoke"}
                                                      grenadeStyle={styles.smokeStairs}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorUpSmoke"}
                                                      grenadeStyle={styles.smokeConnectorUp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleDeepSmoke"}
                                                      grenadeStyle={styles.smokeJungleDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorDownSmoke"}
                                                      grenadeStyle={styles.smokeConnectorDown}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowSmoke"}
                                                      grenadeStyle={styles.smokeWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"catwalkSmoke"}
                                                      grenadeStyle={styles.smokeCatwalk}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"midCatwalkSmoke"}
                                                      grenadeStyle={styles.smokeMidCatwalk}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"topMidSmoke"}
                                                      grenadeStyle={styles.smokeTopMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"exitSmoke"}
                                                      grenadeStyle={styles.smokeExit}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bWindowSmoke"}
                                                      grenadeStyle={styles.smokeBWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"shortLeftSmoke"}
                                                      grenadeStyle={styles.smokeShortLeft}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"shortRightSmoke"}
                                                      grenadeStyle={styles.smokeShortRight}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteOneSmoke"}
                                                      grenadeStyle={styles.smokeBSiteOne}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteTwoSmoke"}
                                                      grenadeStyle={styles.smokeBSiteTwo}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteThreeSmoke"}
                                                      grenadeStyle={styles.smokeBSiteThree}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteFourSmoke"}
                                                      grenadeStyle={styles.smokeBSiteFour}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBalconySmoke"}
                                                      grenadeStyle={styles.smokeBBalcony}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBenchSmoke"}
                                                      grenadeStyle={styles.smokeBBench}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bTrashCanSmoke"}
                                                      grenadeStyle={styles.smokeBTrashCan}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteCornerSmoke"}
                                                      grenadeStyle={styles.smokeBSiteCorner}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bAppsSmoke"}
                                                      grenadeStyle={styles.smokeBApps}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bAppsDeepSmoke"}
                                                      grenadeStyle={styles.smokeBAppsDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bShortDeepSmoke"}
                                                      grenadeStyle={styles.smokeBShortDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"deepTopMidSmoke"}
                                                      grenadeStyle={styles.smokeDeepTopMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aRampSmoke"}
                                                      grenadeStyle={styles.smokeARamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aRampDeepSmoke"}
                                                      grenadeStyle={styles.smokeARampDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"tetrisSmoke"}
                                                      grenadeStyle={styles.smokeTetris}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aPalaceSmoke"}
                                                      grenadeStyle={styles.smokeAPalace}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aFireboxSmoke"}
                                                      grenadeStyle={styles.smokeAFirebox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aDefaultSmoke"}
                                                      grenadeStyle={styles.smokeADefault}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ctFlash"}
                                                      grenadeStyle={styles.flashCT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleFlash"}
                                                      grenadeStyle={styles.flashJungle}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"stairsFlash"}
                                                      grenadeStyle={styles.flashStairs}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorDownFlash"}
                                                      grenadeStyle={styles.flashConnectorDown}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"catwalkFlash"}
                                                      grenadeStyle={styles.flashCatwalk}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"topMidFlash"}
                                                      grenadeStyle={styles.flashTopMid}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteFlash"}
                                                      grenadeStyle={styles.flashBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"overAFlash"}
                                                      grenadeStyle={styles.flashOverA}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"overBFlash"}
                                                      grenadeStyle={styles.flashOverB}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowFlash"}
                                                      grenadeStyle={styles.flashWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bAppsFlash"}
                                                      grenadeStyle={styles.flashBApps}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ladderFlash"}
                                                      grenadeStyle={styles.flashLadder}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"behindMidBoxesFlash"}
                                                      grenadeStyle={styles.flashBehindMidBoxes}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"rampFlash"}
                                                      grenadeStyle={styles.flashRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"rampDeepFlash"}
                                                      grenadeStyle={styles.flashRampDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"palaceFlash"}
                                                      grenadeStyle={styles.flashPalace}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"underWoodMolotov"}
                                                      grenadeStyle={styles.molotovUnderWood}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aBenchMolotov"}
                                                      grenadeStyle={styles.molotovABench}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"carMolotov"}
                                                      grenadeStyle={styles.molotovCar}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBalconyMolotov"}
                                                      grenadeStyle={styles.molotovBBalcony}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"underAppsMolotov"}
                                                      grenadeStyle={styles.molotovUnderApps}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowMolotov"}
                                                      grenadeStyle={styles.molotovWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ladderMolotov"}
                                                      grenadeStyle={styles.molotovLadder}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ninjaMolotov"}
                                                      grenadeStyle={styles.molotovNinja}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"sandwichMolotov"}
                                                      grenadeStyle={styles.molotovSandwich}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"fireboxMolotov"}
                                                      grenadeStyle={styles.molotovFirebox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bAppsDeepMolotov"}
                                                      grenadeStyle={styles.molotovBAppsDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"topMidBoxesMolotov"}
                                                      grenadeStyle={styles.molotovTopMidBoxes}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aRampMolotov"}
                                                      grenadeStyle={styles.molotovARamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aRampDeepMolotov"}
                                                      grenadeStyle={styles.molotovARampDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"palaceMolotov"}
                                                      grenadeStyle={styles.molotovPalace}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ctMolotov"}
                                                      grenadeStyle={styles.molotovCt}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleMolotov"}
                                                      grenadeStyle={styles.molotovJungle}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"kitchenMolotov"}
                                                      grenadeStyle={styles.molotovKitchen}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                    </ImageBackground>
                    <View>
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            borderRadius: 10,
                            padding: 10,
                        }}>
                            <PlayerTasks player={mirageTactic.playerOneTask} utility={mirageTactic.yellowUtility}
                                         color="#A49500" positions={miragePositions}/>
                            <PlayerTasks player={mirageTactic.playerTwoTask} utility={mirageTactic.blueUtility}
                                         color="#00567F" positions={miragePositions}/>
                            <PlayerTasks player={mirageTactic.playerThreeTask} utility={mirageTactic.purpleUtility}
                                         color="#550083" positions={miragePositions}/>
                            <PlayerTasks player={mirageTactic.playerFourTask} utility={mirageTactic.greenUtility}
                                         color="#0A8300" positions={miragePositions}/>
                            <PlayerTasks player={mirageTactic.playerFiveTask} utility={mirageTactic.orangeUtility}
                                         color="#CD5A00" positions={miragePositions}/>
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
        margin: 2,
        borderRadius: 5,
    },
    tSiteContainer: {
        backgroundColor: "#682525",
    },
    ctSiteContainer: {
        backgroundColor: "#314861",
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 5
    },
    textContainer: {
        width: '85%',
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
    smokeCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverB: {
        position: 'absolute',
        top: 25,
        left: 90,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverA: {
        position: 'absolute',
        top: 200,
        left: 200,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderWood: {
        position: 'absolute',
        top: 215,
        left: 220,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovABench: {
        position: 'absolute',
        top: 200,
        left: 163,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 176,
        left: 235,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRampDeep: {
        position: 'absolute',
        top: 186,
        left: 257,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashPalace: {
        position: 'absolute',
        top: 232,
        left: 222,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorUp: {
        position: 'absolute',
        top: 155,
        left: 167,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungleDeep: {
        position: 'absolute',
        top: 170,
        left: 145,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidCatwalk: {
        position: 'absolute',
        top: 97,
        left: 165,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortLeft: {
        position: 'absolute',
        top: 45,
        left: 105,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteOne: {
        position: 'absolute',
        top: 30,
        left: 60,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteTwo: {
        position: 'absolute',
        top: 43,
        left: 75,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteThree: {
        position: 'absolute',
        top: 56,
        left: 60,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBench: {
        position: 'absolute',
        top: 23,
        left: 38,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBTrashCan: {
        position: 'absolute',
        top: 61,
        left: 40,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteCorner: {
        position: 'absolute',
        top: 60,
        left: 81,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBApps: {
        position: 'absolute',
        top: 3,
        left: 97,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBApps: {
        position: 'absolute',
        top: 3,
        left: 97,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBAppsDeep: {
        position: 'absolute',
        top: 17,
        left: 147,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBShortDeep: {
        position: 'absolute',
        top: 45,
        left: 134,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeDeepTopMid: {
        position: 'absolute',
        top: 70,
        left: 240,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeARamp: {
        position: 'absolute',
        top: 176,
        left: 235,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeARampDeep: {
        position: 'absolute',
        top: 186,
        left: 257,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTetris: {
        position: 'absolute',
        top: 188,
        left: 213,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAPalace: {
        position: 'absolute',
        top: 237,
        left: 222,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAFirebox: {
        position: 'absolute',
        top: 225,
        left: 160,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeADefault: {
        position: 'absolute',
        top: 230,
        left: 197,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBalcony: {
        position: 'absolute',
        top: 2,
        left: 61,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteFour: {
        position: 'absolute',
        top: 43,
        left: 45,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortRight: {
        position: 'absolute',
        top: 25,
        left: 105,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 20,
        left: 72,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeExit: {
        position: 'absolute',
        top: 80,
        left: 40,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCar: {
        position: 'absolute',
        top: 2,
        left: 45,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovFirebox: {
        position: 'absolute',
        top: 225,
        left: 160,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBBalcony: {
        position: 'absolute',
        top: 2,
        left: 63,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderApps: {
        position: 'absolute',
        top: 16,
        left: 92,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLadder: {
        position: 'absolute',
        top: 72,
        left: 134,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLadder: {
        position: 'absolute',
        top: 72,
        left: 134,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovNinja: {
        position: 'absolute',
        top: 239,
        left: 203,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSandwich: {
        position: 'absolute',
        top: 180,
        left: 193,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBWindow: {
        position: 'absolute',
        top: 80,
        left: 67,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        // backgroundColor: "#FDFFF2",
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
    molotovBAppsDeep: {
        position: 'absolute',
        top: 17,
        left: 133,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTopMidBoxes: {
        position: 'absolute',
        top: 110,
        left: 251,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBehindMidBoxes: {
        position: 'absolute',
        top: 110,
        left: 251,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovARamp: {
        position: 'absolute',
        top: 176,
        left: 235,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovARampDeep: {
        position: 'absolute',
        top: 186,
        left: 252,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPalace: {
        position: 'absolute',
        top: 237,
        left: 222,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCt: {
        position: 'absolute',
        top: 254,
        left: 141,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovJungle: {
        position: 'absolute',
        top: 156,
        left: 125,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovKitchen: {
        position: 'absolute',
        top: 89,
        left: 68,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    playerButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
})