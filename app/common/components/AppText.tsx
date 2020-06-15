import React from "react";
import { Text } from "react-native";
 
import defaultStyles from "../../config/styles"

const AppText: React.FC<{ children?: any, style?: any, numberOfLines?: number }> = ({ children, style, numberOfLines = 1 }) => {
    return (
        <Text numberOfLines={numberOfLines} style={[defaultStyles.text, style]}>
            {children}
        </Text>
    );
}

export default AppText;
