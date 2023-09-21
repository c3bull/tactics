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

export default function NukeLayout() {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
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

    const [outsideFlash, setOutsideFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [rampFlash, setRampFlash] = useState(false)
    const [mainFlash, setMainFlash] = useState(false)

    const [hutRoofMolotov, setHutRoofMolotov] = useState(false)
    const [aSiteMolotov, setASiteMolotov] = useState(false)
    const [heavenMolotov, setHeavenMolotov] = useState(false)
    const [ctVentMolotov, setCtVentMolotov] = useState(false)
    const [redMolotov, setRedMolotov] = useState(false)
    const [secretMolotov, setSecretMolotov] = useState(false)
    const [rampBoxMolotov, setRampBoxMolotov] = useState(false)
    const [darkMolotov, setDarkMolotov] = useState(false)
    const [bSiteMolotov, setBSiteMolotov] = useState(false)

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
            let tacticKey = "map_nuke_" + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join(""))
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
                        console.log(value)
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
                        console.log(value)
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
                        // borderRadius: 10,
                        borderColor: "#FFF",
                        borderWidth: 2
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114BB", borderWidth: 1, borderColor: "#0F1114" }}
                />
            </View>
            <ImageBackground source={nukeLayout} style={{marginBottom: 20, width: 360, height: 272}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
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

                        <SingleGrenade mainStyle={styles.smokeOutsideHeaven} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={outsideHeavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideHeavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeLocker} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={lockerSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setLockerSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="lockerSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeVent} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={ventSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setVentSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ventSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMain} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={mainSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMainSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="mainSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMainOutside} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={outsideMainSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideMainSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideMainSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeSecretOutside} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={outsideSecretSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideSecretSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideSecretSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeGarage} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={garageSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGarageSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="garageSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideRed} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={outsideRedSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideRedSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideRedSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeOutsideRedSecret} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={outsideRedSecretSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setOutsideRedSecretSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideRedSecretSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeUnderHeaven} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={underHeavenSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setUnderHeavenSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="underHeavenSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBAquarium} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bAquariumSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBAquariumSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bAquariumSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBDoubleDoors} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bDoubleDoorsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBDoubleDoorsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bDoubleDoorsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSingleDoor} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bSingleDoorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSingleDoorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSingleDoorSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashOutside} additionalStyle={styles.selectedFlash}
                                       grenadePosition={outsideFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setOutsideFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="outsideFlash"/>

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

                        <SingleGrenade mainStyle={styles.flashMain} additionalStyle={styles.selectedFlash}
                                       grenadePosition={mainFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setMainFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="mainFlash"/>
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <SingleGrenade mainStyle={styles.molotovHutRoof} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={hutRoofMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setHutRoofMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="hutRoofMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovASite} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={aSiteMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setASiteMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aSiteMolotov"/>

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

                        <SingleGrenade mainStyle={styles.molotovCTVent} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={ctVentMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setCtVentMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="ctVentMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRed} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={redMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRedMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="redMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovSecret} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={secretMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setSecretMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="secretMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRampBox} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={rampBoxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRampBoxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="rampBoxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovDark} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={darkMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setDarkMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="darkMolotov"/>

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
});