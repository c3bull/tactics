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
import ancientLayout from "../../assets/images/mapLayouts/ancientLayout.png";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smoke.png";
import flashImage from "../../assets/images/flash.png";
import molotovImage from "../../assets/images/molotov.png";
import deleteImage from "../../assets/images/delete.png";
import {CollapsableContainer} from "../CollapsableContainer";
import PlayerTasks from "../PlayerTasks";
import {ancientPositions} from "../common/positions";

export default function AncientTactic({tactic, refresh, tacticSite}) {
    let _ = require('lodash');
    const [ancientTactic, setAncientTactic] = useState([])
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
                setAncientTactic(JSON.parse(value));
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
        _.isEmpty(ancientTactic) ? (
            <View>
                <ActivityIndicator size="small" color="#00ff00"/>
            </View>
        ) : (
            <View key={ancientTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={[styles.container, tacticSite === "tSite" ? styles.tSiteContainer : styles.ctSiteContainer]}>
                        <View style={styles.textContainer}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 24,
                                padding: 12,
                                fontFamily: 'PoppinsSemiBold'
                            }}>{ancientTactic.tacticName}</Text>

                            {/*<Text style={{color: "#FFF", flex: 1, flexWrap: 'wrap', backgroundColor:"red"}}>{ancientTactic.tacticDescription}xxx</Text>*/}
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
                    }}>{ancientTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontFamily: 'PoppinsRegular',
                        textAlign: "center"
                    }}>{ancientTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <TouchableOpacity style={[styles.singleGrenade, showSmokes && styles.selectedGrenade]}
                                          onPress={() => setShowSmokes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{ancientTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showFlashes && styles.selectedGrenade]}
                                          onPress={() => setShowFlashes(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{ancientTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 22}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.singleGrenade, showMolotov && styles.selectedGrenade]}
                                          onPress={() => setShowMolotov(prevState => !prevState)}>
                            <Text style={{color: "#fff", fontSize: 30}}>{ancientTactic.molotovAmount}</Text>
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
                    <ImageBackground source={ancientLayout} style={{marginVertical: 20, width: 360, height: 335}}>
                        {showSmokes && (
                            <View>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"platformSmoke"}
                                                      grenadeStyle={styles.smokePlatform}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"templeSmoke"}
                                                      grenadeStyle={styles.smokeTemple}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aSiteSmoke"}
                                                      grenadeStyle={styles.smokeASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aCTSmoke"}
                                                      grenadeStyle={styles.smokeACT}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"donutSmoke"}
                                                      grenadeStyle={styles.smokeDonut}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"windowSmoke"}
                                                      grenadeStyle={styles.smokeWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"tombSmoke"}
                                                      grenadeStyle={styles.smokeTomb}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"heavenSmoke"}
                                                      grenadeStyle={styles.smokeHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"caveSmoke"}
                                                      grenadeStyle={styles.smokeCave}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"caveBSiteSmoke"}
                                                      grenadeStyle={styles.smokeCaveBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"bShortSmoke"}
                                                      grenadeStyle={styles.smokeBShort}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"bLongSmoke"}
                                                      grenadeStyle={styles.smokeBLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"bAlleySmoke"}
                                                      grenadeStyle={styles.smokeBAlley}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"houseSmoke"}
                                                      grenadeStyle={styles.smokeHouse}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aMainSmoke"}
                                                      grenadeStyle={styles.smokeAMain}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aMainDeepSmoke"}
                                                      grenadeStyle={styles.smokeAMainDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"elbowSmoke"}
                                                      grenadeStyle={styles.smokeElbow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"tUpperSmoke"}
                                                      grenadeStyle={styles.smokeTUpper}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"rampSmoke"}
                                                      grenadeStyle={styles.smokeRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showFlashes && (
                            <View>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aEntranceFlash"}
                                                      grenadeStyle={styles.flashAEntrance}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aSiteFlash"}
                                                      grenadeStyle={styles.flashASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"midFirstFlash"}
                                                      grenadeStyle={styles.flashMidFirst}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"midSecondFlash"}
                                                      grenadeStyle={styles.flashMidSecond}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"caveFlash"}
                                                      grenadeStyle={styles.flashCave}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"bSiteFlash"}
                                                      grenadeStyle={styles.flashBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"windowFlash"}
                                                      grenadeStyle={styles.flashWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"longFlash"}
                                                      grenadeStyle={styles.flashLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"rampFlash"}
                                                      grenadeStyle={styles.flashRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"rampDeepFlash"}
                                                      grenadeStyle={styles.flashRampDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"highwayFlash"}
                                                      grenadeStyle={styles.flashHighway}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"aMainFlash"}
                                                      grenadeStyle={styles.flashAMain}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                            </View>)}
                        {showMolotov && (
                            <View>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"cubbyMolotov"}
                                                      grenadeStyle={styles.molotovCubby}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"behindASiteMolotov"}
                                                      grenadeStyle={styles.molotovBehindASite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"templeMolotov"}
                                                      grenadeStyle={styles.molotovTemple}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"platformMolotov"}
                                                      grenadeStyle={styles.molotovPlatform}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"wideBoxMolotov"}
                                                      grenadeStyle={styles.molotovWideBox}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"windowMolotov"}
                                                      grenadeStyle={styles.molotovWindow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"ninjaMolotov"}
                                                      grenadeStyle={styles.molotovNinja}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"bSiteMolotov"}
                                                      grenadeStyle={styles.molotovBSite}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"longMolotov"}
                                                      grenadeStyle={styles.molotovLong}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"elbowMolotov"}
                                                      grenadeStyle={styles.molotovElbow}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"heavenMolotov"}
                                                      grenadeStyle={styles.molotovHeaven}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"tUpperMolotov"}
                                                      grenadeStyle={styles.molotovTUpper}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"caveMolotov"}
                                                      grenadeStyle={styles.molotovCave}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"rampMolotov"}
                                                      grenadeStyle={styles.molotovRamp}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"rampDeepMolotov"}
                                                      grenadeStyle={styles.molotovRampDeep}
                                                      showYellowUtility={showYellowUtility}
                                                      showBlueUtility={showBlueUtility}
                                                      showPurpleUtility={showPurpleUtility}
                                                      showGreenUtility={showGreenUtility}
                                                      showOrangeUtility={showOrangeUtility}/>
                                <TacticGrenadeDisplay tactic={ancientTactic} grenadeName={"donutMolotov"}
                                                      grenadeStyle={styles.molotovDonut}
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
                            <PlayerTasks player={ancientTactic.playerOneTask} utility={ancientTactic.yellowUtility}
                                         color="#A49500" positions={ancientPositions}/>
                            <PlayerTasks player={ancientTactic.playerTwoTask} utility={ancientTactic.blueUtility}
                                         color="#00567F" positions={ancientPositions}/>
                            <PlayerTasks player={ancientTactic.playerThreeTask} utility={ancientTactic.purpleUtility}
                                         color="#550083" positions={ancientPositions}/>
                            <PlayerTasks player={ancientTactic.playerFourTask} utility={ancientTactic.greenUtility}
                                         color="#0A8300" positions={ancientPositions}/>
                            <PlayerTasks player={ancientTactic.playerFiveTask} utility={ancientTactic.orangeUtility}
                                         color="#CD5A00" positions={ancientPositions}/>
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
    smokePlatform: {
        position: 'absolute',
        top: 27,
        left: 37,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTemple: {
        position: 'absolute',
        top: 26,
        left: 75,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 47,
        left: 100,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeACT: {
        position: 'absolute',
        top: 32,
        left: 113,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeDonut: {
        position: 'absolute',
        top: 85,
        left: 92,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 97,
        left: 161,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTomb: {
        position: 'absolute',
        top: 134,
        left: 133,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 183,
        left: 194,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCave: {
        position: 'absolute',
        top: 174,
        left: 220,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCaveBSite: {
        position: 'absolute',
        top: 104,
        left: 245,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBShort: {
        position: 'absolute',
        top: 80,
        left: 258,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBLong: {
        position: 'absolute',
        top: 95,
        left: 300,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBAlley: {
        position: 'absolute',
        top: 50,
        left: 243,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHouse: {
        position: 'absolute',
        top: 59,
        left: 205,
        // backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAMain: {
        position: 'absolute',
        top: 97,
        left: 36,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAMainDeep: {
        position: 'absolute',
        top: 135,
        left: 56,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeElbow: {
        position: 'absolute',
        top: 180,
        left: 128,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTUpper: {
        position: 'absolute',
        top: 185,
        left: 252,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeRamp: {
        position: 'absolute',
        top: 144,
        left: 304,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashAEntrance: {
        position: 'absolute',
        top: 72,
        left: 43,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 53,
        left: 100,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMidFirst: {
        position: 'absolute',
        top: 190,
        left: 150,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMidSecond: {
        position: 'absolute',
        top: 190,
        left: 170,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCave: {
        position: 'absolute',
        top: 162,
        left: 220,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 125,
        left: 280,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 87,
        left: 161,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLong: {
        position: 'absolute',
        top: 50,
        left: 290,
        // backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 160,
        left: 308,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRampDeep: {
        position: 'absolute',
        top: 182,
        left: 308,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashHighway: {
        position: 'absolute',
        top: 187,
        left: 238,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashAMain: {
        position: 'absolute',
        top: 109,
        left: 36,
        // backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCubby: {
        position: 'absolute',
        top: 137,
        left: 186,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBehindASite: {
        position: 'absolute',
        top: 54,
        left: 113,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTemple: {
        position: 'absolute',
        top: 26,
        left: 75,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPlatform: {
        position: 'absolute',
        top: 25,
        left: 39,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWideBox: {
        position: 'absolute',
        top: 37,
        left: 59,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 87,
        left: 161,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovNinja: {
        position: 'absolute',
        top: 140,
        left: 260,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100,
    },
    molotovBSite: {
        position: 'absolute',
        top: 107,
        left: 260,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLong: {
        position: 'absolute',
        top: 95,
        left: 304,
        // backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovElbow: {
        position: 'absolute',
        top: 184,
        left: 117,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 183,
        left: 195,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTUpper: {
        position: 'absolute',
        top: 184,
        left: 253,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCave: {
        position: 'absolute',
        top: 160,
        left: 236,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovRamp: {
        position: 'absolute',
        top: 147,
        left: 304,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovRampDeep: {
        position: 'absolute',
        top: 178,
        left: 308,
        // backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovDonut: {
        position: 'absolute',
        top: 144,
        left: 78,
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