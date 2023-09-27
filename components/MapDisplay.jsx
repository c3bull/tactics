import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {maps} from "../constants/maps";
import dot from "../assets/images/dot.png"
import tacticsBg from "../assets/images/maps/tactics.png";
import {LinearGradient} from "expo-linear-gradient";

const width = Dimensions.get('window').width;

const MapDisplay = ({navigation}) => {

    return (
        <ScrollView style={{backgroundColor: "#0F1114", flex: 1}} contentContainerStyle={styles.contentContainer}>
            <ImageBackground source={dot} imageStyle={{resizeMode: 'repeat', opacity: 0.2}}>
                <TouchableOpacity style={styles.addTactic} onPress={() => {
                    navigation.navigate('add-tactic')
                }}>

                    <ImageBackground source={tacticsBg} resizeMode="cover" style={styles.imgBackground}>
                        <LinearGradient
                            colors={["#00A4A4", "#ffffff00"]}
                            start={[1, -1]}
                            end={[1, 1]}
                            locations={[0.3, 0.98]}
                            style={styles.linearGradient}
                        >
                            <Text style={styles.addTacticSubText}>Click to create your own tactic!</Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Tactics</Text>
                <View style={styles.tacticsWrapper}>
                    {maps.map(({logo, name, href}, key) => (
                        <TouchableOpacity style={styles.singleTactic} key={key} onPress={() => {
                            navigation.navigate(href)
                        }}>
                            <LinearGradient
                                colors={["#00A4A4", "#0F1114"]}
                                start={[-1, 1]}
                                end={[-1, 0]}
                                style={styles.linearGradientButtons}
                            >
                                <View style={{display: "flex", flexDirection: "row", height: '100%'}}>
                                    <Image source={logo} style={styles.tacticImage}/>
                                    <Text style={styles.text}>{name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.stratsRoulette} onPress={() => {
                    navigation.navigate('strats-roulette')
                }}>
                    <Text style={styles.headerText}>Strats Roulette</Text>
                    <Text style={styles.stratsRouletteSubText}>Don't respect your enemies?</Text>
                    <Text style={styles.stratsRouletteSubText}>Want to have more fun with friends?</Text>
                    <Text style={styles.addTacticSubText}>Click to diversify your game!</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradientButtons: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
        padding: 3,
    },
    contentContainer: {
        minHeight: 890,
    },
    addTactic: {
        height: 300,
        overflow: "hidden",
        display: "flex",
    },
    addTacticText: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        textTransform: "uppercase",
        fontWeight: '500',
    },
    tacticsWrapper: {
        backgroundRepeat: "repeat",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
    },
    addTacticSubText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: "#00ffff",
        padding: 8,
        paddingTop: 10,
        borderRadius: 5,
        transform: [{rotate: '-5 deg'}],
        marginTop: 15,
        fontFamily: 'PoppinsSemiBold',
    },
    singleTactic: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        backgroundColor: "#003636",
        width: width / 2 - 17,
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    tacticImage: {
        height: '100%',
        width: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        padding: 17,
        resizeMode: "contain"
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    text: {
        display: "flex",
        color: 'white',
        fontSize: 24,
        height: '100%',
        textAlignVertical: 'center',
        paddingLeft: 4,
        paddingTop: 3,
        fontFamily: 'PoppinsMedium',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'PoppinsSemiBold',
        textTransform: "uppercase"
    },
    stratsRoulette: {
        backgroundColor: 'rgba(32, 32, 32,0.7)',
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
        borderRadius: 10,
        marginTop: 20,
        paddingBottom: 30,
    },
    stratsRouletteButtonsWrapper: {
        backgroundColor: "#202020",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        borderRadius: 10,
    },
    stratsRouletteSubText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "500",
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
        // backgroundColor: "#00ffff",
        // padding: 2,
        borderRadius: 5,
    },
    stratsRouletteClientButtons: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 10,
    },
    stratsRouletteClientSingleButton: {
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: width / 2 - 25,
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    stratsRouletteMoreTactics: {
        textAlignVertical: 'center',
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003636",
        width: width - 40,
        height: 50,
        borderWidth: 1,
        borderColor: "#00A4A4",
    },
    stratsText: {
        textAlign: "center",
        display: "flex",
        color: 'white',
        fontSize: 17,
        height: '100%',
        textAlignVertical: "center",
        // padding: 3,
        fontWeight: '600',
        textTransform: "uppercase",
    },
});
export default MapDisplay