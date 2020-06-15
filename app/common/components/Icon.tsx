import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colores from "../../config/colors"

const Icon: React.FC<{
    name: string,
    size?: number,
    backgroundColor?: string,
    iconColor?: string,
}> = ({
    name,
    size = 40,
    backgroundColor = colores.secondary,
    iconColor = "#fff",
}) => {
        return (
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
            </View>
        );
    }

export default Icon;
