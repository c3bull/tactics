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
import anubisLayout from "../../assets/images/mapLayouts/anubisLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {anubisPositions} from "../common/positions";

export default function AnubisLayout() {
    const navigation = useNavigation();
    const [streetSmoke, setStreetSmoke] = useState(false)
    const [palaceSmoke, setPalaceSmoke] = useState(false)
    const [bSiteSmoke, setBSiteSmoke] = useState(false)
    const [backsiteBSmoke, setBacksiteBSmoke] = useState(false)
    const [connectorUpSmoke, setConnectorUpSmoke] = useState(false)
    const [connectorDownSmoke, setConnectorDownSmoke] = useState(false)
    const [bridgeSmoke, setBridgeSmoke] = useState(false)
    const [windowSmoke, setWindowSmoke] = useState(false)
    const [midPalaceSmoke, setMidPalaceSmoke] = useState(false)
    const [walkwaySmoke, setWalkwaySmoke] = useState(false)
    const [heavenSmoke, setHeavenSmoke] = useState(false)
    const [platformSmoke, setPlatformSmoke] = useState(false)
    const [aStairsSmoke, setAStairsSmoke] = useState(false)
    const [aMainSmoke, setAMainSmoke] = useState(false)

    const [bSiteFlash, setBSiteFlash] = useState(false)
    const [bEntranceFlash, setBEntranceFlash] = useState(false)
    const [bridgeFlash, setBridgeFlash] = useState(false)
    const [canalsFlash, setCanalsFlash] = useState(false)
    const [connectorFlash, setConnectorFlash] = useState(false)
    const [aMainFlash, setAMainFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)

    const [bPillarMolotov, setBPillarMolotov] = useState(false)
    const [bBacksiteMolotov, setBBacksiteMolotov] = useState(false)
    const [ninjaMolotov, setNinjaMolotov] = useState(false)
    const [palaceMolotov, setPalaceMolotov] = useState(false)
    const [windowMolotov, setWindowMolotov] = useState(false)
    const [doubleDoorsMolotov, setDoubleDoorsMolotov] = useState(false)
    const [walkwayMolotov, setWalkwayMolotov] = useState(false)
    const [platformMolotov, setPlatformMolotov] = useState(false)
    const [aStairsMolotov, setAStairsMolotov] = useState(false)
    const [aSiteMolotov, setASiteMolotov] = useState(false)
    const [heavenMolotov, setHeavenMolotov] = useState(false)
    const [fountainMolotov, setFountainMolotov] = useState(false)

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
        if (tacticName !== "" && tacticDescription !== "") {
            let tacticKey = "map_anubis_" + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join(""))
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
                    navigation.navigate('anubis', {'paramPropKey': 'paramPropValue'})
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
                    buttonContainerStyle={{backgroundColor: "#0F1114BB", borderWidth: 1, borderColor: "#0F1114" }}
                />
            </View>
            <ImageBackground source={anubisLayout} style={{marginBottom: 20, width: 360, height: 340}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeStreet} grenadePosition={streetSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setStreetSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="streetSmoke"/>

                        <SingleGrenade mainStyle={styles.smokePalace} grenadePosition={palaceSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setPalaceSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="palaceSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSite} grenadePosition={bSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBacksiteB} grenadePosition={backsiteBSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBacksiteBSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="backsiteBSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorUp} grenadePosition={connectorUpSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorUpSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorUpSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorDown} grenadePosition={connectorDownSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorDownSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorDownSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBridge} grenadePosition={bridgeSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBridgeSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bridgeSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeWindow} grenadePosition={windowSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setWindowSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMidPalace} grenadePosition={midPalaceSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidPalaceSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midPalaceSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeWalkway} grenadePosition={walkwaySmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setWalkwaySmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="walkwaySmoke"/>

                        <SingleGrenade mainStyle={styles.smokeHeaven} grenadePosition={heavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokePlatform} grenadePosition={platformSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setPlatformSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="platformSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAStairs} grenadePosition={aStairsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAStairsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aStairsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAMain} grenadePosition={aMainSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAMainSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aMainSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashBSite} grenadePosition={bSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBSiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashBEntrance} grenadePosition={bEntranceFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBEntranceFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bEntranceFlash"/>

                        <SingleGrenade mainStyle={styles.flashBridge} grenadePosition={bridgeFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBridgeFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bridgeFlash"/>

                        <SingleGrenade mainStyle={styles.flashCanals} grenadePosition={canalsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setCanalsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="canalsFlash"/>

                        <SingleGrenade mainStyle={styles.flashConnector} grenadePosition={connectorFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setConnectorFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorFlash"/>

                        <SingleGrenade mainStyle={styles.flashAMain} grenadePosition={aMainFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setAMainFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aMainFlash"/>

                        <SingleGrenade mainStyle={styles.flashASite} grenadePosition={aSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovBPillar} grenadePosition={bPillarMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBPillarMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bPillarMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBBacksite} grenadePosition={bBacksiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBBacksiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bBacksiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovNinja} grenadePosition={ninjaMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setNinjaMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ninjaMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPalace} grenadePosition={palaceMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPalaceMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="palaceMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovWindow} grenadePosition={windowMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setWindowMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovDoubleDoors} grenadePosition={doubleDoorsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setDoubleDoorsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="doubleDoorsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovWalkway} grenadePosition={walkwayMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setWalkwayMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="walkwayMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPlatform} grenadePosition={platformMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPlatformMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="platformMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovAStairs} grenadePosition={aStairsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setAStairsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aStairsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovASite} grenadePosition={aSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setASiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovHeaven} grenadePosition={heavenMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHeavenMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovFountain} grenadePosition={fountainMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setFountainMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="fountainMolotov"/>
                    </View>)}
            </ImageBackground>
            <View style={{
                backgroundColor: 'rgba(32, 32, 32,0.7)',
                flex: 1,
                alignItems: 'center',
                marginBottom: 28,
                padding: 20,
                borderRadius: 10,
            }}>
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
                    marginVertical: 20,
                    // padding: 10,
                }}>
                    <AddPlayerTask setTaskHook={setPlayerOneTask} utility={yellowUtility} placeholder="Player 1"
                                   color="#A49500" positions={anubisPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={anubisPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={anubisPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={anubisPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={anubisPositions}/>
                </View>
                <TouchableOpacity
                    style={{backgroundColor: "#00A225", width: '100%', padding: 15, borderRadius: 10}}
                    onPress={() => saveTactic()}>
                    <Text style={{color: "#FFF", textAlign: "center", fontSize: 22}}>
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
    smokeStreet: {
        position: 'absolute',
        top: 128,
        left: 96,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokePalace: {
        position: 'absolute',
        top: 130,
        left: 116,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSite: {
        position: 'absolute',
        top: 152,
        left: 99,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBacksiteB: {
        position: 'absolute',
        top: 168,
        left: 116,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorUp: {
        position: 'absolute',
        top: 184,
        left: 124,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorDown: {
        position: 'absolute',
        top: 198,
        left: 144,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBridge: {
        position: 'absolute',
        top: 180,
        left: 171,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 151,
        left: 174,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidPalace: {
        position: 'absolute',
        top: 100,
        left: 180,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWalkway: {
        position: 'absolute',
        top: 118,
        left: 218,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 54,
        left: 245,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokePlatform: {
        position: 'absolute',
        top: 99,
        left: 240,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAStairs: {
        position: 'absolute',
        top: 110,
        left: 253,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAMain: {
        position: 'absolute',
        top: 110,
        left: 292,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 165,
        left: 105,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBEntrance: {
        position: 'absolute',
        top: 170,
        left: 85,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBridge: {
        position: 'absolute',
        top: 180,
        left: 171,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCanals: {
        position: 'absolute',
        top: 193,
        left: 188,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashConnector: {
        position: 'absolute',
        top: 190,
        left: 133,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashAMain: {
        position: 'absolute',
        top: 130,
        left: 293,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 80,
        left: 260,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBPillar: {
        position: 'absolute',
        top: 185,
        left: 102,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBBacksite: {
        position: 'absolute',
        top: 159,
        left: 119,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovNinja: {
        position: 'absolute',
        top: 167,
        left: 135,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPalace: {
        position: 'absolute',
        top: 131,
        left: 117,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 151,
        left: 173,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovDoubleDoors: {
        position: 'absolute',
        top: 170,
        left: 197,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWalkway: {
        position: 'absolute',
        top: 118,
        left: 218,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPlatform: {
        position: 'absolute',
        top: 99,
        left: 235,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovAStairs: {
        position: 'absolute',
        top: 104,
        left: 258,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovASite: {
        position: 'absolute',
        top: 80,
        left: 256,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 54,
        left: 245,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovFountain: {
        position: 'absolute',
        top: 78,
        left: 293,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
});