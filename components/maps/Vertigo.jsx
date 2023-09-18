import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import vertigoBg from "../../assets/images/maps/vertigo.png";
import {LinearGradient} from "expo-linear-gradient";
import {vertigoLogo} from "../../assets/images/mapLogos/mapLogos";
import VertigoTactic from "../mapTactics/VertigoTactic";

const Vertigo = ({route}) => {
    const [allVertigoTactics, setAllVertigoTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const getAllTactics = async () => {
        setAllVertigoTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_vertigo_")) {
                setAllVertigoTactics(prevState => [...prevState, keys[i]])
            }
        }
        console.log('amt ', allVertigoTactics.length)
        console.log('amtx ', allVertigoTactics)
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
                <ImageBackground source={vertigoBg} resizeMode="cover" style={styles.imgBackground}>
                    <LinearGradient
                        colors={["#0F1114", "#000"]}
                        start={[-1, 1]}
                        end={[-1, 0.1]}
                        style={styles.linearGradient}
                    >
                        <Image source={vertigoLogo} style={styles.tacticImage}/>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {allVertigoTactics.length > 0 ?
                allVertigoTactics.map((tactic, key) => (
                        // console.log('tak ', tactic)
                        <View key={key}>
                            <VertigoTactic tactic={tactic} refresh={setRefresh}/>
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

export default Vertigo