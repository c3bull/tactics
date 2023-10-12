import {
    ActivityIndicator,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import infernoBg from "../../assets/images/maps/inferno.png";
import {LinearGradient} from "expo-linear-gradient";
import {infernoLogo} from "../../assets/images/mapLogos/mapLogos";
import InfernoTactic from "../mapTactics/InfernoTactic";
import tSide from "../../assets/images/tside.webp";
import ctSide from "../../assets/images/ctside.webp";

const Inferno = ({route, navigation}) => {
    const [allInfernoTactics, setAllInfernoTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [noTactics, setNoTactics] = useState(false);
    const [noTacticsSpinner, setNoTacticsSpinner] = useState(true);
    const [showTSiteTactics, setShowTSiteTactics] = useState(true);
    const [showCTSiteTactics, setShowCTSiteTactics] = useState(true);

    const getAllTactics = async () => {
        setAllInfernoTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_inferno_")) {
                setAllInfernoTactics(prevState => [...prevState, keys[i]])
            }
        }
    }


    useEffect(() => {
        getAllTactics()
    }, [route, refresh])


    return (
        <ScrollView style={{backgroundColor: "#0F1114", flex: 1, marginBottom: 45}}
                    contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <ImageBackground source={infernoBg} resizeMode="cover" style={styles.imgBackground}>
                    <LinearGradient
                        colors={["#0F1114", "#000"]}
                        start={[-1, 1]}
                        end={[-1, 0.1]}
                        style={styles.linearGradient}
                    >
                        <Image source={infernoLogo} style={styles.tacticImage}/>
                    </LinearGradient>
                </ImageBackground>
            </View>
            {allInfernoTactics.length > 0 ?
                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <View style={{display: "flex", flexDirection: "row", gap: 12, paddingVertical: 10}}>
                        <TouchableOpacity style={[styles.tacticSiteImage, showTSiteTactics && styles.selectedTactic]}
                                          onPress={() => setShowTSiteTactics(prevState => !prevState)}>
                            <ImageBackground source={tSide} resizeMode="contain" style={{
                                width: 50,
                                height: 50,
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tacticSiteImage, showCTSiteTactics && styles.selectedTactic]}
                                          onPress={() => setShowCTSiteTactics(prevState => !prevState)}>
                            <ImageBackground source={ctSide} resizeMode="contain" style={{
                                width: 50,
                                height: 50,
                            }}/>
                        </TouchableOpacity>
                    </View>
                    {allInfernoTactics.map((tactic, key) => (
                            tactic.includes("attacking_site_tactic_") ?
                                <View key={key}>
                                    {showTSiteTactics &&
                                        <InfernoTactic tactic={tactic} refresh={setRefresh} tacticSite="tSite"/>}
                                </View> :
                                <View key={key}>
                                    {showCTSiteTactics &&
                                        <InfernoTactic tactic={tactic} refresh={setRefresh} tacticSite="ctSite"/>}
                                </View>
                        )
                    )}
                </View>

                :
                <View style={{paddingTop: 25, paddingHorizontal: 15, width: '100%'}}>
                    <Text style={styles.hidden}>{setTimeout(() => setNoTactics(true), 1000)}</Text>
                    <Text style={styles.hidden}>  {setTimeout(() => setNoTacticsSpinner(false), 1000)}</Text>
                    {noTactics && (
                        <View style={styles.noTactics}>
                            <Text style={{
                                color: "#FFF",
                                fontSize: 22,
                                textTransform: 'uppercase',
                                fontFamily: "PoppinsRegular",
                                textAlign: "center"
                            }}>
                                You don't have any inferno tactics yet</Text>
                            <TouchableOpacity style={styles.addTacticButton} onPress={() => {
                                navigation.navigate('add-tactic')
                            }}>
                                <LinearGradient
                                    colors={["#00A4A4", "#0F1114"]}
                                    start={[-1, 1]}
                                    end={[-1, 0]}
                                    style={styles.linearGradientButtons}
                                >
                                    <View style={{display: "flex", flexDirection: "row", height: '100%'}}>
                                        <Text style={styles.text}>Add Tactic!</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}
                    {noTacticsSpinner && (
                        <ActivityIndicator size="large" color="#00ffff"/>
                    )}

                </View>
            }
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    contentContainer: {
        display: "flex",
        alignItems: 'center',
    },
    header: {
        height: 300,
        overflow: "hidden",
        display: "flex",
        width: '100%',
        marginBottom: 2,
    },
    selectedTactic: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 100,
        padding: 2,
    },
    tacticSiteImage: {
        borderWidth: 1,
        borderColor: "#0F1114",
        borderRadius: 100,
        padding: 2,
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tacticImage: {
        height: '50%',
        resizeMode: "contain",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    },
    hidden: {
        display: "none"
    },
    addTactic: {
        height: 300,
        overflow: "hidden",
        display: "flex",
    },
    addTacticButton: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    noTactics: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        width: '100%',
        height: '100%',
        textAlignVertical: "center",
        textTransform: "uppercase",
        // fontWeight: '500',
        paddingTop: 3,
        fontFamily: "PoppinsMedium",
        fontSize: 26,
    },
});

export default Inferno