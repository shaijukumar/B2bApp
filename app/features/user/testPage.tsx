import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";



const testPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.container} >Test 123 dddd</Text>
        </View>

    )
}

export default testPage;

const styles = StyleSheet.create({
    container: {
        padding: 50,
        color: "red"
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});