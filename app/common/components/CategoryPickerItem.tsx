import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Icon from "./Icon";
import AppText from "./AppText";

const CategoryPickerItem: React.FC<{ item: any, onPress: any }> = ({ item, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                {/* <Icon
                    backgroundColor={item.backgroundColor}
                    name={item.icon}
                    size={80}
                /> */}
                <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
            {/* <AppText style={styles.label}>{item.title}</AppText> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingVertical: 6,
        paddingLeft: 5,
        alignItems: "flex-start",
        width: "90%",
    },
    label: {
        marginTop: 5,
        textAlign: "left",
        width: '60%'
    },
});

export default CategoryPickerItem;
