import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from "react-native";
import React, {useState} from "react";
import mirageLayout from "../../assets/images/mapLayouts/mirageLayout.png";
import smokeImage from "../../assets/images/smokeImg.png"
import flashImage from "../../assets/images/flashImg.png"
import molotovImage from "../../assets/images/molotovImg.png"
import {ButtonGroup} from "@rneui/themed";

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

    const [ctFlash, setCtFlash] = useState(false)
    const [aSiteFlash, setASiteFlash] = useState(false)
    const [jungleFlash, setJungleFlash] = useState(false)
    const [stairsFlash, setStairsFlash] = useState(false)
    const [connectorDownFlash, setConnectorDownFlash] = useState(false)
    const [catwalkFlash, setCatwalkFlash] = useState(false)
    const [topMidFlash, setTopMidFlash] = useState(false)
    const [bSiteFlash, setBSiteFlash] = useState(false)

    const [underWoodMolotov, setUnderWoodMolotov] = useState(false)
    const [aBenchMolotov, setABenchMolotov] = useState(false)
    const [carMolotov, setCarMolotov] = useState(false)

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
    const [playerSelected, setPlayerSelected] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedGrenadeIndex, setSelectedGrenadeIndex] = useState(0);

    return (
        <View>
            <View style={styles.grenades}>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{smokeAmount}/5</Text>
                    <Image alt="smoke" source={smokeImage} style={{resizeMode: 'contain', height: 25, width: 30}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{flashAmount}/10</Text>
                    <Image alt="flash" source={flashImage} style={{resizeMode: 'contain', height: 35, width: 35}}/>
                </View>
                <View style={styles.singleGrenade}>
                    <Text style={{color: "#fff", fontSize: 30}}>{molotovAmount}/5</Text>
                    <Image alt="molotov" source={molotovImage} style={{resizeMode: 'contain', height: 35, width: 40}}/>
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
            <View style={{display: "flex", alignItems: "center"}}>
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
                        backgroundColor: "#272727",
                        borderRadius: 10,
                        borderColor: "#FFF",
                        borderWidth: 1
                    }}
                    buttonContainerStyle={{backgroundColor: "#0F1114"}}
                />
            </View>
            <ImageBackground source={mirageLayout} style={{flex: 1, width: 360, height: 272}}>
                {selectedGrenadeIndex === 0 && (
                    <View>
                        <TouchableOpacity style={[styles.smokeCT, ctSmoke && styles.selectedSmoke]}
                                          onPress={ctSmoke ? () => {
                                              setCtSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setCtSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeASite, aSiteSmoke && styles.selectedSmoke]}
                                          onPress={aSiteSmoke ? () => {
                                              setASiteSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                              smokeAmount < 5 && setASiteSmoke(true);
                                          }}/>
                        <TouchableOpacity style={[styles.smokeJungle, jungleSmoke && styles.selectedSmoke]}
                                          onPress={jungleSmoke ? () => {
                                              setJungleSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setJungleSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeStairs, stairsSmoke && styles.selectedSmoke]}
                                          onPress={stairsSmoke ? () => {
                                              setStairsSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setStairsSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeConnectorUp, connectorUpSmoke && styles.selectedSmoke]}
                                          onPress={connectorUpSmoke ? () => {
                                              setConnectorUpSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setConnectorUpSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeJungleDeep, jungleDeepSmoke && styles.selectedSmoke]}
                                          onPress={jungleDeepSmoke ? () => {
                                              setJungleDeepSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setJungleDeepSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity
                            style={[styles.smokeConnectorDown, connectorDownSmoke && styles.selectedSmoke]}
                            onPress={connectorDownSmoke ? () => {
                                setConnectorDownSmoke(false);
                                setSmokeAmount(prevState => prevState - 1)
                            } : () => {
                                smokeAmount < 5 && setConnectorDownSmoke(true);
                                smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                            }}/>
                        <TouchableOpacity style={[styles.smokeWindow, windowSmoke && styles.selectedSmoke]}
                                          onPress={windowSmoke ? () => {
                                              setWindowSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setWindowSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeCatwalk, catwalkSmoke && styles.selectedSmoke]}
                                          onPress={catwalkSmoke ? () => {
                                              setCatwalkSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setCatwalkSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeMidCatwalk, midCatwalkSmoke && styles.selectedSmoke]}
                                          onPress={midCatwalkSmoke ? () => {
                                              setMidCatwalkSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setMidCatwalkSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeTopMid, topMidSmoke && styles.selectedSmoke]}
                                          onPress={topMidSmoke ? () => {
                                              setTopMidSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setTopMidSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeExit, exitSmoke && styles.selectedSmoke]}
                                          onPress={exitSmoke ? () => {
                                              setExitSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setExitSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeBWindow, bWindowSmoke && styles.selectedSmoke]}
                                          onPress={bWindowSmoke ? () => {
                                              setBWindowSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setBWindowSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeShortLeft, shortLeftSmoke && styles.selectedSmoke]}
                                          onPress={shortLeftSmoke ? () => {
                                              setShortLeftSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setShortLeftSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.smokeShortRight, shortRightSmoke && styles.selectedSmoke]}
                                          onPress={shortRightSmoke ? () => {
                                              setShortRightSmoke(false);
                                              setSmokeAmount(prevState => prevState - 1)
                                          } : () => {
                                              smokeAmount < 5 && setShortRightSmoke(true);
                                              smokeAmount < 5 && setSmokeAmount(prevState => prevState + 1)
                                          }}
                        />
                    </View>)}
                {selectedGrenadeIndex === 1 && (
                    <View>
                        <TouchableOpacity style={[styles.flashCT, ctFlash && styles.selectedFlash]}
                                          onPress={ctFlash ? () => {
                                              setCtFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setCtFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.flashASite, aSiteFlash && styles.selectedFlash]}
                                          onPress={aSiteFlash ? () => {
                                              setASiteFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                              flashAmount < 10 && setASiteFlash(true);
                                          }}/>
                        <TouchableOpacity style={[styles.flashJungle, jungleFlash && styles.selectedFlash]}
                                          onPress={jungleFlash ? () => {
                                              setJungleFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setJungleFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.flashStairs, stairsFlash && styles.selectedFlash]}
                                          onPress={stairsFlash ? () => {
                                              setStairsFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setStairsFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity
                            style={[styles.flashConnectorDown, connectorDownFlash && styles.selectedFlash]}
                            onPress={connectorDownFlash ? () => {
                                setConnectorDownFlash(false);
                                setFlashAmount(prevState => prevState - 1)
                            } : () => {
                                flashAmount < 10 && setConnectorDownFlash(true);
                                flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                            }}/>
                        <TouchableOpacity style={[styles.flashCatwalk, catwalkFlash && styles.selectedFlash]}
                                          onPress={catwalkFlash ? () => {
                                              setCatwalkFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setCatwalkFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.flashTopMid, topMidFlash && styles.selectedFlash]}
                                          onPress={topMidFlash ? () => {
                                              setTopMidFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setTopMidFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.flashBSite, bSiteFlash && styles.selectedFlash]}
                                          onPress={bSiteFlash ? () => {
                                              setBSiteFlash(false);
                                              setFlashAmount(prevState => prevState - 1)
                                          } : () => {
                                              flashAmount < 10 && setBSiteFlash(true);
                                              flashAmount < 10 && setFlashAmount(prevState => prevState + 1)
                                          }}
                        />
                    </View>)}
                {selectedGrenadeIndex === 2 && (
                    <View>
                        <TouchableOpacity style={[styles.molotovUnderWood, underWoodMolotov && styles.selectedMolotov]}
                                          onPress={underWoodMolotov ? () => {
                                              setUnderWoodMolotov(false);
                                              setMolotovAmount(prevState => prevState - 1)
                                          } : () => {
                                              molotovAmount < 5 && setUnderWoodMolotov(true);
                                              molotovAmount < 5 && setMolotovAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.molotovABench, aBenchMolotov && styles.selectedMolotov]}
                                          onPress={aBenchMolotov ? () => {
                                              setABenchMolotov(false);
                                              setMolotovAmount(prevState => prevState - 1)
                                          } : () => {
                                              molotovAmount < 5 && setABenchMolotov(true);
                                              molotovAmount < 5 && setMolotovAmount(prevState => prevState + 1)
                                          }}/>
                        <TouchableOpacity style={[styles.molotovCar, carMolotov && styles.selectedMolotov]}
                                          onPress={carMolotov ? () => {
                                              setCarMolotov(false);
                                              setMolotovAmount(prevState => prevState - 1)
                                          } : () => {
                                              molotovAmount < 5 && setCarMolotov(true);
                                              molotovAmount < 5 && setMolotovAmount(prevState => prevState + 1)
                                          }}/>
                    </View>)}

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
                    style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minHeight: 40,
                        width: '100%',
                        maxWidth: '100%',
                        padding: 5,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
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
                        padding: 5,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    multiline
                    onChangeText={(e) => setTacticDescription(e)}
                    placeholder="Tactic Description..."
                    placeholderTextColor="#CCCCCC"
                />
                <View style={{
                    backgroundColor: "#3B3B3B",
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom: 20,
                    padding: 10,
                }}>

                    <Text style={{color: "#FFF"}}>Tasks:</Text>
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#A49500",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderRadius: 5,
                            marginVertical: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerOneTask(e)}
                        placeholder="Player 1"
                        placeholderTextColor="#CCCCCC"
                    />
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#00567F",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderRadius: 5,
                            marginVertical: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerTwoTask(e)}
                        placeholder="Player 2"
                        placeholderTextColor="#CCCCCC"
                    />
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#550083",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderRadius: 5,
                            marginVertical: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerThreeTask(e)}
                        placeholder="Player 3"
                        placeholderTextColor="#CCCCCC"
                    />
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#0A8300",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderRadius: 5,
                            marginVertical: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerFourTask(e)}
                        placeholder="Player 4"
                        placeholderTextColor="#CCCCCC"
                    />
                    <TextInput
                        style={{
                            color: "#FFF",
                            backgroundColor: "#CD5A00",
                            minHeight: 40,
                            width: "100%",
                            maxWidth: "100%",
                            borderRadius: 5,
                            marginVertical: 5,
                            padding: 5
                        }}
                        multiline
                        onChangeText={(e) => setPlayerFiveTask(e)}
                        placeholder="Player 5"
                        placeholderTextColor="#CCCCCC"
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
        marginBottom: 35,
        paddingLeft: 25,
        borderRadius: 10,
        gap: 25,
        backgroundColor: "#272727"
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
    flashASite: {
        position: 'absolute',
        top: 215,
        left: 184,
        backgroundColor: "#F6FFB8",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    molotovUnderWood: {
        position: 'absolute',
        top: 215,
        left: 220,
        backgroundColor: "#FFB3B3",
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
    molotovABench: {
        position: 'absolute',
        top: 200,
        left: 163,
        backgroundColor: "#FFB3B3",
        width: 18,
        height: 18,
        borderRadius: 100
    },
    flashJungle: {
        position: 'absolute',
        top: 180,
        left: 166,
        backgroundColor: "#F6FFB8",
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
    flashStairs: {
        position: 'absolute',
        top: 180,
        left: 184,
        backgroundColor: "#F6FFB8",
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
    flashConnectorDown: {
        position: 'absolute',
        top: 130,
        left: 165,
        backgroundColor: "#F6FFB8",
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
    flashCatwalk: {
        position: 'absolute',
        top: 70,
        left: 155,
        backgroundColor: "#F6FFB8",
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
    flashTopMid: {
        position: 'absolute',
        top: 95,
        left: 215,
        backgroundColor: "#F6FFB8",
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
    flashBSite: {
        position: 'absolute',
        top: 25,
        left: 80,
        backgroundColor: "#F6FFB8",
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
    molotovCar: {
        position: 'absolute',
        top: 2,
        left: 45,
        backgroundColor: "#FFB3B3",
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
    flashCT: {
        position: 'absolute',
        top: 245,
        left: 145,
        backgroundColor: "#F6FFB8",
        width: 18,
        height: 18,
        borderRadius: 100
    },
});