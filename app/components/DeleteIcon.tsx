import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

import Icon from "./Icon";

const DeleteIcon: React.FC<{
    onPress?: any, icon?: string, color?: string
}> = ({
    onPress, icon = "delete", color = "primary"
}) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Icon backgroundColor={colors[color]} name={icon} size={35} />
            </TouchableOpacity>
        );
    }

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        //borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 35,
        backgroundColor: "#fff",
        borderRadius: 100,
    },
});

export default DeleteIcon;
