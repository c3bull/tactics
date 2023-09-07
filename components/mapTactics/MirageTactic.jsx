import {Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import _, {isEmpty} from "lodash";
import TacticGrenadeDisplay from "../TacticGrenadeDisplay";
import smokeImage from "../../assets/images/smokeImg.png";
import flashImage from "../../assets/images/flashImg.png";
import molotovImage from "../../assets/images/molotovImg.png";
import {CollapsableContainer} from "../CollapsableContainer";

export default function MirageTactic({tactic}) {
    let _ = require('lodash');
    const [mirageTactic, setMirageTactic] = useState([])
    const getTactic = async () => {

        try {
            const value = await AsyncStorage.getItem(tactic);
            if (value !== null) {
                // We have data!!
                setMirageTactic(JSON.parse(value));
                console.log(JSON.parse(value));
                console.log('mt ', JSON.stringify(mirageTactic));

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
    return (
        _.isEmpty(mirageTactic) ? (
            <View>
                <Text style={{color: "#FFF"}}>Nie załadowało</Text>
            </View>
        ) : (
            <View key={mirageTactic.tacticName}>
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={{color: "#FFF", fontSize: 24, padding: 12, fontWeight: "bold"}}>{mirageTactic.tacticName}</Text>
                            {/*<Text style={{color: "#FFF", flex: 1, flexWrap: 'wrap', backgroundColor:"red"}}>{mirageTactic.tacticDescription}xxx</Text>*/}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <CollapsableContainer expanded={expanded}>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 25,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{mirageTactic.tacticName}</Text>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{mirageTactic.tacticDescription}</Text>
                    <View style={styles.grenades}>
                        <View style={styles.singleGrenade}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.smokeAmount}</Text>
                            <Image alt="smoke" source={smokeImage}
                                   style={{resizeMode: 'contain', height: 25, width: 30}}/>
                        </View>
                        <View style={styles.singleGrenade}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.flashAmount}</Text>
                            <Image alt="flash" source={flashImage}
                                   style={{resizeMode: 'contain', height: 25, width: 30}}/>
                        </View>
                        <View style={styles.singleGrenade}>
                            <Text style={{color: "#fff", fontSize: 30}}>{mirageTactic.molotovAmount}</Text>
                            <Image alt="molotov" source={molotovImage}
                                   style={{resizeMode: 'contain', height: 25, width: 30}}/>
                        </View>
                    </View>
                    <ImageBackground source={mirageLayout} style={{marginBottom: 20, width: 360, height: 272}}>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ctSmoke"}
                                              grenadeStyle={styles.smokeCT}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aSiteSmoke"}
                                              grenadeStyle={styles.smokeASite}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleSmoke"}
                                              grenadeStyle={styles.smokeJungle}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"stairsSmoke"}
                                              grenadeStyle={styles.smokeStairs}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorUpSmoke"}
                                              grenadeStyle={styles.smokeConnectorUp}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleDeepSmoke"}
                                              grenadeStyle={styles.smokeJungleDeep}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorDownSmoke"}
                                              grenadeStyle={styles.smokeConnectorDown}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowSmoke"}
                                              grenadeStyle={styles.smokeWindow}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"catwalkSmoke"}
                                              grenadeStyle={styles.smokeCatwalk}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"midCatwalkSmoke"}
                                              grenadeStyle={styles.smokeMidCatwalk}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"topMidSmoke"}
                                              grenadeStyle={styles.smokeTopMid}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"exitSmoke"}
                                              grenadeStyle={styles.smokeExit}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bWindowSmoke"}
                                              grenadeStyle={styles.smokeBWindow}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"shortLeftSmoke"}
                                              grenadeStyle={styles.smokeShortLeft}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"shortRightSmoke"}
                                              grenadeStyle={styles.smokeShortRight}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteOneSmoke"}
                                              grenadeStyle={styles.smokeBSiteOne}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteTwoSmoke"}
                                              grenadeStyle={styles.smokeBSiteTwo}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteThreeSmoke"}
                                              grenadeStyle={styles.smokeBSiteThree}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteFourSmoke"}
                                              grenadeStyle={styles.smokeBSiteFour}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBalconySmoke"}
                                              grenadeStyle={styles.smokeBBench}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBenchSmoke"}
                                              grenadeStyle={styles.smokeBBalcony}/>

                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ctFlash"}
                                              grenadeStyle={styles.flashCT}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aSiteFlash"}
                                              grenadeStyle={styles.flashASite}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"jungleFlash"}
                                              grenadeStyle={styles.flashJungle}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"stairsFlash"}
                                              grenadeStyle={styles.flashStairs}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"connectorDownFlash"}
                                              grenadeStyle={styles.flashConnectorDown}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"catwalkFlash"}
                                              grenadeStyle={styles.flashCatwalk}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"topMidFlash"}
                                              grenadeStyle={styles.flashTopMid}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bSiteFlash"}
                                              grenadeStyle={styles.flashBSite}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"overAFlash"}
                                              grenadeStyle={styles.flashOverA}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"overBFlash"}
                                              grenadeStyle={styles.flashOverB}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowFlash"}
                                              grenadeStyle={styles.flashWindow}/>

                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"underWoodMolotov"}
                                              grenadeStyle={styles.molotovUnderWood}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"aBenchMolotov"}
                                              grenadeStyle={styles.molotovABench}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"carMolotov"}
                                              grenadeStyle={styles.molotovCar}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"bBalconyMolotov"}
                                              grenadeStyle={styles.molotovBBalcony}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"underAppsMolotov"}
                                              grenadeStyle={styles.molotovUnderApps}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"windowMolotov"}
                                              grenadeStyle={styles.molotovWindow}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ladderMolotov"}
                                              grenadeStyle={styles.molotovLadder}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"ninjaMolotov"}
                                              grenadeStyle={styles.molotovNinja}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"sandwichMolotov"}
                                              grenadeStyle={styles.molotovSandwich}/>
                        <TacticGrenadeDisplay tactic={mirageTactic} grenadeName={"fireboxMolotov"}
                                              grenadeStyle={styles.molotovFirebox}/>

                    </ImageBackground>
                    <Text style={{color: "#D5C200", fontSize: 15, padding: 10}}>{mirageTactic.playerOneTask}</Text>
                    <Text style={{color: "#00ACFF", fontSize: 15, padding: 10}}>{mirageTactic.playerTwoTask}</Text>
                    <Text style={{color: "#B600CF", fontSize: 15, padding: 10}}>{mirageTactic.playerThreeTask}</Text>
                    <Text style={{color: "#0EB900", fontSize: 15, padding: 10}}>{mirageTactic.playerFourTask}</Text>
                    <Text style={{color: "#F07400", fontSize: 15, padding: 10}}>{mirageTactic.playerFiveTask}</Text>
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
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
    },
    container: { flexDirection: "row", maxWidth: 360, backgroundColor:"#272727", margin: 2, borderRadius: 5 },
    image: { width: 50, height: 50, margin: 10, borderRadius: 5 },
    textContainer: { justifyContent: "space-around" },
    details: { margin: 10 },
    text: { opacity: 0.7 },
    grenades: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginVertical: 15,
        paddingLeft: 25,
        borderRadius: 10,
        gap: 25,
        backgroundColor: "#272727"
    },
    singleGrenade: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smokeCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverB: {
        position: 'absolute',
        top: 25,
        left: 90,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverA: {
        position: 'absolute',
        top: 200,
        left: 200,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderWood: {
        position: 'absolute',
        top: 215,
        left: 220,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovABench: {
        position: 'absolute',
        top: 200,
        left: 163,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorUp: {
        position: 'absolute',
        top: 155,
        left: 167,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungleDeep: {
        position: 'absolute',
        top: 170,
        left: 145,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidCatwalk: {
        position: 'absolute',
        top: 97,
        left: 165,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortLeft: {
        position: 'absolute',
        top: 45,
        left: 105,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteOne: {
        position: 'absolute',
        top: 30,
        left: 60,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteTwo: {
        position: 'absolute',
        top: 43,
        left: 75,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteThree: {
        position: 'absolute',
        top: 56,
        left: 60,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBench: {
        position: 'absolute',
        top: 2,
        left: 61,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBalcony: {
        position: 'absolute',
        top: 23,
        left: 38,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteFour: {
        position: 'absolute',
        top: 43,
        left: 45,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortRight: {
        position: 'absolute',
        top: 25,
        left: 105,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 20,
        left: 72,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeExit: {
        position: 'absolute',
        top: 80,
        left: 40,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCar: {
        position: 'absolute',
        top: 2,
        left: 45,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovFirebox: {
        position: 'absolute',
        top: 225,
        left: 160,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBBalcony: {
        position: 'absolute',
        top: 2,
        left: 63,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderApps: {
        position: 'absolute',
        top: 16,
        left: 92,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLadder: {
        position: 'absolute',
        top: 72,
        left: 134,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovNinja: {
        position: 'absolute',
        top: 239,
        left: 203,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSandwich: {
        position: 'absolute',
        top: 180,
        left: 193,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBWindow: {
        position: 'absolute',
        top: 80,
        left: 67,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
})