import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput, ToastAndroid,
} from "react-native";
import React, {useState} from "react";
import overpassLayout from "../../assets/images/mapLayouts/overpassLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {overpassPositions} from "../common/positions";
import uuid from "react-native-uuid";
import ctSide from "../../assets/images/ctside.webp";
import tSide from "../../assets/images/tside.webp";

export default function OverpassLayout() {
    const navigation = useNavigation();

    const [aBankSmoke, setABankSmoke] = useState(false)
    const [aVanSmoke, setAVanSmoke] = useState(false)
    const [aSiteSmoke, setASiteSmoke] = useState(false)
    const [stairsSmoke, setStairsSmoke] = useState(false)
    const [truckSmoke, setTruckSmoke] = useState(false)
    const [heavenSmoke, setHeavenSmoke] = useState(false)
    const [abcSmoke, setAbcSmoke] = useState(false)
    const [bridgeSmoke, setBridgeSmoke] = useState(false)
    const [bSiteSmoke, setBSiteSmoke] = useState(false)
    const [squeakySmoke, setSqueakySmoke] = useState(false)
    const [bananaSmoke, setBananaSmoke] = useState(false)
    const [bathroomSmoke, setBathroomSmoke] = useState(false)
    const [connectorSmoke, setConnectorSmoke] = useState(false)
    const [longSmoke, setLongSmoke] = useState(false)
    const [diceSmoke, setDiceSmoke] = useState(false)
    const [bCTSmoke, setBCTSmoke] = useState(false)
    const [waterSmoke, setWaterSmoke] = useState(false)
    const [barrelsSmoke, setBarrelsSmoke] = useState(false)
    const [sandbagsSmoke, setSandbagsSmoke] = useState(false)
    const [pipeSmoke, setPipeSmoke] = useState(false)
    const [monsterSmoke, setMonsterSmoke] = useState(false)
    const [rampSmoke, setRampSmoke] = useState(false)

    const [midFlash, setMidFlash] = useState(false)
    const [longFlash, setLongFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [aSiteLongFlash, setASiteLongFlash] = useState(false)
    const [monsterFlash, setMonsterFlash] = useState(false)
    const [shortFlash, setShortFlash] = useState(false)
    const [bSiteFlash, setBSiteFlash] = useState(false)
    const [fountainFlash, setFountainFlash] = useState(false)
    const [lowerTunnelsFlash, setLowerTunnelsFlash] = useState(false)

    const [aSiteMolotov, setASiteMolotov] = useState(false)
    const [truckMolotov, setTruckMolotov] = useState(false)
    const [heavenMolotov, setHeavenMolotov] = useState(false)
    const [pitMolotov, setPitMolotov] = useState(false)
    const [bSiteMolotov, setBSiteMolotov] = useState(false)
    const [waterMolotov, setWaterMolotov] = useState(false)
    const [barrelsMolotov, setBarrelsMolotov] = useState(false)
    const [sandbagsMolotov, setSandbagsMolotov] = useState(false)
    const [bankMolotov, setBankMolotov] = useState(false)
    const [aStandardMolotov, setAStandardMolotov] = useState(false)
    const [bCTMolotov, setBCTMolotov] = useState(false)
    const [shortBoostMolotov, setShortBoostMolotov] = useState(false)
    const [pipeMolotov, setPipeMolotov] = useState(false)
    const [pillarMolotov, setPillarMolotov] = useState(false)
    const [monsterMolotov, setMonsterMolotov] = useState(false)
    const [balloonsMolotov, setBalloonsMolotov] = useState(false)
    const [rampMolotov, setRampMolotov] = useState(false)
    const [playgroundMolotov, setPlaygroundMolotov] = useState(false)
    const [bananaMolotov, setBananaMolotov] = useState(false)

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
    const [selectedSiteIndex, setSelectedSiteIndex] = useState(0);
    const [selectedGrenadeIndex, setSelectedGrenadeIndex] = useState(0);

    const [yellowUtility, setYellowUtility] = useState([]);
    const [blueUtility, setBlueUtility] = useState([]);
    const [purpleUtility, setPurpleUtility] = useState([]);
    const [greenUtility, setGreenUtility] = useState([]);
    const [orangeUtility, setOrangeUtility] = useState([]);

    const showToastWithGravityAndOffset = (text) => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            125,
            150,
        );
    };

    const [showAlert, setShowAlert] = useState(false)

    const saveTactic = () => {
        let chosenSite = "";
        if (tacticName !== "" && tacticDescription !== "") {
            if (selectedSiteIndex === 0) {
                chosenSite = "attacking_site_tactic_"
            } else if (selectedSiteIndex === 1) {
                chosenSite = "defending_site_tactic_"
            }
            let tacticKey = "map_overpass_" + chosenSite + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join("")) + uuid.v4()

            let tacticObject = {
                yellowUtility: yellowUtility,
                blueUtility: blueUtility,
                purpleUtility: purpleUtility,
                greenUtility: greenUtility,
                orangeUtility: orangeUtility,
                smokeAmount: smokeAmount,
                flashAmount: flashAmount,
                molotovAmount: molotovAmount,
                tacticName: tacticName,
                tacticDescription: tacticDescription,
                playerOneTask: playerOneTask,
                playerTwoTask: playerTwoTask,
                playerThreeTask: playerThreeTask,
                playerFourTask: playerFourTask,
                playerFiveTask: playerFiveTask,
            }
            AsyncStorage.setItem(tacticKey, JSON.stringify(tacticObject), (err) => {
                if (err) {
                    console.log("an error");
                    throw err;
                }
                console.log("success");
                setShowAlert(true)
                setTimeout(function () {
                    setShowAlert(false)
                    navigation.navigate('overpass', {'paramPropKey': 'paramPropValue'})
                }, 1500);
            }).catch((err) => {
                console.log("error is: " + err);
            });
        } else {
            return showToastWithGravityAndOffset("Tactic Name and Tactic Description must not be empty")
        }
    }

    return (
        <View>
            <View style={styles.grenades}>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{smokeAmount}/5</Text>
                    <Image alt="smoke" source={smokeImage}
                           style={{resizeMode: 'stretch', height: 20, width: 30, marginLeft: 5}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{flashAmount}/10</Text>
                    <Image alt="flash" source={flashImage} style={{resizeMode: 'contain', height: 25, width: 30}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{molotovAmount}/5</Text>
                    <Image alt="molotov" source={molotovImage} style={{resizeMode: 'contain', height: 25, width: 30}}/>
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
                    }}
                    containerStyle={{
                        width: '90%',
                        height: 65,
                        backgroundColor: "#0F111400",
                        borderWidth: 0,
                        gap: -1
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#272727",
                        borderRadius: 70,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F111400", borderWidth: 2, borderColor: "#ffffff00"}}
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
                    }}
                    containerStyle={{
                        width: '90%',
                        height: 65,
                        backgroundColor: "#0F111400",
                        borderWidth: 0,
                        gap: -1
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#003636",
                        borderColor: "#FFF",
                        borderWidth: 2
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114BB", borderWidth: 1, borderColor: "#0F1114"}}
                />
            </View>
            <ImageBackground source={overpassLayout} style={{marginBottom: 20, width: 360, height: 345}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeABank} grenadePosition={aBankSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setABankSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aBankSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAVan} grenadePosition={aVanSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAVanSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aVanSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeASite} grenadePosition={aSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setASiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeStairs} grenadePosition={stairsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setStairsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="stairsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTruck} grenadePosition={truckSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTruckSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="truckSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeHeaven} grenadePosition={heavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAbc} grenadePosition={abcSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAbcSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="abcSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBridge} grenadePosition={bridgeSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBridgeSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bridgeSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSite} grenadePosition={bSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeSqueaky} grenadePosition={squeakySmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setSqueakySmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="squeakySmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBanana} grenadePosition={bananaSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBananaSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bananaSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBathroom} grenadePosition={bathroomSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBathroomSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bathroomSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnector} grenadePosition={connectorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeLong} grenadePosition={longSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setLongSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="longSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeDice} grenadePosition={diceSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setDiceSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="diceSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBCT} grenadePosition={bCTSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBCTSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCTSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeWater} grenadePosition={waterSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setWaterSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="waterSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBarrels} grenadePosition={barrelsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBarrelsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="barrelsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeSandbags} grenadePosition={sandbagsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setSandbagsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="sandbagsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokePipe} grenadePosition={pipeSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setPipeSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pipeSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMonster} grenadePosition={monsterSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMonsterSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="monsterSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeRamp} grenadePosition={rampSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setRampSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashMid} grenadePosition={midFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setMidFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midFlash"/>

                        <SingleGrenade mainStyle={styles.flashLong} grenadePosition={longFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setLongFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="longFlash"/>

                        <SingleGrenade mainStyle={styles.flashASite} grenadePosition={aSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashASiteLong} grenadePosition={aSiteLongFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteLongFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteLongFlash"/>

                        <SingleGrenade mainStyle={styles.flashMonster} grenadePosition={monsterFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setMonsterFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="monsterFlash"/>

                        <SingleGrenade mainStyle={styles.flashShort} grenadePosition={shortFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setShortFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortFlash"/>

                        <SingleGrenade mainStyle={styles.flashBSite} grenadePosition={bSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBSiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashFountain} grenadePosition={fountainFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setFountainFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="fountainFlash"/>

                        <SingleGrenade mainStyle={styles.flashLowerTunnels} grenadePosition={lowerTunnelsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setLowerTunnelsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="lowerTunnelsFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovASite} grenadePosition={aSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setASiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovTruck} grenadePosition={truckMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setTruckMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="truckMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovHeaven} grenadePosition={heavenMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHeavenMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPit} grenadePosition={pitMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPitMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pitMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBSite} grenadePosition={bSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBSiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovWater} grenadePosition={waterMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setWaterMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="waterMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBarrels} grenadePosition={barrelsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBarrelsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="barrelsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSandbags} grenadePosition={sandbagsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSandbagsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="sandbagsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBank} grenadePosition={bankMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBankMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bankMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovAStandard} grenadePosition={aStandardMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setAStandardMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aStandardMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBCT} grenadePosition={bCTMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBCTMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCTMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovShortBoost} grenadePosition={shortBoostMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setShortBoostMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortBoostMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPipe} grenadePosition={pipeMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPipeMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pipeMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPillar} grenadePosition={pillarMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPillarMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pillarMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovMonster} grenadePosition={monsterMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setMonsterMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="monsterMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBalloons} grenadePosition={balloonsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBalloonsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="balloonsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRamp} grenadePosition={rampMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRampMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPlayground} grenadePosition={playgroundMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPlaygroundMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="playgroundMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBanana} grenadePosition={bananaMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBananaMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bananaMolotov"/>
                    </View>)}
            </ImageBackground>
            <View style={{
                backgroundColor: 'rgba(32, 32, 32,0.7)',
                flex: 1,
                alignItems: 'center',
                marginBottom: 28,
                padding: 20,
                paddingTop: 5,
                borderRadius: 10,
            }}>
                <ButtonGroup
                    buttons={[
                        <ImageBackground source={tSide} resizeMode="contain" style={{
                            width: 50,
                            height: 50,
                        }}/>,
                        <ImageBackground source={ctSide} resizeMode="contain" style={{
                            width: 50,
                            height: 50,
                        }}/>,
                    ]}
                    selectedIndex={selectedSiteIndex}
                    onPress={(value) => {
                        setSelectedSiteIndex(value);
                    }}
                    containerStyle={{
                        width: 130,
                        height: 65,
                        backgroundColor: "#0F111400",
                        borderWidth: 0,
                        gap: -1
                    }}
                    selectedButtonStyle={{
                        backgroundColor: "#272727",
                        borderRadius: 100,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F111400", borderWidth: 2, borderColor: "#ffffff00"}}
                />
                <TextInput
                    style={{
                        color: "#FFF",
                        minHeight: 40,
                        width: '100%',
                        maxWidth: '100%',
                        paddingHorizontal: 10,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderLeftWidth: 1,
                        borderLeftColor: "#00ffff",
                        fontFamily: 'PoppinsSemiBold'
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
                        paddingHorizontal: 10,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderLeftWidth: 1,
                        borderLeftColor: "#00FF00",
                        marginTop: 5,
                        fontFamily: 'PoppinsRegular'
                    }}
                    multiline
                    onChangeText={(e) => setTacticDescription(e)}
                    placeholder="Tactic Description..."
                    placeholderTextColor="#CCCCCC"
                />
                <View style={{
                    // backgroundColor: "#3B3B3B",
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    marginBottom: 10,
                    // padding: 10,
                }}>
                    <AddPlayerTask setTaskHook={setPlayerOneTask} utility={yellowUtility} placeholder="Player 1"
                                   color="#A49500" positions={overpassPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={overpassPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={overpassPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={overpassPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={overpassPositions}/>
                </View>
                <TouchableOpacity
                    style={styles.addTacticButton}
                    onPress={() => saveTactic()}>
                    <Text style={{
                        color: "#FFF", textAlign: "center", fontSize: 20,
                        fontFamily: "PoppinsMedium",
                        textTransform: "uppercase",
                        paddingTop: 2
                    }}>
                        Add Tactic!
                    </Text>
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Success!"
                message="Your tactic was added!"
            />
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
        marginHorizontal: 10,
        marginBottom: 35,
        paddingLeft: 10,
        borderRadius: 10,
        gap: 25,
        backgroundColor: "#003636",
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
    smokeABank: {
        position: 'absolute',
        top: 22,
        left: 135,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAVan: {
        position: 'absolute',
        top: 47,
        left: 123,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 58,
        left: 143,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 41,
        left: 164,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTruck: {
        position: 'absolute',
        top: 66,
        left: 162,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 73,
        left: 185,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAbc: {
        position: 'absolute',
        top: 115,
        left: 180,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBridge: {
        position: 'absolute',
        top: 118,
        left: 213,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSite: {
        position: 'absolute',
        top: 99,
        left: 215,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeSqueaky: {
        position: 'absolute',
        top: 157,
        left: 183,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBanana: {
        position: 'absolute',
        top: 139,
        left: 149,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBathroom: {
        position: 'absolute',
        top: 171,
        left: 121,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnector: {
        position: 'absolute',
        top: 188,
        left: 150,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeLong: {
        position: 'absolute',
        top: 79,
        left: 91,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeDice: {
        position: 'absolute',
        top: 62,
        left: 115,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBCT: {
        position: 'absolute',
        top: 96,
        left: 172,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWater: {
        position: 'absolute',
        top: 79,
        left: 221,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBarrels: {
        position: 'absolute',
        top: 88,
        left: 241,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeSandbags: {
        position: 'absolute',
        top: 129,
        left: 234,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokePipe: {
        position: 'absolute',
        top: 166,
        left: 224,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMonster: {
        position: 'absolute',
        top: 140,
        left: 262,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeRamp: {
        position: 'absolute',
        top: 250,
        left: 169,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMid: {
        position: 'absolute',
        top: 190,
        left: 115,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLong: {
        position: 'absolute',
        top: 235,
        left: 64,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 50,
        left: 140,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASiteLong: {
        position: 'absolute',
        top: 55,
        left: 105,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMonster: {
        position: 'absolute',
        top: 105,
        left: 265,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashShort: {
        position: 'absolute',
        top: 155,
        left: 205,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 100,
        left: 222,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashFountain: {
        position: 'absolute',
        top: 233,
        left: 138,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLowerTunnels: {
        position: 'absolute',
        top: 173,
        left: 175,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovASite: {
        position: 'absolute',
        top: 47,
        left: 130,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTruck: {
        position: 'absolute',
        top: 65,
        left: 157,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 71,
        left: 182,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPit: {
        position: 'absolute',
        top: 107,
        left: 205,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 100,
        left: 223,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWater: {
        position: 'absolute',
        top: 80,
        left: 217,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBarrels: {
        position: 'absolute',
        top: 77,
        left: 237,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSandbags: {
        position: 'absolute',
        top: 130,
        left: 234,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBank: {
        position: 'absolute',
        top: 23,
        left: 135,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovAStandard: {
        position: 'absolute',
        top: 65,
        left: 130,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBCT: {
        position: 'absolute',
        top: 96,
        left: 172,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovShortBoost: {
        position: 'absolute',
        top: 135,
        left: 192,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPipe: {
        position: 'absolute',
        top: 166,
        left: 224,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPillar: {
        position: 'absolute',
        top: 109,
        left: 241,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovMonster: {
        position: 'absolute',
        top: 120,
        left: 265,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBalloons: {
        position: 'absolute',
        top: 212,
        left: 93,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovRamp: {
        position: 'absolute',
        top: 261,
        left: 172,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPlayground: {
        position: 'absolute',
        top: 270,
        left: 152,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBanana: {
        position: 'absolute',
        top: 138,
        left: 149,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    addTacticButton: {
        backgroundColor: "#00A225",
        width: '100%',
        padding: 12,
        borderRadius: 10,
        shadowColor: "#00ff00",
        shadowOffset: {
            width: 10,
            height: 15,
        },
        shadowOpacity: 0.58,
        shadowRadius: 5.00,

        elevation: 10,
    },
});