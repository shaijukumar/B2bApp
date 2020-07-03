
import React from "react";
import { Text, StyleSheet } from "react-native";

import DrawerScreen from "../features/navigation/DrawerScreen";

const TestTabHome: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen name="TestTabHome" navigation={navigation} >
            <Text>TestTabHome desc</Text>
        </DrawerScreen>
    );
}


export default TestTabHome;
