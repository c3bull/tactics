import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import OverpassTactic from "../mapTactics/OverpassTactic";
import overpassBg from "../../assets/images/maps/overpass.png";
import {LinearGradient} from "expo-linear-gradient";
import {overpassLogo} from "../../assets/images/mapLogos/mapLogos";

const Overpass = ({route}) => {
    const [allOverpassTactics, setAllOverpassTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const getAllTactics = async () => {
        setAllOverpassTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_overpass_")) {
                setAllOverpassTactics(prevState => [...prevState, keys[i]])
            }
        }
        console.log('amt ', allOverpassTactics.length)
        console.log('amtx ', allOverpassTactics)
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
                        // console.log('tak ', tactic)
                        <View key={key}>
                            <OverpassTactic tactic={tactic} refresh={setRefresh}/>
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

export default Overpass