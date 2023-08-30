import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from "react-native";
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
    const [midCatwalkSmoke, setMidCatwalkSmoke] = useState(false)
    const [topMidSmoke, setTopMidSmoke] = useState(false)
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
            <ImageBackground source={mirageLayout} style={{flex: 1, width: 360, height: 272}}>
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
                <TouchableOpacity style={[styles.smokeMidCatwalk, midCatwalkSmoke && styles.selected]}
                                  onPress={midCatwalkSmoke ? () => {
                                      setMidCatwalkSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setMidCatwalkSmoke(true);
                                      smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                  }}/>
                <TouchableOpacity style={[styles.smokeTopMid, topMidSmoke && styles.selected]}
                                  onPress={topMidSmoke ? () => {
                                      setTopMidSmoke(false);
                                      setSmokeAmount(prevState => prevState - 1)
                                  } : () => {
                                      smokeAmount < 5 && setTopMidSmoke(true);
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
            <View style={{
                backgroundColor: "#272727",
                flex: 1,
                alignItems: 'center',
                marginBottom: 165,
                padding: 20,
                borderRadius: 10,
            }}>
                <TextInput
                    style={{color: "#FFF", fontWeight: "bold", minHeight: 40, width: '100%', maxWidth: '100%', padding: 5, display: "flex", justifyContent: 'center', alignItems: 'center'}}
                    multiline
                    // onChangeText={}
                    // value={number}
                    placeholder="Tactic Name..."
                    placeholderTextColor="#CCCCCC"
                    // keyboardType="numeric"
                />
                <TextInput
                    style={{color: "#FFF", minHeight: 40, width: '100%', maxWidth: '100%', padding: 5, display: "flex", justifyContent: 'center', alignItems: 'center'}}
                    multiline
                    // onChangeText={}
                    // value={number}
                    placeholder="Tactic Description..."
                    placeholderTextColor="#CCCCCC"
                    // keyboardType="numeric"
                />
                <View style={{
                    backgroundColor: "#3B3B3B",
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom: 20,
                    padding:10,
                }}>

                    <Text style={{color: "#FFF"}}>Tasks:</Text>
                    <TextInput
                        style={{color: "#FFF", backgroundColor: "#A49500", minHeight: 40, width: "100%", maxWidth: "100%", borderRadius: 5, marginVertical: 5, padding: 5}}
                        multiline
                        // onChangeText={}
                        // value={number}
                        placeholder="Player 1"
                        placeholderTextColor="#CCCCCC"
                        // keyboardType="numeric"
                    />
                    <TextInput
                        style={{color: "#FFF", backgroundColor: "#00567F", minHeight: 40, width: "100%", maxWidth: "100%", borderRadius: 5, marginVertical: 5, padding: 5}}
                        multiline
                        // onChangeText={}
                        // value={number}
                        placeholder="Player 2"
                        placeholderTextColor="#CCCCCC"
                        // keyboardType="numeric"
                    />
                    <TextInput
                        style={{color: "#FFF", backgroundColor: "#550083", minHeight: 40, width: "100%", maxWidth: "100%", borderRadius: 5, marginVertical: 5, padding: 5}}
                        multiline
                        // onChangeText={}
                        // value={number}
                        placeholder="Player 3"
                        placeholderTextColor="#CCCCCC"
                        // keyboardType="numeric"
                    />
                    <TextInput
                        style={{color: "#FFF", backgroundColor: "#0A8300", minHeight: 40, width: "100%", maxWidth: "100%", borderRadius: 5, marginVertical: 5, padding: 5}}
                        multiline
                        // onChangeText={}
                        // value={number}
                        placeholder="Player 4"
                        placeholderTextColor="#CCCCCC"
                        // keyboardType="numeric"
                    />
                    <TextInput
                        style={{color: "#FFF", backgroundColor: "#CD5A00", minHeight: 40, width: "100%", maxWidth: "100%", borderRadius: 5, marginVertical: 5, padding: 5}}
                        multiline
                        // onChangeText={}
                        // value={number}
                        placeholder="Player 5"
                        placeholderTextColor="#CCCCCC"
                        // keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity
                    style={{backgroundColor: "#00A225", width: '100%', padding: 15, borderRadius: 10}}><Text
                    style={{color: "#FFF", textAlign: "center", fontSize: 22}}>Add Tactic!</Text></TouchableOpacity>
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
    smokeTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: "#fff",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    smokeMidCatwalk: {
        position: 'absolute',
        top: 97,
        left: 165,
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