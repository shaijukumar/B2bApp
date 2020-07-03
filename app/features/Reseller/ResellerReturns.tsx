import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const ResellerReturns: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen title={"Returns"} navigation={navigation} loading={false}>
            <Text>Reseller Returns</Text>
        </DrawerScreen>
    );
}

export default ResellerReturns; 