import React from "react";
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from "react-native";

import colors from "../../config/colors";


const AppButton: React.FC<{ title: string, onPress?: any, color?: string, disabled?: boolean }>
    = ({ title, onPress, color = colors.primary, disabled = false }) => {

        return (
            <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]}
                onPress={onPress}
                //disabled={disabled}                
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>

        )
    }

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,

    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});

export default AppButton;
