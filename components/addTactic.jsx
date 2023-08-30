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

const AddTactic = () => {
    const width = Dimensions.get('window').width;
    const [chosenMap, setChosenMap] = useState(0)
    return (
        <ScrollView style={{backgroundColor: "#0F1114", flex: 1}} contentContainerStyle={styles.contentContainer}>

            <Text style={{color: "#FFF"}}>Wybierz mapę</Text>
            <Carousel
                loop
                width={width - 80}
                height={200}
                autoPlay={false}
                data={maps}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{parallaxScrollingOffset: 90, parallaxAdjacentItemScale: Math.pow(0.73, 2)}}
                onSnapToItem={(index) => setChosenMap(index)}
                renderItem={({index}) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor: '#272727',
                            display: "flex",
                            alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            padding: 10
                        }}
                    >
                        <ImageBackground source={maps[index].logo} style={{flex: 1, width: 150, height: 150}}>
                            {/*<Text style={{textAlign: 'center', fontSize: 30, color: "#FFF"}}>{maps[index].name}</Text>*/}
                        </ImageBackground>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 24,
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
                {/*<Text style={{color: "#fff"}}>{chosenMap}</Text>*/}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        display: "flex",
        alignItems: 'center'
    }
});
export default AddTactic