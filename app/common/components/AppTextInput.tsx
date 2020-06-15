import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import colors from "../../config/colors";

const AppTextInput: React.FC<{
    value?: any,
    icon?: string,
    width?: number,
    onBlur?: any,
    onChangeText?: any,
    autoCapitalize?: any,
    autoCorrect?: boolean,
    keyboardType?: any,
    placeholder?: string,
    textContentType?: any,
    secureTextEntry?: boolean,
    maxLength?: number,
    multiline?: boolean,
    numberOfLines?: number
}>
    = ({
        value,
        icon,
        width = "100%",
        onBlur,
        onChangeText,
        autoCapitalize = "none",
        autoCorrect = true,
        keyboardType = "default",
        placeholder = "",
        textContentType = "none",
        secureTextEntry = false,
        maxLength,
        multiline = false,
        numberOfLines = 1
    }) => {

        const [val, setTextVal] = useState(value);
        return (

            //x:string = autoCapitalize ? autoCapitalize : "none";

            <View style={[styles.container, { width }]}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={defaultStyles.colors.medium}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    placeholderTextColor={defaultStyles.colors.medium}
                    style={defaultStyles.text}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    textContentType={textContentType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    value={value}
                // onChangeText={text => setTextVal(text)}
                />
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.lightMedium,
        borderRadius: 10,
        flexDirection: "row",
        padding: 5,
        marginVertical: 5,
        height: 60,
    },
    icon: {
        marginRight: 10,
    },
});

export default AppTextInput;
