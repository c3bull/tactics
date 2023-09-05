import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from "react-native";
import React, {useState} from "react";
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import smokeImage from "../../assets/images/smokeImg.png"
import flashImage from "../../assets/images/flashImg.png"
import molotovImage from "../../assets/images/molotovImg.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";

export default function MirageLayout() {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [ctSmoke, setCtSmoke] = useState(false)
    const [aSiteSmoke, setASiteSmoke] = useState(false)
    const [jungleSmoke, setJungleSmoke] = useState(false)
    const [stairsSmoke, setStairsSmoke] = useState(false)
    const [connectorUpSmoke, setConnectorUpSmoke] = useState(false)
    const [jungleDeepSmoke, setJungleDeepSmoke] = useState(false)
    const [connectorDownSmoke, setConnectorDownSmoke] = useState(false)
    const [windowSmoke, setWindowSmoke] = useState(false)
    const [catwalkSmoke, setCatwalkSmoke] = useState(false)
    const [midCatwalkSmoke, setMidCatwalkSmoke] = useState(false)
    const [topMidSmoke, setTopMidSmoke] = useState(false)
    const [exitSmoke, setExitSmoke] = useState(false)
    const [bWindowSmoke, setBWindowSmoke] = useState(false)
    const [shortLeftSmoke, setShortLeftSmoke] = useState(false)
    const [shortRightSmoke, setShortRightSmoke] = useState(false)

    const [ctFlash, setCtFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [jungleFlash, setJungleFlash] = useState(false)
    const [stairsFlash, setStairsFlash] = useState(false)
    const [connectorDownFlash, setConnectorDownFlash] = useState(false)
    const [catwalkFlash, setCatwalkFlash] = useState(false)
    const [topMidFlash, setTopMidFlash] = useState(false)
    const [bSiteFlash, setBSiteFlash] = useState(false)

    const [underWoodMolotov, setUnderWoodMolotov] = useState(false)
    const [aBenchMolotov, setABenchMolotov] = useState(false)
    const [carMolotov, setCarMolotov] = useState(false)

    const [smokeAmount, setSmokeAmount] = useState(0)
    const [flashAmount, setFlashAmount] = useState(0)
    const [molotovAmount, setMolotovAmount] = useState(0)

    const [tacticName, setTacticName] = useState("")
    const [tacticDescription, setTacticDescription] = useState("")
    const [playerOneTask, setPlayerOneTask] = useState("")
    const [playerTwoTask, setPlayerTwoTask] = useState("")
    const [playerThreeTask, setPlayerThreeTask] = useState("")
    const [playerFourTask, setPlayerFourTask] = useState("")
    const [playerFiveTask, setPlayerFiveTask] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedGrenadeIndex, setSelectedGrenadeIndex] = useState(0);

    const [yellowUtility, setYellowUtility] = useState([]);
    const [blueUtility, setBlueUtility] = useState([]);
    const [purpleUtility, setPurpleUtility] = useState([]);
    const [greenUtility, setGreenUtility] = useState([]);
    const [orangeUtility, setOrangeUtility] = useState([]);

    const positions = {
        ctSmoke: "CT",
        aSiteSmoke: "A Site",
        jungleSmoke: "Jungle",
        stairsSmoke: "Stairs",
        connectorUpSmoke: "Upper Connector",
        jungleDeepSmoke: "Jungle Deep",
        connectorDownSmoke: "Down Connector",
        windowSmoke: "Mid Window",
        catwalkSmoke: "Short",
        midCatwalkSmoke: "Catwalk",
        topMidSmoke: "Top Mid",
        exitSmoke: "Exit",
        bWindowSmoke: "B Window",
        shortLeftSmoke: "B Left Short",
        shortRightSmoke: "B Right Short",

        ctFlash: "CT",
        aSiteFlash: "A Site",
        jungleFlash: "Jungle",
        stairsFlash: "Stairs",
        connectorDownFlash: "Down Connector",
        catwalkFlash: "Catwalk",
        topMidFlash: "Top Mid",
        bSiteFlash: "B Site",

        underWoodMolotov: "Under Wood",
        aBenchMolotov: "A Bench",
        carMolotov: "Car"
    }

    const remapPositions = (type) => {
        return (
            positions[type]
        )
    };
    return (
        <View>
            <View style={styles.grenades}>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{smokeAmount}/5</Text>
                    <Image alt="smoke" source={smokeImage} style={{resizeMode: 'contain', height: 25, width: 30}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{flashAmount}/10</Text>
                    <Image alt="flash" source={flashImage} style={{resizeMode: 'contain', height: 35, width: 35}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{molotovAmount}/5</Text>
                    <Image alt="molotov" source={molotovImage} style={{resizeMode: 'contain', height: 35, width: 40}}/>
                </View>
            </View>
            <View style={styles.playerButtons}>
                <ButtonGroup
                    buttons={[
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: "#A49500",
                            marginHorizontal: 4
                        }}></View>,
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: "#00567F",
                            marginHorizontal: 4
                        }}></View>,
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: "#550083",
                            marginHorizontal: 4
                        }}></View>,
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: "#0A8300",
                            marginHorizontal: 4
                        }}></View>,
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: "#CD5A00",
                            marginHorizontal: 4
                        }}></View>,
                    ]}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                        console.log(value)
                    }}
                    containerStyle={{
                        width: '90%',
                        height: 65,
                        backgroundColor: "#0F1114",
                        borderWidth: 0,
                        gap: -1
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#272727",
                        borderRadius: 70,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114"}}
                />
            </View>
            <View style={{display: "flex", alignItems: "center", marginVertical: 10}}>
                <ButtonGroup
                    buttons={[
                        "SMOKES", "FLASHES", "MOLOTOV"
                    ]}
                    selectedIndex={selectedGrenadeIndex}
                    onPress={(value) => {
                        setSelectedGrenadeIndex(value);
                        console.log(value)
                    }}
                    containerStyle={{
                        width: '90%',
                        height: 65,
                        backgroundColor: "#0F1114",
                        borderWidth: 0,
                        gap: -1
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#272727",
                        borderRadius: 10,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114"}}
                />
            </View>
            <ImageBackground source={mirageLayout} style={{marginBottom: 20, width: 360, height: 272}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeCT} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={ctSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setCtSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeASite} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={aSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setASiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeJungle} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={jungleSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setJungleSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeStairs} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={stairsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setStairsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="stairsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorUp} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={connectorUpSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorUpSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorUpSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeJungleDeep} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={jungleDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setJungleDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorDown} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={connectorDownSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorDownSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorDownSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeWindow} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={windowSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setWindowSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeCatwalk} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={catwalkSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setCatwalkSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="catwalkSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMidCatwalk} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={midCatwalkSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidCatwalkSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midCatwalkSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTopMid} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={topMidSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTopMidSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeExit} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={exitSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setExitSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="exitSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBWindow} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bWindowSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBWindowSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bWindowSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeShortLeft} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={shortLeftSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setShortLeftSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortLeftSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeShortRight} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={shortRightSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setShortRightSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortRightSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashCT} additionalStyle={styles.selectedFlash}
                                       grenadePosition={ctFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setCtFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctFlash"/>

                        <SingleGrenade mainStyle={styles.flashASite} additionalStyle={styles.selectedFlash}
                                       grenadePosition={aSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashJungle} additionalStyle={styles.selectedFlash}
                                       grenadePosition={jungleFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setJungleFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleFlash"/>

                        <SingleGrenade mainStyle={styles.flashStairs} additionalStyle={styles.selectedFlash}
                                       grenadePosition={stairsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setStairsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="stairsFlash"/>

                        <SingleGrenade mainStyle={styles.flashConnectorDown} additionalStyle={styles.selectedFlash}
                                       grenadePosition={connectorDownFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setConnectorDownFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorDownFlash"/>

                        <SingleGrenade mainStyle={styles.flashCatwalk} additionalStyle={styles.selectedFlash}
                                       grenadePosition={catwalkFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setCatwalkFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="catwalkFlash"/>

                        <SingleGrenade mainStyle={styles.flashTopMid} additionalStyle={styles.selectedFlash}
                                       grenadePosition={topMidFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setTopMidFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidFlash"/>

                        <SingleGrenade mainStyle={styles.flashBSite} additionalStyle={styles.selectedFlash}
                                       grenadePosition={bSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBSiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovUnderWood} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={underWoodMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setUnderWoodMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underWoodMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovABench} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={aBenchMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setABenchMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aBenchMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovCar} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={carMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCarMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="carMolotov"/>
                    </View>)}

            </ImageBackground>
            <View style={{
                backgroundColor: "#272727",
                flex: 1,
                alignItems: 'center',
                marginBottom: 28,
                padding: 20,
                borderRadius: 10,
            }}>
                <TextInput
                    style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minHeight: 40,
                        width: '100%',
                        maxWidth: '100%',
                        padding: 5,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    multiline
                    onChangeText={(e) => setTacticName(e)}
                    placeholder="Tactic Name..."
                    placeholderTextColor="#CCCCCC"
                />
                <TextInput
                    style={{
                        color: "#FFF",
                        minHeight: 40,
                        width: '100%',
                        maxWidth: '100%',
                        padding: 5,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    multiline
                    onChangeText={(e) => setTacticDescription(e)}
                    placeholder="Tactic Description..."
                    placeholderTextColor="#CCCCCC"
                />
                <View style={{
                    backgroundColor: "#3B3B3B",
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom: 20,
                    padding: 10,
                }}>

                    <Text style={{color: "#FFF"}}>Tasks:</Text>
                    <View style={{
                        display: "flex",
                        backgroundColor: "#A49500",
                        width: '100%',
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>{yellowUtility.map((item, index) => {
                            return (
                                <View style={{display: "flex", flexDirection:"row", alignItems: "center"}} key={index}>
                                    {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("molotov") && <Image alt="smoke" source={molotovImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(item)}</Text>
                                </View>
                            )
                        }
                    )}</View>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#A49500",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            marginBottom: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerOneTask(e)}
                        placeholder="Player 1"
                        placeholderTextColor="#CCCCCC"
                    />
                    <View style={{
                        display: "flex",
                        backgroundColor: "#00567F",
                        width: '100%',
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>{blueUtility.map((item, index) => {
                            return (
                                <View style={{display: "flex", flexDirection:"row", alignItems: "center"}} key={index}>
                                    {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("molotov") && <Image alt="smoke" source={molotovImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(item)}</Text>
                                </View>
                            )
                        }
                    )}</View>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#00567F",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            marginBottom: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerTwoTask(e)}
                        placeholder="Player 2"
                        placeholderTextColor="#CCCCCC"
                    />
                    <View style={{
                        display: "flex",
                        backgroundColor: "#550083",
                        width: '100%',
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>{purpleUtility.map((item, index) => {
                            return (
                                <View style={{display: "flex", flexDirection:"row", alignItems: "center"}} key={index}>
                                    {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("molotov") && <Image alt="smoke" source={molotovImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(item)}</Text>
                                </View>
                            )
                        }
                    )}</View>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#550083",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            marginBottom: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerThreeTask(e)}
                        placeholder="Player 3"
                        placeholderTextColor="#CCCCCC"
                    />
                    <View style={{
                        display: "flex",
                        backgroundColor: "#0A8300",
                        width: '100%',
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>{greenUtility.map((item, index) => {
                            return (
                                <View style={{display: "flex", flexDirection:"row", alignItems: "center"}} key={index}>
                                    {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("molotov") && <Image alt="smoke" source={molotovImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(item)}</Text>
                                </View>
                            )
                        }
                    )}</View>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#0A8300",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            marginBottom: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerFourTask(e)}
                        placeholder="Player 4"
                        placeholderTextColor="#CCCCCC"
                    />
                    <View style={{
                        display: "flex",
                        backgroundColor: "#CD5A00",
                        width: '100%',
                        paddingVertical: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>{orangeUtility.map((item, index) => {
                            return (
                                <View style={{display: "flex", flexDirection:"row", alignItems: "center"}} key={index}>
                                    {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    {item.toLowerCase().includes("molotov") && <Image alt="smoke" source={molotovImage} style={{
                                        resizeMode: 'contain',
                                        height: 15,
                                        width: 20
                                    }}/>}
                                    <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(item)}</Text>
                                </View>
                            )
                        }
                    )}</View>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#CD5A00",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            marginBottom: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerFiveTask(e)}
                        placeholder="Player 5"
                        placeholderTextColor="#CCCCCC"
                    />
                </View>
                <TouchableOpacity
                    style={{backgroundColor: "#00A225", width: '100%', padding: 15, borderRadius: 10}}><Text
                    style={{color: "#FFF", textAlign: "center", fontSize: 22}}>Add Tactic!</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    grenades: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 35,
        paddingLeft: 25,
        borderRadius: 10,
        gap: 25,
        backgroundColor: "#272727"
    },
    playerButtons: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 15,
        gap: 25
    },
    singleGrenade: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSmoke: {
        backgroundColor: "#00ff00",
    },
    selectedFlash: {
        backgroundColor: "#FFB200",
    },
    selectedMolotov: {
        backgroundColor: "#FF0000",
    },
    playerSelectedButton: {
        borderWidth: 3,
        borderColor: "#FFF",
        transform: [{scaleX: 1.2}, {scaleY: 1.2}],
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
        backgroundColor: "#F6FFB8",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderWood: {
        position: 'absolute',
        top: 215,
        left: 220,
        backgroundColor: "#FFB3B3",
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
        backgroundColor: "#FFB3B3",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: "#F6FFB8",
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
        backgroundColor: "#F6FFB8",
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
        backgroundColor: "#F6FFB8",
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
        backgroundColor: "#F6FFB8",
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
        backgroundColor: "#F6FFB8",
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
        top: 25,
        left: 80,
        backgroundColor: "#F6FFB8",
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
        backgroundColor: "#FFB3B3",
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
        backgroundColor: "#F6FFB8",
        width: 18,
        height: 18,
        borderRadius: 100
    },
});