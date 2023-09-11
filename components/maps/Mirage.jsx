import {ScrollView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import MirageTactic from "../mapTactics/MirageTactic";

const Mirage = ({route}) => {
    const [allMirageTactics, setAllMirageTactics] = useState([])
    const [refresh, setRefresh] = useState(false)
    const getAllTactics = async () => {
        setAllMirageTactics([])
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].includes("map_mirage_")) {
                setAllMirageTactics(prevState => [...prevState, keys[i]])
            }
        }
        console.log('amt ', allMirageTactics.length)
        console.log('amtx ', allMirageTactics)
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
            {allMirageTactics.length > 0 ?
                allMirageTactics.map((tactic, key) => (
                        // console.log('tak ', tactic)
                        <View key={key}>
                            <MirageTactic tactic={tactic} refresh={setRefresh}/>
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
        alignItems: 'center'
    }
});

export default Mirage