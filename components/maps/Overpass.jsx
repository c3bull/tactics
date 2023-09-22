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
import OverpassTactic from "../mapTactics/OverpassTactic";
import overpassBg from "../../assets/images/maps/overpass.png";
import {LinearGradient} from "expo-linear-gradient";
import {overpassLogo} from "../../assets/images/mapLogos/mapLogos";

const Overpass = ({route, navigation}) => {
    const [allOverpassTactics, setAllOverpassTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [noTactics, setNoTactics] = useState(false);
    const [noTacticsSpinner, setNoTacticsSpinner] = useState(true);
    const getAllTactics = async () => {
        setAllOverpassTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_overpass_")) {
                setAllOverpassTactics(prevState => [...prevState, keys[i]])
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
                <ImageBackground source={overpassBg} resizeMode="cover" style={styles.imgBackground}>
                    <LinearGradient
                        colors={["#0F1114", "#000"]}
                        start={[-1, 1]}
                        end={[-1, 0.1]}
                        style={styles.linearGradient}
                    >
                        <Image source={overpassLogo} style={styles.tacticImage}/>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {allOverpassTactics.length > 0 ?
                allOverpassTactics.map((tactic, key) => (
                        <View key={key}>
                            <OverpassTactic tactic={tactic} refresh={setRefresh}/>
                        </View>
                    )
                )
                :
                <View>
                    <Text style={styles.hidden}>{setTimeout(() => setNoTactics(true), 1000)}</Text>
                    <Text style={styles.hidden}>  {setTimeout(() => setNoTacticsSpinner(false), 1000)}</Text>
                    {noTactics && (
                        <View style={styles.noTactics}>
                            <Text style={{color: "#FFF", fontSize: 22, textTransform: 'uppercase', fontWeight: '500'}}>
                                No Tactics yet :(</Text>
                            <TouchableOpacity style={styles.singleTactic} onPress={() => {
                                navigation.navigate('add-tactic')
                            }}>
                                <LinearGradient
                                    colors={["#00A4A4", "#0F1114"]}
                                    start={[-1, 1]}
                                    end={[-1, 0.3]}
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
    singleTactic: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: '80%',
        height: 50,
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
        fontWeight: '500',
        fontSize: 20,
    },
});

export default Overpass