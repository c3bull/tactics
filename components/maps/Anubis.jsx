import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import MirageTactic from "../mapTactics/MirageTactic";
import anubisBg from "../../assets/images/maps/anubis.png";
import {LinearGradient} from "expo-linear-gradient";
import {anubisLogo} from "../../assets/images/mapLogos/mapLogos";
import AnubisTactic from "../mapTactics/AnubisTactic";

const Anubis = ({route}) => {
    const [allAnubisTactics, setAllAnubisTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const getAllTactics = async () => {
        setAllAnubisTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_anubis_")) {
                setAllAnubisTactics(prevState => [...prevState, keys[i]])
            }
        }
        console.log('amt ', allAnubisTactics.length)
        console.log('amtx ', allAnubisTactics)
    }


    useEffect(() => {
        getAllTactics()
    }, [route, refresh])


    // useEffect(() => {
    //     // do something
    //     console.log("rut dion")
    // }, [route]);


    return (
        <ScrollView style={{backgroundColor: "#0F1114", flex: 1, marginBottom: 45}}
                    contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <ImageBackground source={anubisBg} resizeMode="cover" style={styles.imgBackground}>
                    <LinearGradient
                        colors={["#0F1114", "#000"]}
                        start={[-1, 1]}
                        end={[-1, 0.1]}
                        style={styles.linearGradient}
                    >
                        <Image source={anubisLogo} style={styles.tacticImage}/>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {allAnubisTactics.length > 0 ?
                allAnubisTactics.map((tactic, key) => (
                        // console.log('tak ', tactic)
                        <View key={key}>
                            <AnubisTactic tactic={tactic} refresh={setRefresh}/>
                        </View>
                    )
                )
                : <Text style={{color: "#FFF"}}>Refresh</Text>}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    contentContainer: {
        // padding: 10,
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
});

export default Anubis