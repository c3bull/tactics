import {Image, Text, TextInput, View} from "react-native";
import smokeImage from "../assets/images/smokeWhite.png";
import flashImage from "../assets/images/flashWhite.png";
import molotovImage from "../assets/images/molotovWhite.png";
import {remapPositions} from "./common/remap";
import {miragePositions} from "./common/positions";
import React from "react";

export default function AddPlayerTask({color, utility, placeholder, setTaskHook}) {
    return (
        <>
            <View style={{
                display: "flex",
                backgroundColor: color,
                width: '100%',
                paddingVertical: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
            }}>{utility.map((item, index) => {
                    return (
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}} key={index}>
                            {item.toLowerCase().includes("smoke") && <Image alt="smoke" source={smokeImage} style={{
                                resizeMode: 'contain',
                                height: 15,
                                width: 20,
                                marginHorizontal: 5,
                            }}/>}
                            {item.toLowerCase().includes("flash") && <Image alt="smoke" source={flashImage} style={{
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
                            <Text style={{fontWeight: "bold", color: "#FFF"}}>{remapPositions(miragePositions, item)}</Text>
                        </View>
                    )
                }
            )}</View>
            <TextInput
                style={{
                    color: "#FFF",
                    backgroundColor: color,
                    minHeight: 40,
                    width: "100%",
                    maxWidth: "100%",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    marginBottom: 10,
                    padding: 5
                }}
                multiline
                onChangeText={(e) => setTaskHook(e)}
                placeholder={placeholder}
                placeholderTextColor="#CCCCCC"
            />
        </>
    )
}