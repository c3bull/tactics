import _ from "lodash";
import {TouchableOpacity, ToastAndroid, StyleSheet, ImageBackground} from "react-native";
import React from "react";
import smokeImage from "../assets/images/smoke.webp"
import flashImage from "../assets/images/flash.webp"
import molotovImage from "../assets/images/molotov.webp"
export default function SingleGrenade({
                                          mainStyle,
                                          additionalStyle,
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
    const showToastWithGravityAndOffset = (text) => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            125,
            150,
        );
    };
    return (
        <TouchableOpacity style={[mainStyle, grenadePosition && (
            yellowUtility.toString().includes(grenadeName) && styles.selectedGrenadeYellow ||
            blueUtility.toString().includes(grenadeName) && styles.selectedGrenadeBlue ||
            purpleUtility.toString().includes(grenadeName) && styles.selectedGrenadePurple ||
            greenUtility.toString().includes(grenadeName) && styles.selectedGrenadeGreen ||
            orangeUtility.toString().includes(grenadeName) && styles.selectedGrenadeOrange
        )]}
                          onPress={() => {
                              let flashAmount = 0;
                              if (selectedIndex === 0) {
                                  if (
                                      blueUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      return showToastWithGravityAndOffset("This grenade is taken by another player")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 0 && yellowUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!yellowUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one smoke")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < yellowUtility.length; i++) {
                                              if (yellowUtility[i].toLowerCase().includes("flash")) {
                                                  flashAmount++;
                                              }
                                          }
                                          if (flashAmount < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only two flashes")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!yellowUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              yellowUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one molotov")
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 1) {
                                  if (
                                      yellowUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      return showToastWithGravityAndOffset("This grenade is taken by another player")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 1 && blueUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!blueUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one smoke")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < blueUtility.length; i++) {
                                              if (blueUtility[i].toLowerCase().includes("flash")) {
                                                  flashAmount++;
                                              }
                                          }
                                          if (flashAmount < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only two flashes")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!blueUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              blueUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one molotov")
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 2) {
                                  if (
                                      blueUtility.toString().includes(grenadeName) ||
                                      yellowUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      return showToastWithGravityAndOffset("This grenade is taken by another player")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 2 && purpleUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!purpleUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one smoke")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < purpleUtility.length; i++) {
                                              if (purpleUtility[i].toLowerCase().includes("flash")) {
                                                  flashAmount++;
                                              }
                                          }
                                          if (flashAmount < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only two flashes")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!purpleUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              purpleUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one molotov")
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 3) {
                                  if (
                                      blueUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      yellowUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      return showToastWithGravityAndOffset("This grenade is taken by another player")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 3 && greenUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!greenUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one smoke")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < greenUtility.length; i++) {
                                              if (greenUtility[i].toLowerCase().includes("flash")) {
                                                  flashAmount++;
                                              }
                                          }
                                          if (flashAmount < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only two flashes")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!greenUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              greenUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one molotov")
                                          }
                                      }
                                  }
                              }
                              if (selectedIndex === 4) {
                                  if (
                                      blueUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      yellowUtility.toString().includes(grenadeName)
                                  ) {
                                      return showToastWithGravityAndOffset("This grenade is taken by another player")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 4 && orangeUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (grenadeName.toLowerCase().includes("smoke")) {
                                          if (!orangeUtility.toString().toLowerCase().includes("smoke")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one smoke")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("flash")) {
                                          for (let i = 0; i < orangeUtility.length; i++) {
                                              if (orangeUtility[i].toLowerCase().includes("flash")) {
                                                  flashAmount++;
                                              }
                                          }
                                          if (flashAmount < 2) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only two flashes")
                                          }
                                      }
                                      if (grenadeName.toLowerCase().includes("molotov")) {
                                          if (!orangeUtility.toString().toLowerCase().includes("molotov")) {
                                              grenadePositionHook(true);
                                              grenadeAmountHook(prevState => prevState + 1)
                                              orangeUtilityHook(prevState => [...prevState, grenadeName])
                                          } else {
                                              return showToastWithGravityAndOffset("One player can buy only one molotov")
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
            {grenadeName.toLowerCase().includes("smoke") && <ImageBackground source={smokeImage} resizeMode="contain" style={styles.image}/>}
            {grenadeName.toLowerCase().includes("flash") && <ImageBackground source={flashImage} resizeMode="contain" style={styles.image}/>}
            {grenadeName.toLowerCase().includes("molotov") && <ImageBackground source={molotovImage} resizeMode="contain" style={styles.image}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
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
});