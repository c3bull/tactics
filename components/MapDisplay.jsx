import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {maps} from "../constants/maps";
import {useRouter} from "expo-router";

const MapDisplay = ({navigation}) => {
    const router = useRouter()

    return (
        <ScrollView style={{backgroundColor: "#0F1114", marginBottom: 49, paddingTop: 5}}>
            {maps.map(({bgImage, name, href}, key) => (
                <TouchableOpacity style={styles.container} key={key} onPress={() => {
                    navigation.navigate(href)
                }}>
                    <ImageBackground source={bgImage} resizeMode="cover">
                        <Text style={styles.text}>{name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#00000c60',
    },
});
export default MapDisplay