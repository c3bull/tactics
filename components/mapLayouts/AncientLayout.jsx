import {Dimensions, ImageBackground, Text, View} from "react-native";
import React from "react";
import ancientLayout from "../../assets/images/mapLayouts/ancientLayout.png";
export default function AncientLayout(){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View>
            <ImageBackground source={ancientLayout} style={{flex: 1, width: width, height: height-450}}>
                {/*<Text style={{textAlign: 'center', fontSize: 30, color: "#FFF"}}>{maps[index].name}</Text>*/}
            </ImageBackground>
        </View>
    )
}