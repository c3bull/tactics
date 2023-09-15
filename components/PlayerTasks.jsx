import {Image, Text, View} from "react-native";
import smokeImage from "../assets/images/smokeWhite.png";
import flashImage from "../assets/images/flashWhite.png";
import molotovImage from "../assets/images/molotovWhite.png";
import {remapPositions} from "./common/remap";
import React from "react";

export default function PlayerTasks({utility, player, color, positions}) {

    return (
        <View style={{
            display: "flex",
            backgroundColor: color,
            width: '100%',
            paddingVertical: 5,
            borderRadius: 5,
            marginVertical: 5,

        }}>{utility.map((item, index) => {
                return (
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}
                          key={index}>
                        {item.toLowerCase().includes("smoke") &&
                            <Image alt="smoke" source={smokeImage} style={{
                                resizeMode: 'contain',
                                height: 15,
                                width: 20,
                                marginHorizontal: 5,
                            }}/>}
                        {item.toLowerCase().includes("flash") &&
                            <Image alt="smoke" source={flashImage} style={{
                                resizeMode: 'contain',
                                height: 15,
                                width: 20,
                                marginHorizontal: 5,
                            }}/>}
                        {item.toLowerCase().includes("molotov") &&
                            <Image alt="smoke" source={molotovImage} style={{
                                resizeMode: 'contain',
                                height: 15,
                                width: 20,
                                marginHorizontal: 5,
                            }}/>}
                        <Text style={{
                            fontWeight: "bold",
                            color: "#FFF"
                        }}>{remapPositions(positions, item)}</Text>
                    </View>
                )
            }
        )}
            {player &&
                <Text style={{
                    color: "#fff",
                    fontSize: 15,
                    padding: 10
                }}>{player}</Text>}
        </View>
    )
}