import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const SupplierReturns: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen title={"Supplier Returns"} navigation={navigation} loading={false}>
            <Text>SupplierReturns</Text>
        </DrawerScreen>
    );
}

export default SupplierReturns; 