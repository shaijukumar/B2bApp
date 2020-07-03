import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const SupplierHome: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen title={"Supplier"} navigation={navigation} loading={false}>
            <Text>Supplier Home</Text>
        </DrawerScreen>
    );
}

export default SupplierHome; 