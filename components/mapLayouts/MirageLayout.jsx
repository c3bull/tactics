import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React, {useState} from "react";
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import smokeImage from "../../assets/images/smokeImg.png"

export default function MirageLayout() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [ctSmoke, setCtSmoke] = useState(false)
    const [aSiteSmoke, setASiteSmoke] = useState(false)
    const [jungleSmoke, setJungleSmoke] = useState(false)
    const [stairsSmoke, setStairsSmoke] = useState(false)
    const [connectorUpSmoke, setConnectorUpSmoke] = useState(false)
    const [jungleDeepSmoke, setJungleDeepSmoke] = useState(false)
    const [connectorDownSmoke, setConnectorDownSmoke] = useState(false)
    const [windowSmoke, setWindowSmoke] = useState(false)
    const [catwalkSmoke, setCatwalkSmoke] = useState(false)
    const [exitSmoke, setExitSmoke] = useState(false)
    const [bWindowSmoke, setBWindowSmoke] = useState(false)
    const [shortLeftSmoke, setShortLeftSmoke] = useState(false)
    const [shortRightSmoke, setShortRightSmoke] = useState(false)
    const [smokeAmount, setSmokeAmount] = useState(0)
    return (
        <View>
            <View style={styles.grenades}>
                <Text style={{color: "#fff", fontSize: 30}}>{smokeAmount}/5</Text>
                <Image alt="smoke" source={smokeImage} style={{resizeMode: 'contain', height: 25, width: 30}}/>
            </View>
            <ImageBackground source={mirageLayout} style={{flex: 1, width: width, height: height - 450}}>
                <TouchableOpacity style={[styles.smokeCT, ctSmoke && styles.selected]}
                                  onPress={ctSmoke ? () => {
                                      setCtSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setCtSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeASite, aSiteSmoke && styles.selected]}
                                  onPress={aSiteSmoke ? () => {
                                      setASiteSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                      smokeAmount < 5 && setASiteSmoke(true);
                                  }}/>
                <TouchableOpacity style={[styles.smokeJungle, jungleSmoke && styles.selected]}
                                  onPress={jungleSmoke ? () => {
                                      setJungleSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setJungleSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeStairs, stairsSmoke && styles.selected]}
                                  onPress={stairsSmoke ? () => {
                                      setStairsSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setStairsSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeConnectorUp, connectorUpSmoke && styles.selected]}
                                  onPress={connectorUpSmoke ? () => {
                                      setConnectorUpSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setConnectorUpSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeJungleDeep, jungleDeepSmoke && styles.selected]}
                                  onPress={jungleDeepSmoke ? () => {
                                      setJungleDeepSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setJungleDeepSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeConnectorDown, connectorDownSmoke && styles.selected]}
                                  onPress={connectorDownSmoke ? () => {
                                      setConnectorDownSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setConnectorDownSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeWindow, windowSmoke && styles.selected]}
                                  onPress={windowSmoke ? () => {
                                      setWindowSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setWindowSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeCatwalk, catwalkSmoke && styles.selected]}
                                  onPress={catwalkSmoke ? () => {
                                      setCatwalkSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setCatwalkSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeExit, exitSmoke && styles.selected]}
                                  onPress={exitSmoke ? () => {
                                      setExitSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setExitSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeBWindow, bWindowSmoke && styles.selected]}
                                  onPress={bWindowSmoke ? () => {
                                      setBWindowSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setBWindowSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeShortLeft, shortLeftSmoke && styles.selected]}
                                  onPress={shortLeftSmoke ? () => {
                                      setShortLeftSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setShortLeftSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeShortRight, shortRightSmoke && styles.selected]}
                                  onPress={shortRightSmoke ? () => {
                                      setShortRightSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setShortRightSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
            </ImageBackground>
            <View style={{backgroundColor: "#01015f", flex: 1,  alignItems: 'center', marginBottom: 165,}}>
                <Text style={{color: "#FFF"}}>Tactic Name:</Text>
                <Text style={{color: "#FFF"}}>Tactic Description:</Text>
                <Text style={{color: "#FFF"}}>Tasks:</Text>
                <Text style={{color: "#FFF"}}>Player 1:</Text>
                <Text style={{color: "#FFF"}}>Player 2:</Text>
                <Text style={{color: "#FFF"}}>Player 3:</Text>
                <Text style={{color: "#FFF"}}>Player 4:</Text>
                <Text style={{color: "#FFF"}}>Player 5:</Text>
                <TouchableOpacity style={{backgroundColor: "#00A225", width: width-50, padding: 15, borderRadius: 10}}><Text style={{color: "#FFF", textAlign: "center", fontSize: 22}}>Add Tactic!</Text></TouchableOpacity>
            </View>
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
        marginBottom: 20,
    },
    selected: {
        backgroundColor: "#00ff00",
    },
    smokeCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeConnectorUp: {
        position: 'absolute',
        top: 155,
        left: 167,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeJungleDeep: {
        position: 'absolute',
        top: 170,
        left: 145,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortLeft: {
        position: 'absolute',
        top: 45,
        left: 105,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeShortRight: {
        position: 'absolute',
        top: 25,
        left: 105,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeExit: {
        position: 'absolute',
        top: 80,
        left: 40,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeWindow: {
        position: 'absolute',
        top: 109,
        left: 127,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeBWindow: {
        position: 'absolute',
        top: 80,
        left: 67,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
});