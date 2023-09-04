import _ from "lodash";
import {TouchableOpacity} from "react-native";
import React from "react";
import {blue} from "react-native-reanimated/src";

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
    return (
        <TouchableOpacity style={[mainStyle, grenadePosition && additionalStyle]}
                          onPress={() => {
                              if (selectedIndex === 0) {

                                  if (
                                      blueUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      console.log("zajęte!")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 0 && yellowUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (!yellowUtility.toString().toLowerCase().includes("smoke")) {
                                          grenadePositionHook(true);
                                          grenadeAmountHook(prevState => prevState + 1)
                                          yellowUtilityHook(prevState => [...prevState, grenadeName])
                                      }

                                  }
                              }
                              if (selectedIndex === 1) {
                                  if (blueUtility.length > 0) {
                                      console.log("za duzo")
                                  }
                                  if (
                                      yellowUtility.toString().includes(grenadeName) ||
                                      purpleUtility.toString().includes(grenadeName) ||
                                      greenUtility.toString().includes(grenadeName) ||
                                      orangeUtility.toString().includes(grenadeName)
                                  ) {
                                      console.log("zajęte!")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 1 && blueUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (!blueUtility.toString().toLowerCase().includes("smoke")) {
                                          grenadePositionHook(true);
                                          grenadeAmountHook(prevState => prevState + 1)
                                          blueUtilityHook(prevState => [...prevState, grenadeName])
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
                                      console.log("zajęte!")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 2 && purpleUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (!purpleUtility.toString().toLowerCase().includes("smoke")) {
                                          grenadePositionHook(true);
                                          grenadeAmountHook(prevState => prevState + 1)
                                          purpleUtilityHook(prevState => [...prevState, grenadeName])
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
                                      console.log("zajęte!")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 3 && greenUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (!greenUtility.toString().toLowerCase().includes("smoke")) {
                                          grenadePositionHook(true);
                                          grenadeAmountHook(prevState => prevState + 1)
                                          greenUtilityHook(prevState => [...prevState, grenadeName])
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
                                      console.log("zajęte!")
                                  } else if (grenadePosition) {
                                      grenadePositionHook(false);
                                      grenadeAmountHook(prevState => prevState - 1)
                                      selectedIndex === 4 && orangeUtilityHook(prevState => _.without(prevState, grenadeName))
                                  } else {
                                      if (!orangeUtility.toString().toLowerCase().includes("smoke")) {
                                          grenadePositionHook(true);
                                          grenadeAmountHook(prevState => prevState + 1)
                                          orangeUtilityHook(prevState => [...prevState, grenadeName])
                                      }
                                  }
                              }
                              console.log('yellowUtility ', yellowUtility.map(item => item))
                              console.log('blueUtility ', blueUtility.map(item => item))
                              console.log('purpleUtility ', purpleUtility.map(item => item))
                              console.log('greenUtility ', greenUtility.map(item => item))
                              console.log('orangeUtility ', orangeUtility.map(item => item))
                          }}/>
    )
}