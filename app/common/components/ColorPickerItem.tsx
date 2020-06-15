import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import AppText from "./AppText";


const ColorPickerItem: React.FC<{ item: any, onPress: any }> = ({ item, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                onPress();
            }}>
                <Icon
                    backgroundColor={item.selected ? "red" : "yellow"}
                    name={item.icon}
                    size={80}
                />
            </TouchableOpacity>
            <AppText style={styles.label}>{item.title}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
        width: "33%",
    },
    label: {
        marginTop: 5,
        textAlign: "center",
    },
});

export default ColorPickerItem;
