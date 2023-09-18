import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput, ToastAndroid,
} from "react-native";
import React, {useState} from "react";
import vertigoLayout from "../../assets/images/mapLayouts/vertigoLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {vertigoPositions} from "../common/positions";

export default function VertigoLayout() {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [generatorSmoke, setGeneratorSmoke] = useState(false)
    const [generatorLeftSmoke, setGeneratorLeftSmoke] = useState(false)
    const [bCTSmoke, setBCTSmoke] = useState(false)
    const [windowSmoke, setWindowSmoke] = useState(false)
    const [midElevatorSmoke, setMidElevatorSmoke] = useState(false)
    const [aElevatorSmoke, setAElevatorSmoke] = useState(false)
    const [aSiteSmoke, setASiteSmoke] = useState(false)
    const [aSiteLeftSmoke, setASiteLeftSmoke] = useState(false)
    const [aSiteRightSmoke, setASiteRightSmoke] = useState(false)
    const [headshotSmoke, setHeadshotSmoke] = useState(false)
    const [heavenSmoke, setHeavenSmoke] = useState(false)
    const [aCTSmoke, setACTSmoke] = useState(false)
    const [gapSmoke, setGapSmoke] = useState(false)

    const [bSiteFlash, setBSiteFlash] = useState(false)
    const [windowFlash, setWindowFlash] = useState(false)
    const [bStairsFlash, setBStairsFlash] = useState(false)
    const [midFlash, setMidFlash] = useState(false)
    const [gapFlash, setGapFlash] = useState(false)
    const [rampFlash, setRampFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)

    const [bSiteMolotov, setBSiteMolotov] = useState(false)
    const [tetrisMolotov, setTetrisMolotov] = useState(false)
    const [bCornerMolotov, setBCornerMolotov] = useState(false)
    const [windowMolotov, setWindowMolotov] = useState(false)
    const [ctSpawnMolotov, setCtSpawnMolotov] = useState(false)
    const [elevatorMidMolotov, setElevatorMidMolotov] = useState(false)
    const [gapMolotov, setGapMolotov] = useState(false)
    const [sidewalkMolotov, setSidewalkMolotov] = useState(false)
    const [headshotMolotov, setHeadshotMolotov] = useState(false)
    const [heavenMolotov, setHeavenMolotov] = useState(false)

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
            let tacticKey = "map_vertigo_" + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join(""))
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
                    navigation.navigate('vertigo', {'paramPropKey': 'paramPropValue'})
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
                        backgroundColor: "#003636",
                        borderRadius: 10,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114"}}
                />
            </View>
            <ImageBackground source={vertigoLayout} style={{marginBottom: 20, width: 360, height: 310}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeGenerator} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={generatorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGeneratorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="generatorSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeGeneratorLeft} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={generatorLeftSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGeneratorLeftSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="generatorLeftSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBCT} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bCTSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBCTSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCTSmoke"/>

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

                        <SingleGrenade mainStyle={styles.smokeMidElevator} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={midElevatorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidElevatorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midElevatorSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeAElevator} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={aElevatorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setAElevatorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aElevatorSmoke"/>

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

                        <SingleGrenade mainStyle={styles.smokeASiteLeft} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={aSiteLeftSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setASiteLeftSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteLeftSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeASiteRight} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={aSiteRightSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setASiteRightSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteRightSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeHeadshot} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={headshotSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setHeadshotSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="headshotSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeHeaven} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={heavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeACT} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={aCTSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setACTSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aCTSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeGap} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={gapSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGapSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="gapSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
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

                        <SingleGrenade mainStyle={styles.flashWindow} additionalStyle={styles.selectedFlash}
                                       grenadePosition={windowFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setWindowFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowFlash"/>

                        <SingleGrenade mainStyle={styles.flashBStairs} additionalStyle={styles.selectedFlash}
                                       grenadePosition={bStairsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBStairsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bStairsFlash"/>

                        <SingleGrenade mainStyle={styles.flashMid} additionalStyle={styles.selectedFlash}
                                       grenadePosition={midFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setMidFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midFlash"/>

                        <SingleGrenade mainStyle={styles.flashGap} additionalStyle={styles.selectedFlash}
                                       grenadePosition={gapFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setGapFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="gapFlash"/>

                        <SingleGrenade mainStyle={styles.flashRamp} additionalStyle={styles.selectedFlash}
                                       grenadePosition={rampFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRampFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampFlash"/>

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
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovBSite} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBSiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovTetris} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={tetrisMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setTetrisMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="tetrisMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBCorner} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bCornerMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBCornerMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCornerMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovWindow} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={windowMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setWindowMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="windowMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovCTSpawn} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={ctSpawnMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCtSpawnMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctSpawnMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovMidElevator} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={elevatorMidMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setElevatorMidMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="elevatorMidMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovGap} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={gapMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setGapMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="gapMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSidewalk} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={sidewalkMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSidewalkMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="sidewalkMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovHeadshot} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={headshotMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHeadshotMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="headshotMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovHeaven} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={heavenMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHeavenMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenMolotov"/>
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
                        paddingHorizontal: 10,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderLeftWidth: 1,
                        borderLeftColor: "#00ffff"
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
                                   color="#A49500" positions={vertigoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={vertigoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={vertigoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={vertigoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={vertigoPositions}/>
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
    smokeGenerator: {
        position: 'absolute',
        top: 58,
        left: 108,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGeneratorLeft: {
        position: 'absolute',
        top: 30,
        left: 121,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBCT: {
        position: 'absolute',
        top: 41,
        left: 137,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidElevator: {
        position: 'absolute',
        top: 120,
        left: 207,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeAElevator: {
        position: 'absolute',
        top: 150,
        left: 255,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 165,
        left: 277,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASiteLeft: {
        position: 'absolute',
        top: 180,
        left: 265,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASiteRight: {
        position: 'absolute',
        top: 180,
        left: 287,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeadshot: {
        position: 'absolute',
        top: 175,
        left: 305,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeHeaven: {
        position: 'absolute',
        top: 123,
        left: 283,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeACT: {
        position: 'absolute',
        top: 123,
        left: 302,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGap: {
        position: 'absolute',
        top: 252,
        left: 194,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 32,
        left: 55,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBStairs: {
        position: 'absolute',
        top: 125,
        left: 52,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashMid: {
        position: 'absolute',
        top: 105,
        left: 120,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashGap: {
        position: 'absolute',
        top: 252,
        left: 194,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 263,
        left: 240,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 180,
        left: 280,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 15,
        left: 78,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovTetris: {
        position: 'absolute',
        top: 50,
        left: 33,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBCorner: {
        position: 'absolute',
        top: 3,
        left: 35,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovWindow: {
        position: 'absolute',
        top: 60,
        left: 153,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovCTSpawn: {
        position: 'absolute',
        top: 60,
        left: 235,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovMidElevator: {
        position: 'absolute',
        top: 120,
        left: 207,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovGap: {
        position: 'absolute',
        top: 200,
        left: 193,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovSidewalk: {
        position: 'absolute',
        top: 195,
        left: 230,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeadshot: {
        position: 'absolute',
        top: 175,
        left: 305,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 123,
        left: 283,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 18,
        height: 18,
        borderRadius: 100
    },
});