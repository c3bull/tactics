import {Dimensions, ImageBackground, Text, View} from "react-native";
import React from "react";
import nukeLayout from "../../assets/images/mapLayouts/nukeLayout.png";
export default function NukeLayout(){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View>
            <ImageBackground source={nukeLayout} style={{flex: 1, width: width, height: height-450}}>
                {/*<Text style={{textAlign: 'center', fontSize: 30, color: "#FFF"}}>{maps[index].name}</Text>*/}
            </ImageBackground>
        </View>
    )
}