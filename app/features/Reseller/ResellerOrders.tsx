import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const ResellerOrders: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <DrawerScreen title={"Orders"} navigation={navigation} loading={false}>
            <Text>Reseller Orders</Text>
        </DrawerScreen>
    );
}

export default ResellerOrders; 