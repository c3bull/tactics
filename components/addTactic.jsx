import {ScrollView, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";

const AddTactic = () => {
    const [selectedDateRange, setSelectedDateRange] = useState()

    return (
        <ScrollView style={{backgroundColor: "#0F1114"}}>
            <Text style={{color: "#FFF"}}>Wybierz mapę</Text>
            <Picker
                style={{backgroundColor: '#313131', marginBottom: 20, color: "#FFF",}}
                mode="dropdown"
                selectedValue={selectedDateRange}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDateRange(itemValue)
                }>
                {/*<Picker.Item label="Wybierz..." value="choose"/>*/}
                <Picker.Item label="Mirage" value="mirage"/>
                <Picker.Item label="Inferno" value="inferno"/>
                <Picker.Item label="Overpass" value="overpass"/>
                <Picker.Item label="Ancient" value="ancient"/>
                <Picker.Item label="Nuke" value="nuke"/>
                <Picker.Item label="Vertigo" value="vertigo"/>
                <Picker.Item label="Anubis" value="anubis"/>
            </Picker>
        </ScrollView>
    )
}

export default AddTactic