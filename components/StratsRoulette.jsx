import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {maps} from "../constants/maps";
import {SplashScreen, useRouter} from "expo-router";
import dot from "../assets/images/dot.png"
import ctSide from "../assets/images/ctside.webp";
import tSide from "../assets/images/tside.webp";
import {useCallback, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {tSideRoulette, ctSideRoulette} from "./common/rouletteStrats";


const height = Dimensions.get('window').height;

const StratsRoulette = ({navigation}) => {
    console.log(height)
    const router = useRouter()
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * tSideRoulette.length))
    const [ctTactic, setCtTactic] = useState(false)
    const [tTactic, setTTactic] = useState(true)
    console.log(Math.floor(Math.random() * tSideRoulette.length))
    return (
        <ScrollView style={{backgroundColor: "#0F1114"}} contentContainerStyle={styles.contentContainer}>
            <ImageBackground source={dot} imageStyle={{resizeMode: 'repeat', opacity: 0.2}}>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity style={styles.singleButton} onPress={() => {
                        setRandomNumber(Math.floor(Math.random() * ctSideRoulette.length))
                        setCtTactic(true)
                        setTTactic(false)
                        // navigation.navigate(href)
                    }}>
                        <Image source={ctSide} style={styles.buttonImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleButton} onPress={() => {
                        setRandomNumber(Math.floor(Math.random() * tSideRoulette.length))
                        setTTactic(true)
                        setCtTactic(false)
                        // navigation.navigate(href)
                    }}>
                        <Image source={tSide} style={styles.buttonImage}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tacticWrapper}>
                    <Text style={styles.randomTactic}>
                        {tTactic && tSideRoulette[randomNumber].tacticDescription}
                        {ctTactic && ctSideRoulette[randomNumber].tacticDescription}
                    </Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1,
        minHeight: height
    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    singleButton: {
        marginTop: 20,
    },
    buttonImage: {
        width: 120,
        height: 120,
        display: "flex",
        resizeMode: "contain"
    },
    randomTactic: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center",
    },
    tacticWrapper: {
        color: "#fff",
        paddingTop: 30,
        // flex: 1,
        paddingHorizontal: 30,
        textAlign: "center",
        minHeight: height - 140
    },
});
export default StratsRoulette