import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput, ToastAndroid
} from "react-native";
import React, {useState} from "react";
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {miragePositions} from "../common/positions";
import uuid from 'react-native-uuid';
import ctSide from "../../assets/images/ctside.webp";
import tSide from "../../assets/images/tside.webp";

export default function MirageLayout() {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
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
    const [bSiteOneSmoke, setBSiteOneSmoke] = useState(false)
    const [bSiteTwoSmoke, setBSiteTwoSmoke] = useState(false)
    const [bSiteThreeSmoke, setBSiteThreeSmoke] = useState(false)
    const [bSiteFourSmoke, setBSiteFourSmoke] = useState(false)
    const [bBenchSmoke, setBBenchSmoke] = useState(false)
    const [bBalconySmoke, setBBalconySmoke] = useState(false)
    const [bTrashCanSmoke, setBTrashCanSmoke] = useState(false)
    const [bSiteCornerSmoke, setBSiteCornerSmoke] = useState(false)
    const [bAppsSmoke, setBAppsSmoke] = useState(false)
    const [bAppsDeepSmoke, setBAppsDeepSmoke] = useState(false)
    const [bShortDeepSmoke, setBShortDeepSmoke] = useState(false)
    const [deepTopMidSmoke, setDeepTopMidSmoke] = useState(false)
    const [aRampSmoke, setARampSmoke] = useState(false)
    const [aRampDeepSmoke, setARampDeepSmoke] = useState(false)
    const [tetrisSmoke, setTetrisSmoke] = useState(false)
    const [aPalaceSmoke, setAPalaceSmoke] = useState(false)
    const [aFireboxSmoke, setAFireboxSmoke] = useState(false)
    const [aDefaultSmoke, setADefaultSmoke] = useState(false)

    const [ctFlash, setCtFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [jungleFlash, setJungleFlash] = useState(false)
    const [stairsFlash, setStairsFlash] = useState(false)
    const [connectorDownFlash, setConnectorDownFlash] = useState(false)
    const [catwalkFlash, setCatwalkFlash] = useState(false)
    const [topMidFlash, setTopMidFlash] = useState(false)
    const [bSiteFlash, setBSiteFlash] = useState(false)
    const [overAFlash, setOverAFlash] = useState(false)
    const [overBFlash, setOverBFlash] = useState(false)
    const [windowFlash, setWindowFlash] = useState(false)
    const [bAppsFlash, setBAppsFlash] = useState(false)
    const [ladderFlash, setLadderFlash] = useState(false)
    const [behindMidBoxesFlash, setBehindMidBoxesFlash] = useState(false)
    const [rampFlash, setRampFlash] = useState(false)
    const [rampDeepFlash, setRampDeepFlash] = useState(false)
    const [palaceFlash, setPalaceFlash] = useState(false)

    const [underWoodMolotov, setUnderWoodMolotov] = useState(false)
    const [aBenchMolotov, setABenchMolotov] = useState(false)
    const [carMolotov, setCarMolotov] = useState(false)
    const [bBalconyMolotov, setBBalconyMolotov] = useState(false)
    const [underAppsMolotov, setUnderAppsMolotov] = useState(false)
    const [windowMolotov, setWindowMolotov] = useState(false)
    const [ladderMolotov, setLadderMolotov] = useState(false)
    const [ninjaMolotov, setNinjaMolotov] = useState(false)
    const [sandwichMolotov, setSandwichMolotov] = useState(false)
    const [fireboxMolotov, setFireboxMolotov] = useState(false)
    const [bAppsDeepMolotov, setBAppsDeepMolotov] = useState(false)
    const [topMidBoxesMolotov, setTopMidBoxesMolotov] = useState(false)
    const [aRampMolotov, setARampMolotov] = useState(false)
    const [aRampDeepMolotov, setARampDeepMolotov] = useState(false)
    const [palaceMolotov, setPalaceMolotov] = useState(false)
    const [ctMolotov, setCtMolotov] = useState(false)
    const [jungleMolotov, setJungleMolotov] = useState(false)
    const [kitchenMolotov, setKitchenMolotov] = useState(false)

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
            let tacticKey = "map_mirage_" + chosenSite + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join("")) + uuid.v4()

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
                    navigation.navigate('mirage', {'paramPropKey': 'paramPropValue'})
                }, 1500);
            }).catch((err) => {
                console.log("error is: " + err);
            });
        } else {
            return showToastWithGravityAndOffset("Tactic Name and Tactic Description must not be empty")
        }
    }

    return (
        <View style={{width: width}}>
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
            <ImageBackground source={mirageLayout} style={{marginBottom: 20, width: 360, height: 272}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeCT} grenadePosition={ctSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setCtSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeASite} grenadePosition={aSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setASiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeJungle} grenadePosition={jungleSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setJungleSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeStairs} grenadePosition={stairsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setStairsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="stairsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorUp} grenadePosition={connectorUpSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorUpSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorUpSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeJungleDeep} grenadePosition={jungleDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setJungleDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnectorDown} grenadePosition={connectorDownSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorDownSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorDownSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeWindow} grenadePosition={windowSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setWindowSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeCatwalk} grenadePosition={catwalkSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setCatwalkSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="catwalkSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMidCatwalk} grenadePosition={midCatwalkSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidCatwalkSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midCatwalkSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTopMid} grenadePosition={topMidSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTopMidSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeExit} grenadePosition={exitSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setExitSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="exitSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBWindow} grenadePosition={bWindowSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBWindowSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bWindowSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeShortLeft} grenadePosition={shortLeftSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setShortLeftSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortLeftSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeShortRight} grenadePosition={shortRightSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setShortRightSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="shortRightSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSiteOne} grenadePosition={bSiteOneSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteOneSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteOneSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSiteTwo} grenadePosition={bSiteTwoSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteTwoSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteTwoSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSiteThree} grenadePosition={bSiteThreeSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteThreeSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteThreeSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSiteFour} grenadePosition={bSiteFourSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteFourSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteFourSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBBalcony} grenadePosition={bBalconySmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBBalconySmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bBalconySmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBBench} grenadePosition={bBenchSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBBenchSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bBenchSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBTrashCan} grenadePosition={bTrashCanSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBTrashCanSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bTrashCanSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSiteCorner} grenadePosition={bSiteCornerSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteCornerSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteCornerSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBApps} grenadePosition={bAppsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBAppsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAppsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBAppsDeep} grenadePosition={bAppsDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBAppsDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAppsDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBShortDeep} grenadePosition={bShortDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBShortDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bShortDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeDeepTopMid} grenadePosition={deepTopMidSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setDeepTopMidSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="deepTopMidSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeARamp} grenadePosition={aRampSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setARampSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aRampSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeARampDeep} grenadePosition={aRampDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setARampDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aRampDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTetris} grenadePosition={tetrisSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTetrisSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="tetrisSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAPalace} grenadePosition={aPalaceSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAPalaceSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aPalaceSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAFirebox} grenadePosition={aFireboxSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAFireboxSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aFireboxSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeADefault} grenadePosition={aDefaultSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setADefaultSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aDefaultSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashCT} grenadePosition={ctFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setCtFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctFlash"/>

                        <SingleGrenade mainStyle={styles.flashASite} grenadePosition={aSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashJungle} grenadePosition={jungleFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setJungleFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleFlash"/>

                        <SingleGrenade mainStyle={styles.flashStairs} grenadePosition={stairsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setStairsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="stairsFlash"/>

                        <SingleGrenade mainStyle={styles.flashConnectorDown} grenadePosition={connectorDownFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setConnectorDownFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorDownFlash"/>

                        <SingleGrenade mainStyle={styles.flashCatwalk} grenadePosition={catwalkFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setCatwalkFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="catwalkFlash"/>

                        <SingleGrenade mainStyle={styles.flashTopMid} grenadePosition={topMidFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setTopMidFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidFlash"/>

                        <SingleGrenade mainStyle={styles.flashBSite} grenadePosition={bSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBSiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashOverA} grenadePosition={overAFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setOverAFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="overAFlash"/>

                        <SingleGrenade mainStyle={styles.flashOverB} grenadePosition={overBFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setOverBFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="overBFlash"/>

                        <SingleGrenade mainStyle={styles.flashWindow} grenadePosition={windowFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setWindowFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowFlash"/>

                        <SingleGrenade mainStyle={styles.flashBApps} grenadePosition={bAppsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBAppsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAppsFlash"/>

                        <SingleGrenade mainStyle={styles.flashLadder} grenadePosition={ladderFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setLadderFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ladderFlash"/>

                        <SingleGrenade mainStyle={styles.flashBehindMidBoxes} grenadePosition={behindMidBoxesFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBehindMidBoxesFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="behindMidBoxesFlash"/>

                        <SingleGrenade mainStyle={styles.flashRamp} grenadePosition={rampFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRampFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampFlash"/>

                        <SingleGrenade mainStyle={styles.flashRampDeep} grenadePosition={rampDeepFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRampDeepFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampDeepFlash"/>

                        <SingleGrenade mainStyle={styles.flashPalace} grenadePosition={palaceFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setPalaceFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="palaceFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovUnderWood} grenadePosition={underWoodMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setUnderWoodMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underWoodMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovABench} grenadePosition={aBenchMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setABenchMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aBenchMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovCar} grenadePosition={carMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCarMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="carMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBBalcony} grenadePosition={bBalconyMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBBalconyMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bBalconyMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovUnderApps} grenadePosition={underAppsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setUnderAppsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underAppsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovWindow} grenadePosition={windowMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setWindowMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovLadder} grenadePosition={ladderMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setLadderMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ladderMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovNinja} grenadePosition={ninjaMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setNinjaMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ninjaMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSandwich} grenadePosition={sandwichMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSandwichMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="sandwichMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovFirebox} grenadePosition={fireboxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setFireboxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="fireboxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBAppsDeep} grenadePosition={bAppsDeepMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBAppsDeepMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAppsDeepMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovTopMidBoxes} grenadePosition={topMidBoxesMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setTopMidBoxesMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidBoxesMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovARamp} grenadePosition={aRampMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setARampMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aRampMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovARampDeep} grenadePosition={aRampDeepMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setARampDeepMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aRampDeepMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPalace} grenadePosition={palaceMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPalaceMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="palaceMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovCt} grenadePosition={ctMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCtMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovJungle} grenadePosition={jungleMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setJungleMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="jungleMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovKitchen} grenadePosition={kitchenMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setKitchenMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="kitchenMolotov"/>
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
                                   color="#A49500" positions={miragePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={miragePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={miragePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={miragePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={miragePositions}/>
                </View>
                <TouchableOpacity
                    style={styles.addTacticButton}
                    onPress={() => saveTactic()}>
                    <Text style={{
                        color: "#FFF",
                        textAlign: "center",
                        fontSize: 20,
                        fontFamily: "PoppinsMedium",
                        textTransform: "uppercase",
                        paddingTop: 2,
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
    smokeCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverB: {
        position: 'absolute',
        top: 25,
        left: 90,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashOverA: {
        position: 'absolute',
        top: 200,
        left: 200,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderWood: {
        position: 'absolute',
        top: 215,
        left: 220,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovABench: {
        position: 'absolute',
        top: 200,
        left: 163,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorUp: {
        position: 'absolute',
        top: 155,
        left: 167,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungleDeep: {
        position: 'absolute',
        top: 170,
        left: 145,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidCatwalk: {
        position: 'absolute',
        top: 97,
        left: 165,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortLeft: {
        position: 'absolute',
        top: 45,
        left: 105,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteOne: {
        position: 'absolute',
        top: 30,
        left: 60,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteTwo: {
        position: 'absolute',
        top: 43,
        left: 75,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteThree: {
        position: 'absolute',
        top: 56,
        left: 60,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBench: {
        position: 'absolute',
        top: 23,
        left: 38,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBBalcony: {
        position: 'absolute',
        top: 2,
        left: 61,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteFour: {
        position: 'absolute',
        top: 43,
        left: 45,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortRight: {
        position: 'absolute',
        top: 25,
        left: 105,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 20,
        left: 72,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeExit: {
        position: 'absolute',
        top: 80,
        left: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBTrashCan: {
        position: 'absolute',
        top: 61,
        left: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSiteCorner: {
        position: 'absolute',
        top: 60,
        left: 81,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBApps: {
        position: 'absolute',
        top: 3,
        left: 97,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBAppsDeep: {
        position: 'absolute',
        top: 17,
        left: 147,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBShortDeep: {
        position: 'absolute',
        top: 45,
        left: 134,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeDeepTopMid: {
        position: 'absolute',
        top: 70,
        left: 240,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeARamp: {
        position: 'absolute',
        top: 176,
        left: 235,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeARampDeep: {
        position: 'absolute',
        top: 186,
        left: 257,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTetris: {
        position: 'absolute',
        top: 188,
        left: 213,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAPalace: {
        position: 'absolute',
        top: 237,
        left: 222,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAFirebox: {
        position: 'absolute',
        top: 225,
        left: 160,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeADefault: {
        position: 'absolute',
        top: 230,
        left: 197,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCar: {
        position: 'absolute',
        top: 2,
        left: 45,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovFirebox: {
        position: 'absolute',
        top: 225,
        left: 160,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBBalcony: {
        position: 'absolute',
        top: 2,
        left: 63,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderApps: {
        position: 'absolute',
        top: 16,
        left: 92,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLadder: {
        position: 'absolute',
        top: 72,
        left: 134,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovNinja: {
        position: 'absolute',
        top: 239,
        left: 203,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBAppsDeep: {
        position: 'absolute',
        top: 17,
        left: 133,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTopMidBoxes: {
        position: 'absolute',
        top: 110,
        left: 251,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovARamp: {
        position: 'absolute',
        top: 176,
        left: 235,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovARampDeep: {
        position: 'absolute',
        top: 186,
        left: 252,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPalace: {
        position: 'absolute',
        top: 237,
        left: 222,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCt: {
        position: 'absolute',
        top: 254,
        left: 141,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovJungle: {
        position: 'absolute',
        top: 156,
        left: 125,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovKitchen: {
        position: 'absolute',
        top: 89,
        left: 68,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSandwich: {
        position: 'absolute',
        top: 180,
        left: 193,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBWindow: {
        position: 'absolute',
        top: 80,
        left: 67,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBApps: {
        position: 'absolute',
        top: 2,
        left: 90,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLadder: {
        position: 'absolute',
        top: 70,
        left: 135,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBehindMidBoxes: {
        position: 'absolute',
        top: 110,
        left: 251,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 177,
        left: 245,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRampDeep: {
        position: 'absolute',
        top: 185,
        left: 264,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashPalace: {
        position: 'absolute',
        top: 237,
        left: 222,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
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