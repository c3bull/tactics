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
import infernoLayout from "../../assets/images/mapLayouts/infernoLayout.png";
import smokeImage from "../../assets/images/smokeWhite.png"
import flashImage from "../../assets/images/flashWhite.png"
import molotovImage from "../../assets/images/molotovWhite.png"
import {ButtonGroup} from "@rneui/themed";
import SingleGrenade from "../SingleGrenade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import {useNavigation} from '@react-navigation/native';
import AddPlayerTask from "../addPlayerTask";
import {infernoPositions} from "../common/positions";

export default function InfernoLayout() {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [bCTSmoke, setBCTSmoke] = useState(false)
    const [bSpoolsSmoke, setBSpoolsSmoke] = useState(false)
    const [bSiteSmoke, setBSiteSmoke] = useState(false)
    const [bCTDeepSmoke, setBCTDeepSmoke] = useState(false)
    const [topBananaSmoke, setTopBananaSmoke] = useState(false)
    const [topMidSmoke, setTopMidSmoke] = useState(false)
    const [midLongSmoke, setMidLongSmoke] = useState(false)
    const [midShortSmoke, setMidShortSmoke] = useState(false)
    const [connectorSmoke, setConnectorSmoke] = useState(false)
    const [farLongSmoke, setFarLongSmoke] = useState(false)
    const [librarySmoke, setLibrarySmoke] = useState(false)
    const [behindASiteSmoke, setBehindASiteSmoke] = useState(false)
    const [graveyardSmoke, setGraveyardSmoke] = useState(false)
    const [truckSmoke, setTruckSmoke] = useState(false)
    const [miniPitSmoke, setMiniPitSmoke] = useState(false)
    const [pitSmoke, setPitSmoke] = useState(false)

    const [bCTFlash, setBCTFlash] = useState(false)
    const [bEntranceFlash, setBEntranceFlash] = useState(false)
    const [topBananaFlash, setTopBananaFlash] = useState(false)
    const [bSiteFlash, setBSiteFlash] = useState(false)
    const [topMidFlash, setTopMidFlash] = useState(false)
    const [longFlash, setLongFlash] = useState(false)
    const [aAppsFlash, setAAppsFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)

    const [bCarMolotov, setBCarMolotov] = useState(false)
    const [bFirstBoxMolotov, setBFirstBoxMolotov] = useState(false)
    const [bSecondBoxMolotov, setBSecondBoxMolotov] = useState(false)
    const [bThirdBoxMolotov, setBThirdBoxMolotov] = useState(false)
    const [bDarkMolotov, setBDarkMolotov] = useState(false)
    const [bSpoolsMolotov, setBSpoolsMolotov] = useState(false)
    const [longMolotov, setLongMolotov] = useState(false)
    const [appsMolotov, setAppsMolotov] = useState(false)
    const [roofMolotov, setRoofMolotov] = useState(false)
    const [miniPitMolotov, setMiniPitMolotov] = useState(false)
    const [pitMolotov, setPitMolotov] = useState(false)

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
            let tacticKey = "map_inferno_" + tacticName.toLowerCase().split(" ").join("").concat(tacticDescription.toLowerCase().split(" ").join(""))
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
                    navigation.navigate('inferno', {'paramPropKey': 'paramPropValue'})
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
            <ImageBackground source={infernoLayout} style={{marginBottom: 20, width: 360, height: 320}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
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

                        <SingleGrenade mainStyle={styles.smokeBSpools} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bSpoolsSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSpoolsSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSpoolsSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBSite} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bSiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBSiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBCTDeep} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={bCTDeepSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBCTDeepSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCTDeepSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTopBanana} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={topBananaSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTopBananaSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topBananaSmoke"/>

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

                        <SingleGrenade mainStyle={styles.smokeMidLong} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={midLongSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidLongSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midLongSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMidShort} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={midShortSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMidShortSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="midShortSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeConnector} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={connectorSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setConnectorSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="connectorSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeFarLong} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={farLongSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setFarLongSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="farLongSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeLibrary} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={librarySmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setLibrarySmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="librarySmoke"/>

                        <SingleGrenade mainStyle={styles.smokeBehindASite} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={behindASiteSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setBehindASiteSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="behindASiteSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeGraveyard} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={graveyardSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setGraveyardSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="graveyardSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeTruck} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={truckSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setTruckSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="truckSmoke"/>

                        <SingleGrenade mainStyle={styles.smokeMiniPit} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={miniPitSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setMiniPitSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="miniPitSmoke"/>

                        <SingleGrenade mainStyle={styles.smokePit} additionalStyle={styles.selectedSmoke}
                                       grenadePosition={pitSmoke}
                                       grenadeAmountHook={setSmokeAmount} grenadePositionHook={setPitSmoke}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pitSmoke"/>
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <SingleGrenade mainStyle={styles.flashBCT} additionalStyle={styles.selectedFlash}
                                       grenadePosition={bCTFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBCTFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCTFlash"/>

                        <SingleGrenade mainStyle={styles.flashBEntrance} additionalStyle={styles.selectedFlash}
                                       grenadePosition={bEntranceFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setBEntranceFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bEntranceFlash"/>

                        <SingleGrenade mainStyle={styles.flashTopBanana} additionalStyle={styles.selectedFlash}
                                       grenadePosition={topBananaFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setTopBananaFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topBananaFlash"/>

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

                        <SingleGrenade mainStyle={styles.flashTopMid} additionalStyle={styles.selectedFlash}
                                       grenadePosition={topMidFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setTopMidFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setTopMidFlash}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="topMidFlash"/>

                        <SingleGrenade mainStyle={styles.flashLong} additionalStyle={styles.selectedFlash}
                                       grenadePosition={longFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setLongFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="longFlash"/>

                        <SingleGrenade mainStyle={styles.flashAApps} additionalStyle={styles.selectedFlash}
                                       grenadePosition={aAppsFlash}
                                       grenadeAmountHook={setFlashAmount} grenadePositionHook={setAAppsFlash}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="aAppsFlash"/>

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
                        <SingleGrenade mainStyle={styles.molotovBCar} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bCarMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBCarMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bCarMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBFirstBox} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bFirstBoxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBFirstBoxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bFirstBoxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBSecondBox} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bSecondBoxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBSecondBoxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSecondBoxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBThirdBox} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bThirdBoxMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBThirdBoxMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bThirdBoxMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBDark} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bDarkMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBDarkMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bDarkMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovBSpools} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={bSpoolsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setBSpoolsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="bSpoolsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovLong} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={longMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setLongMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="longMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovApps} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={appsMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setAppsMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="appsMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovRoof} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={roofMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setRoofMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="roofMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovMiniPit} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={miniPitMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setMiniPitMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="miniPitMolotov"/>

                        <SingleGrenade mainStyle={styles.molotovPit} additionalStyle={styles.selectedMolotov}
                                       grenadePosition={pitMolotov}
                                       grenadeAmountHook={setMolotovAmount} grenadePositionHook={setPitMolotov}
                                       yellowUtility={yellowUtility} yellowUtilityHook={setYellowUtility}
                                       blueUtility={blueUtility} blueUtilityHook={setBlueUtility}
                                       purpleUtility={purpleUtility} purpleUtilityHook={setPurpleUtility}
                                       greenUtility={greenUtility} greenUtilityHook={setGreenUtility}
                                       orangeUtility={orangeUtility} orangeUtilityHook={setOrangeUtility}
                                       selectedIndex={selectedIndex}
                                       grenadeName="pitMolotov"/>
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
                                   color="#A49500" positions={infernoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerTwoTask} utility={blueUtility} placeholder="Player 2"
                                   color="#00567F" positions={infernoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerThreeTask} utility={purpleUtility} placeholder="Player 3"
                                   color="#550083" positions={infernoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFourTask} utility={greenUtility} placeholder="Player 4"
                                   color="#0A8300" positions={infernoPositions}/>
                    <AddPlayerTask setTaskHook={setPlayerFiveTask} utility={orangeUtility} placeholder="Player 5"
                                   color="#CD5A00" positions={infernoPositions}/>
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
    smokeBCT: {
        position: 'absolute',
        top: 58,
        left: 210,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSpools: {
        position: 'absolute',
        top: 25,
        left: 172,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBSite: {
        position: 'absolute',
        top: 60,
        left: 180,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBCTDeep: {
        position: 'absolute',
        top: 50,
        left: 245,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopBanana: {
        position: 'absolute',
        top: 107,
        left: 184,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTopMid: {
        position: 'absolute',
        top: 216,
        left: 224,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidLong: {
        position: 'absolute',
        top: 190,
        left: 240,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidShort: {
        position: 'absolute',
        top: 240,
        left: 240,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnector: {
        position: 'absolute',
        top: 155,
        left: 269,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeFarLong: {
        position: 'absolute',
        top: 173,
        left: 285,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeLibrary: {
        position: 'absolute',
        top: 170,
        left: 320,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBehindASite: {
        position: 'absolute',
        top: 193,
        left: 303,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeGraveyard: {
        position: 'absolute',
        top: 230,
        left: 303,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeTruck: {
        position: 'absolute',
        top: 258,
        left: 280,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMiniPit: {
        position: 'absolute',
        top: 258,
        left: 295,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokePit: {
        position: 'absolute',
        top: 258,
        left: 310,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBCT: {
        position: 'absolute',
        top: 61,
        left: 210,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBEntrance: {
        position: 'absolute',
        top: 80,
        left: 195,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopBanana: {
        position: 'absolute',
        top: 110,
        left: 155,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashBSite: {
        position: 'absolute',
        top: 66,
        left: 170,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashTopMid: {
        position: 'absolute',
        top: 215,
        left: 239,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashLong: {
        position: 'absolute',
        top: 175,
        left: 245,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashAApps: {
        position: 'absolute',
        top: 275,
        left: 230,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashASite: {
        position: 'absolute',
        top: 232,
        left: 279,
        backgroundColor: "#FDFFF2",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBCar: {
        position: 'absolute',
        top: 102,
        left: 172,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBFirstBox: {
        position: 'absolute',
        top: 70,
        left: 172,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSecondBox: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBThirdBox: {
        position: 'absolute',
        top: 62,
        left: 140,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBDark: {
        position: 'absolute',
        top: 27,
        left: 140,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovBSpools: {
        position: 'absolute',
        top: 25,
        left: 172,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovLong: {
        position: 'absolute',
        top: 172,
        left: 243,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovApps: {
        position: 'absolute',
        top: 253,
        left: 225,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovRoof: {
        position: 'absolute',
        top: 253,
        left: 244,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovMiniPit: {
        position: 'absolute',
        top: 273,
        left: 290,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovPit: {
        position: 'absolute',
        top: 263,
        left: 322,
        backgroundColor: "#FFECEC",
        width: 18,
        height: 18,
        borderRadius: 100
    },
});