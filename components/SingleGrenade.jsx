import {TouchableOpacity, StyleSheet, ImageBackground, View} from "react-native";
import React from "react";
import smokeImage from "../assets/images/smoke.png"
import flashImage from "../assets/images/flash.png"
import molotovImage from "../assets/images/molotov.png"

export default function SingleGrenade({
                                          mainStyle,
                                          grenadeName,
                                          grenadePosition,
                                          grenadePositionHook,
                                          grenadeAmountHook,
                                          selectedIndex,
                                          yellowUtility,
                                          yellowUtilityHook,
                                          blueUtility,
                                          blueUtilityHook,
                                          purpleUtility,
                                          purpleUtilityHook,
                                          greenUtility,
                                          greenUtilityHook,
                                          orangeUtility,
                                          orangeUtilityHook
                                      }) {

    let _ = require('lodash');

    let yellowFlashes = [];
    let maxTwoFlashes = [];

    return (
        <TouchableOpacity style={[mainStyle]}
                          onPress={() => {
                              if (selectedIndex === 0) {
                                  if (!yellowUtility.toString().includes(grenadeName)) {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!yellowUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(yellowUtility, function (utility) {
                                                  return utility.toLowerCase().includes("smoke")
                                              });
                                              grenadePositionHook(true);
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < yellowUtility.length; i++) {
                                              if (yellowUtility[i].toLowerCase().includes("flash")) {
                                                  yellowFlashes.push(yellowUtility[i]);
                                              }
                                          }

                                          if (yellowFlashes.length < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              if (yellowFlashes[0] === yellowFlashes[1]) {
                                                  yellowUtilityHook(_.without(yellowUtility, yellowFlashes[0]));
                                                  yellowUtilityHook(prevState => [...prevState, yellowFlashes[0]])
                                                  yellowUtilityHook(prevState => [...prevState, grenadeName])

                                              } else {
                                                  yellowUtilityHook(_.without(yellowUtility, _.find(yellowUtility, function (firstFlash) {
                                                      return firstFlash.toLowerCase().includes("flash")
                                                  })));
                                                  yellowUtilityHook(prevState => [...prevState, grenadeName])
                                                  grenadePositionHook(true);
                                              }
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!yellowUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(yellowUtility, function (utility) {
                                                  return utility.toLowerCase().includes("molotov")
                                              });
                                              grenadePositionHook(true);
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  } else {
                                      if (!grenadeName.toLowerCase().includes("flash")) {
                                          grenadePositionHook(false);
                                          grenadeAmountHook(prevState => prevState - 1)
                                          selectedIndex === 0 && yellowUtilityHook(prevState => _.without(prevState, grenadeName))
                                      } else {
                                          for (let i = 0; i < yellowUtility.length; i++) {
                                              if (yellowUtility[i].toLowerCase().includes("flash")) {
                                                  maxTwoFlashes.push(yellowUtility[i]);
                                              }
                                          }
                                          if (maxTwoFlashes.length === 2) {
                                              if (maxTwoFlashes[0] === maxTwoFlashes[1]) {
                                                  grenadeAmountHook(prevState => prevState - 2)
                                                  selectedIndex === 0 && yellowUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                              } else {
                                                  selectedIndex === 0 && yellowUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                                  grenadeAmountHook(prevState => prevState - 1)
                                              }
                                          } else {
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 1) {
                                  if (!blueUtility.toString().includes(grenadeName)) {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!blueUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(blueUtility, function (utility) {
                                                  return utility.toLowerCase().includes("smoke")
                                              });
                                              grenadePositionHook(true);
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < blueUtility.length; i++) {
                                              if (blueUtility[i].toLowerCase().includes("flash")) {
                                                  yellowFlashes.push(blueUtility[i]);
                                              }
                                          }

                                          if (yellowFlashes.length < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              if (yellowFlashes[0] === yellowFlashes[1]) {
                                                  blueUtilityHook(_.without(blueUtility, yellowFlashes[0]));
                                                  blueUtilityHook(prevState => [...prevState, yellowFlashes[0]])
                                                  blueUtilityHook(prevState => [...prevState, grenadeName])

                                              } else {
                                                  blueUtilityHook(_.without(blueUtility, _.find(blueUtility, function (firstFlash) {
                                                      return firstFlash.toLowerCase().includes("flash")
                                                  })));
                                                  blueUtilityHook(prevState => [...prevState, grenadeName])
                                                  grenadePositionHook(true);
                                              }
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!blueUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(blueUtility, function (utility) {
                                                  return utility.toLowerCase().includes("molotov")
                                              });
                                              grenadePositionHook(true);
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  } else {
                                      if (!grenadeName.toLowerCase().includes("flash")) {
                                          grenadePositionHook(false);
                                          grenadeAmountHook(prevState => prevState - 1)
                                          selectedIndex === 1 && blueUtilityHook(prevState => _.without(prevState, grenadeName))
                                      } else {
                                          for (let i = 0; i < blueUtility.length; i++) {
                                              if (blueUtility[i].toLowerCase().includes("flash")) {
                                                  maxTwoFlashes.push(blueUtility[i]);
                                              }
                                          }
                                          if (maxTwoFlashes.length === 2) {
                                              if (maxTwoFlashes[0] === maxTwoFlashes[1]) {
                                                  grenadeAmountHook(prevState => prevState - 2)
                                                  selectedIndex === 1 && blueUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                              } else {
                                                  selectedIndex === 1 && blueUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                                  grenadeAmountHook(prevState => prevState - 1)
                                              }
                                          } else {
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 2) {
                                  if (!purpleUtility.toString().includes(grenadeName)) {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!purpleUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(purpleUtility, function (utility) {
                                                  return utility.toLowerCase().includes("smoke")
                                              });
                                              grenadePositionHook(true);
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < purpleUtility.length; i++) {
                                              if (purpleUtility[i].toLowerCase().includes("flash")) {
                                                  yellowFlashes.push(purpleUtility[i]);
                                              }
                                          }

                                          if (yellowFlashes.length < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              if (yellowFlashes[0] === yellowFlashes[1]) {
                                                  purpleUtilityHook(_.without(purpleUtility, yellowFlashes[0]));
                                                  purpleUtilityHook(prevState => [...prevState, yellowFlashes[0]])
                                                  purpleUtilityHook(prevState => [...prevState, grenadeName])

                                              } else {
                                                  purpleUtilityHook(_.without(purpleUtility, _.find(purpleUtility, function (firstFlash) {
                                                      return firstFlash.toLowerCase().includes("flash")
                                                  })));
                                                  purpleUtilityHook(prevState => [...prevState, grenadeName])
                                                  grenadePositionHook(true);
                                              }
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!purpleUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(purpleUtility, function (utility) {
                                                  return utility.toLowerCase().includes("molotov")
                                              });
                                              grenadePositionHook(true);
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  } else {
                                      if (!grenadeName.toLowerCase().includes("flash")) {
                                          grenadePositionHook(false);
                                          grenadeAmountHook(prevState => prevState - 1)
                                          selectedIndex === 2 && purpleUtilityHook(prevState => _.without(prevState, grenadeName))
                                      } else {
                                          for (let i = 0; i < purpleUtility.length; i++) {
                                              if (purpleUtility[i].toLowerCase().includes("flash")) {
                                                  maxTwoFlashes.push(purpleUtility[i]);
                                              }
                                          }
                                          if (maxTwoFlashes.length === 2) {
                                              if (maxTwoFlashes[0] === maxTwoFlashes[1]) {
                                                  grenadeAmountHook(prevState => prevState - 2)
                                                  selectedIndex === 2 && purpleUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                              } else {
                                                  selectedIndex === 2 && purpleUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                                  grenadeAmountHook(prevState => prevState - 1)
                                              }
                                          } else {
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 3) {
                                  if (!greenUtility.toString().includes(grenadeName)) {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!greenUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(greenUtility, function (utility) {
                                                  return utility.toLowerCase().includes("smoke")
                                              });
                                              grenadePositionHook(true);
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < greenUtility.length; i++) {
                                              if (greenUtility[i].toLowerCase().includes("flash")) {
                                                  yellowFlashes.push(greenUtility[i]);
                                              }
                                          }

                                          if (yellowFlashes.length < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              if (yellowFlashes[0] === yellowFlashes[1]) {
                                                  greenUtilityHook(_.without(greenUtility, yellowFlashes[0]));
                                                  greenUtilityHook(prevState => [...prevState, yellowFlashes[0]])
                                                  greenUtilityHook(prevState => [...prevState, grenadeName])

                                              } else {
                                                  greenUtilityHook(_.without(greenUtility, _.find(greenUtility, function (firstFlash) {
                                                      return firstFlash.toLowerCase().includes("flash")
                                                  })));
                                                  greenUtilityHook(prevState => [...prevState, grenadeName])
                                                  grenadePositionHook(true);
                                              }
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!greenUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(greenUtility, function (utility) {
                                                  return utility.toLowerCase().includes("molotov")
                                              });
                                              grenadePositionHook(true);
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  } else {
                                      if (!grenadeName.toLowerCase().includes("flash")) {
                                          grenadePositionHook(false);
                                          grenadeAmountHook(prevState => prevState - 1)
                                          selectedIndex === 3 && greenUtilityHook(prevState => _.without(prevState, grenadeName))
                                      } else {
                                          for (let i = 0; i < greenUtility.length; i++) {
                                              if (greenUtility[i].toLowerCase().includes("flash")) {
                                                  maxTwoFlashes.push(greenUtility[i]);
                                              }
                                          }
                                          if (maxTwoFlashes.length === 2) {
                                              if (maxTwoFlashes[0] === maxTwoFlashes[1]) {
                                                  grenadeAmountHook(prevState => prevState - 2)
                                                  selectedIndex === 3 && greenUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                              } else {
                                                  selectedIndex === 3 && greenUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                                  grenadeAmountHook(prevState => prevState - 1)
                                              }
                                          } else {
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 4) {
                                  if (!orangeUtility.toString().includes(grenadeName)) {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!orangeUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(orangeUtility, function (utility) {
                                                  return utility.toLowerCase().includes("smoke")
                                              });
                                              grenadePositionHook(true);
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < orangeUtility.length; i++) {
                                              if (orangeUtility[i].toLowerCase().includes("flash")) {
                                                  yellowFlashes.push(orangeUtility[i]);
                                              }
                                          }
                                          if (yellowFlashes.length < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              if (yellowFlashes[0] === yellowFlashes[1]) {
                                                  orangeUtilityHook(_.without(orangeUtility, yellowFlashes[0]));
                                                  orangeUtilityHook(prevState => [...prevState, yellowFlashes[0]])
                                                  orangeUtilityHook(prevState => [...prevState, grenadeName])

                                              } else {
                                                  orangeUtilityHook(_.without(orangeUtility, _.find(orangeUtility, function (firstFlash) {
                                                      return firstFlash.toLowerCase().includes("flash")
                                                  })));
                                                  orangeUtilityHook(prevState => [...prevState, grenadeName])
                                                  grenadePositionHook(true);
                                              }
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!orangeUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              _.remove(orangeUtility, function (utility) {
                                                  return utility.toLowerCase().includes("molotov")
                                              });
                                              grenadePositionHook(true);
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  } else {
                                      if (!grenadeName.toLowerCase().includes("flash")) {
                                          grenadePositionHook(false);
                                          grenadeAmountHook(prevState => prevState - 1)
                                          selectedIndex === 4 && orangeUtilityHook(prevState => _.without(prevState, grenadeName))
                                      } else {
                                          for (let i = 0; i < orangeUtility.length; i++) {
                                              if (orangeUtility[i].toLowerCase().includes("flash")) {
                                                  maxTwoFlashes.push(orangeUtility[i]);
                                              }
                                          }
                                          if (maxTwoFlashes.length === 2) {
                                              if (maxTwoFlashes[0] === maxTwoFlashes[1]) {
                                                  grenadeAmountHook(prevState => prevState - 2)
                                                  selectedIndex === 4 && orangeUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                              } else {
                                                  selectedIndex === 4 && orangeUtilityHook(prevState => _.without(prevState, grenadeName))
                                                  grenadePositionHook(false);
                                                  grenadeAmountHook(prevState => prevState - 1)
                                              }
                                          } else {
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          }
                                      }
                                  }
                              }
                              console.log('yellowUtility ', yellowUtility.map(item => item))
                              console.log('blueUtility ', blueUtility.map(item => item))
                              console.log('purpleUtility ', purpleUtility.map(item => item))
                              console.log('greenUtility ', greenUtility.map(item => item))
                              console.log('orangeUtility ', orangeUtility.map(item => item))
                          }}>
            <View style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 100}}>
                {(yellowUtility.toString().includes(grenadeName)) &&
                    <View style={{backgroundColor: "#D5C200", flex: 1}}/>}
                {(blueUtility.toString().includes(grenadeName)) &&
                    <View style={{backgroundColor: "#00ACFF", flex: 1}}/>}
                {(purpleUtility.toString().includes(grenadeName)) &&
                    <View style={{backgroundColor: "#B600CF", flex: 1}}/>}
                {(greenUtility.toString().includes(grenadeName)) &&
                    <View style={{backgroundColor: "#0EB900", flex: 1}}/>}
                {(orangeUtility.toString().includes(grenadeName)) &&
                    <View style={{backgroundColor: "#F07400", flex: 1}}/>}
                {grenadeName.toLowerCase().includes("smoke") &&
                    <ImageBackground source={smokeImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("flash") &&
                    <ImageBackground source={flashImage} resizeMode="contain" style={styles.image}/>}
                {grenadeName.toLowerCase().includes("molotov") &&
                    <ImageBackground source={molotovImage} resizeMode="contain" style={styles.image}/>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1,
        justifyContent: 'center',
        margin: 2
    },
    selectedGrenadeYellow: {
        backgroundColor: "#D5C200",
    },
    selectedGrenadeBlue: {
        backgroundColor: "#00ACFF",
    },
    selectedGrenadePurple: {
        backgroundColor: "#B600CF",
    },
    selectedGrenadeGreen: {
        backgroundColor: "#0EB900",
    },
    selectedGrenadeOrange: {
        backgroundColor: "#F07400",
    },
    yellowDoubleFlash: {
        transform: [{scale: 1.5}],
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        // opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
});