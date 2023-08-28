import {Dimensions, ImageBackground, Text, View} from "react-native";
import React from "react";
import infernoLayout from "../../assets/images/mapLayouts/infernoLayout.png";
export default function InfernoLayout(){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View>
            <ImageBackground source={infernoLayout} style={{flex: 1, width: width, height: height-450}}>
                {/*<Text style={{textAlign: 'center', fontSize: 30, color: "#FFF"}}>{maps[index].name}</Text>*/}
            </ImageBackground>
        </View>
    )
}