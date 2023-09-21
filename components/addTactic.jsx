import React from "react";
import {StyleSheet, ScrollView, Text, View, Dimensions, ImageBackground} from "react-native";
import {useState} from "react";
import Carousel from 'react-native-reanimated-carousel';
import {maps} from "../constants/maps";
import MirageLayout from "./mapLayouts/MirageLayout";
import InfernoLayout from "./mapLayouts/InfernoLayout";
import OverpassLayout from "./mapLayouts/OverpassLayout";
import AnubisLayout from "./mapLayouts/AnubisLayout";
import AncientLayout from "./mapLayouts/AncientLayout";
import NukeLayout from "./mapLayouts/NukeLayout";
import VertigoLayout from "./mapLayouts/VertigoLayout";
import dot from "../assets/images/dot.png";

const width = Dimensions.get('window').width;
const AddTactic = () => {
    const [chosenMap, setChosenMap] = useState(0)
    return (
        <ScrollView style={{backgroundColor: "#0F1114", flex: 1}} contentContainerStyle={styles.contentContainer}>
            <ImageBackground source={dot} imageStyle={{resizeMode: 'repeat', opacity: 0.2}}>
                <Text style={{color: "#00fFFF", textAlign: "center",
                    fontFamily: 'PoppinsRegular'}}>Swipe to change map</Text>
                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay={false}
                    data={maps}
                    scrollAnimationDuration={1000}
                    mode="parallax"
                    modeConfig={{parallaxScrollingOffset: 105, parallaxAdjacentItemScale: Math.pow(0.73, 2)}}
                    onSnapToItem={(index) => setChosenMap(index)}
                    renderItem={({index}) => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                backgroundColor: '#272727',
                                display: "flex",
                                borderColor: "#00ffff",
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                padding: 10,
                                shadowColor: "#00ffff",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,

                                elevation: 18,
                            }}
                        >
                            <ImageBackground source={maps[index].logo} style={{flex: 1, width: 150, height: 150}}>
                            </ImageBackground>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 18,
                                fontFamily: 'PoppinsSemiBold',
                                color: "#fff",
                                textTransform: 'uppercase'
                            }}>{maps[index].name}</Text>
                        </View>
                    )}
                />
                <View>
                    {chosenMap === 0 && <MirageLayout/>}
                    {chosenMap === 1 && <InfernoLayout/>}
                    {chosenMap === 2 && <OverpassLayout/>}
                    {chosenMap === 3 && <AncientLayout/>}
                    {chosenMap === 4 && <NukeLayout/>}
                    {chosenMap === 5 && <VertigoLayout/>}
                    {chosenMap === 6 && <AnubisLayout/>}
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        display: "flex",
        alignItems: 'center',
        width: width,
    }
});
export default AddTactic