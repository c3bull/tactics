import {Dimensions, ImageBackground, Text, View} from "react-native";
import React from "react";
import vertigoLayout from "../../assets/images/mapLayouts/vertigoLayout.png";
export default function VertigoLayout(){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View>
            <ImageBackground source={vertigoLayout} style={{flex: 1, width: width, height: height-450}}>
                {/*<Text style={{textAlign: 'center', fontSize: 30, color: "#FFF"}}>{maps[index].name}</Text>*/}
            </ImageBackground>
        </View>
    )
}