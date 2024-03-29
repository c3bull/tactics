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
import nukeLayout from "../../assets/images/mapLayouts/nukeLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {nukePositions} from "../common/positions";
import uuid from "react-native-uuid";
import ctSide from "../../assets/images/ctside.webp";
import tSide from "../../assets/images/tside.webp";

export default function NukeLayout() {
    const navigation = useNavigation();
    const [heavenSmoke, setHeavenSmoke] = useState(false)
    const [outsideHeavenSmoke, setOutsideHeavenSmoke] = useState(false)
    const [lockerSmoke, setLockerSmoke] = useState(false)
    const [ventSmoke, setVentSmoke] = useState(false)
    const [mainSmoke, setMainSmoke] = useState(false)
    const [outsideMainSmoke, setOutsideMainSmoke] = useState(false)
    const [outsideSecretSmoke, setOutsideSecretSmoke] = useState(false)
    const [garageSmoke, setGarageSmoke] = useState(false)
    const [outsideRedSmoke, setOutsideRedSmoke] = useState(false)
    const [outsideRedSecretSmoke, setOutsideRedSecretSmoke] = useState(false)
    const [underHeavenSmoke, setUnderHeavenSmoke] = useState(false)
    const [bAquariumSmoke, setBAquariumSmoke] = useState(false)
    const [bDoubleDoorsSmoke, setBDoubleDoorsSmoke] = useState(false)
    const [bSingleDoorSmoke, setBSingleDoorSmoke] = useState(false)
    const [underSiloSmoke, setUnderSiloSmoke] = useState(false)
    const [outsideRedCrossSmoke, setOutsideRedCrossSmoke] = useState(false)

    const [outsideFlash, setOutsideFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [rampFlash, setRampFlash] = useState(false)
    const [mainFlash, setMainFlash] = useState(false)
    const [hutFlash, setHutFlash] = useState(false)
    const [underSiloFlash, setUnderSiloFlash] = useState(false)
    const [garageFlash, setGarageFlash] = useState(false)
    const [secretFlash, setSecretFlash] = useState(false)
    const [lobbyFlash, setLobbyFlash] = useState(false)
    const [radioFlash, setRadioFlash] = useState(false)
    const [rampEntranceFlash, setRampEntranceFlash] = useState(false)

    const [hutRoofMolotov, setHutRoofMolotov] = useState(false)
    const [aSiteMolotov, setASiteMolotov] = useState(false)
    const [heavenMolotov, setHeavenMolotov] = useState(false)
    const [ctVentMolotov, setCtVentMolotov] = useState(false)
    const [redMolotov, setRedMolotov] = useState(false)
    const [secretMolotov, setSecretMolotov] = useState(false)
    const [rampBoxMolotov, setRampBoxMolotov] = useState(false)
    const [darkMolotov, setDarkMolotov] = useState(false)
    const [bSiteMolotov, setBSiteMolotov] = useState(false)
    const [squeakyMolotov, setSqueakyMolotov] = useState(false)
    const [rampEntranceMolotov, setRampEntranceMolotov] = useState(false)
    const [underSiloMolotov, setUnderSiloMolotov] = useState(false)

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
            let tacticKey = "map_nuke_" + chosenSite + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join("")) + uuid.v4()

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
                    navigation.navigate('nuke', {'paramPropKey': 'paramPropValue'})
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
            <ImageBackground source={nukeLayout} style={{marginBottom: 20, width: 360, height: 272}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <SingleGrenade mainStyle={styles.smokeHeaven} grenadePosition={heavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="heavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideHeaven} grenadePosition={outsideHeavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideHeavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeLocker} grenadePosition={lockerSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setLockerSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="lockerSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeVent} grenadePosition={ventSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setVentSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ventSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMain} grenadePosition={mainSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMainSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="mainSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMainOutside} grenadePosition={outsideMainSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideMainSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideMainSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeSecretOutside} grenadePosition={outsideSecretSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideSecretSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideSecretSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeGarage} grenadePosition={garageSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGarageSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="garageSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideRed} grenadePosition={outsideRedSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideRedSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideRedSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideRedSecret} grenadePosition={outsideRedSecretSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideRedSecretSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideRedSecretSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeUnderHeaven} grenadePosition={underHeavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setUnderHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underHeavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBAquarium} grenadePosition={bAquariumSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBAquariumSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAquariumSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBDoubleDoors} grenadePosition={bDoubleDoorsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBDoubleDoorsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bDoubleDoorsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSingleDoor} grenadePosition={bSingleDoorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSingleDoorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSingleDoorSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeUnderSilo} grenadePosition={underSiloSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setUnderSiloSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underSiloSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideRedCross} grenadePosition={outsideRedCrossSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideRedCrossSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideRedCrossSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashOutside} grenadePosition={outsideFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setOutsideFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideFlash"/>

                        <SingleGrenade mainStyle={styles.flashASite} grenadePosition={aSiteFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setASiteFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteFlash"/>

                        <SingleGrenade mainStyle={styles.flashRamp} grenadePosition={rampFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRampFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampFlash"/>

                        <SingleGrenade mainStyle={styles.flashMain} grenadePosition={mainFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setMainFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="mainFlash"/>

                        <SingleGrenade mainStyle={styles.flashHut} grenadePosition={hutFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setHutFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="hutFlash"/>

                        <SingleGrenade mainStyle={styles.flashUnderSilo} grenadePosition={underSiloFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setUnderSiloFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underSiloFlash"/>

                        <SingleGrenade mainStyle={styles.flashGarage} grenadePosition={garageFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setGarageFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="garageFlash"/>

                        <SingleGrenade mainStyle={styles.flashSecret} grenadePosition={secretFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setSecretFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="secretFlash"/>

                        <SingleGrenade mainStyle={styles.flashLobby} grenadePosition={lobbyFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setLobbyFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="lobbyFlash"/>

                        <SingleGrenade mainStyle={styles.flashRadio} grenadePosition={radioFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRadioFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="radioFlash"/>

                        <SingleGrenade mainStyle={styles.flashRampEntrance} grenadePosition={rampEntranceFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setRampEntranceFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampEntranceFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovHutRoof} grenadePosition={hutRoofMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHutRoofMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="hutRoofMolotov"/>

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

                        <SingleGrenade mainStyle={styles.molotovCTVent} grenadePosition={ctVentMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCtVentMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctVentMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRed} grenadePosition={redMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRedMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="redMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSecret} grenadePosition={secretMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSecretMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="secretMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRampBox} grenadePosition={rampBoxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRampBoxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampBoxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovDark} grenadePosition={darkMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setDarkMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="darkMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBSite} grenadePosition={bSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBSiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSqueaky} grenadePosition={squeakyMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSqueakyMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="squeakyMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRampEntrance} grenadePosition={rampEntranceMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRampEntranceMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampEntranceMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovUnderSilo} grenadePosition={underSiloMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setUnderSiloMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underSiloMolotov"/>
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
                                   color="#A49500" positions={nukePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={nukePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={nukePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={nukePositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={nukePositions}/>
                </View>
                <TouchableOpacity
                    style={styles.addTacticButton}
                    onPress={() => saveTactic()}>
                    <Text style={{
                        color: "#FFF", textAlign: "center", fontSize: 20,
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
    smokeHeaven: {
        position: 'absolute',
        top: 156,
        left: 212,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideHeaven: {
        position: 'absolute',
        top: 161,
        left: 225,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeLocker: {
        position: 'absolute',
        top: 177,
        left: 219,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeVent: {
        position: 'absolute',
        top: 203,
        left: 182,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeMain: {
        position: 'absolute',
        top: 213,
        left: 193,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeMainOutside: {
        position: 'absolute',
        top: 226,
        left: 208,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeSecretOutside: {
        position: 'absolute',
        top: 234,
        left: 220,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeGarage: {
        position: 'absolute',
        top: 232,
        left: 236,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideRed: {
        position: 'absolute',
        top: 246,
        left: 204,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideRedSecret: {
        position: 'absolute',
        top: 245,
        left: 216,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeUnderHeaven: {
        position: 'absolute',
        top: 132,
        left: 213,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBAquarium: {
        position: 'absolute',
        top: 50,
        left: 77,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBDoubleDoors: {
        position: 'absolute',
        top: 74,
        left: 77,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeBSingleDoor: {
        position: 'absolute',
        top: 92,
        left: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeUnderSilo: {
        position: 'absolute',
        top: 245,
        left: 166,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    smokeOutsideRedCross: {
        position: 'absolute',
        top: 242,
        left: 180,
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashOutside: {
        position: 'absolute',
        top: 235,
        left: 195,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 180,
        left: 195,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashRamp: {
        position: 'absolute',
        top: 133,
        left: 190,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashMain: {
        position: 'absolute',
        top: 213,
        left: 193,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashHut: {
        position: 'absolute',
        top: 188,
        left: 179,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashUnderSilo: {
        position: 'absolute',
        top: 245,
        left: 166,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashGarage: {
        position: 'absolute',
        top: 231,
        left: 248,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashSecret: {
        position: 'absolute',
        top: 253,
        left: 229,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashLobby: {
        position: 'absolute',
        top: 178,
        left: 167,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashRadio: {
        position: 'absolute',
        top: 160,
        left: 158,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    flashRampEntrance: {
        position: 'absolute',
        top: 135,
        left: 169,
        backgroundColor: 'rgba(253, 255, 242,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovHutRoof: {
        position: 'absolute',
        top: 188,
        left: 179,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovASite: {
        position: 'absolute',
        top: 162,
        left: 195,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovHeaven: {
        position: 'absolute',
        top: 156,
        left: 218,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovCTVent: {
        position: 'absolute',
        top: 207,
        left: 205,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovRed: {
        position: 'absolute',
        top: 245,
        left: 200,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovSecret: {
        position: 'absolute',
        top: 257,
        left: 228,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovRampBox: {
        position: 'absolute',
        top: 92,
        left: 189,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovDark: {
        position: 'absolute',
        top: 44,
        left: 67,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovBSite: {
        position: 'absolute',
        top: 90,
        left: 57,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovSqueaky: {
        position: 'absolute',
        top: 203,
        left: 181,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovRampEntrance: {
        position: 'absolute',
        top: 135,
        left: 169,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
        borderRadius: 100
    },
    molotovUnderSilo: {
        position: 'absolute',
        top: 245,
        left: 166,
        backgroundColor: 'rgba(255, 236, 236,0.5)',
        width: 14,
        height: 14,
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