import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const SupplierOrders: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen title={"SupplierOrders"} navigation={navigation} loading={false}>
            <Text>SupplierOrders</Text>
        </DrawerScreen>
    );
}

export default SupplierOrders; 