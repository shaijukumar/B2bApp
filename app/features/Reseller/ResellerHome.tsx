import React, { useState } from "react";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import DrawerScreen from "../navigation/DrawerScreen";

const ResellerHome: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [itemId, setItemId] = useState("-")
    React.useEffect(() => {
        debugger;
        console.log("TestScreen1");
        if (navigation.state.params) {
            setItemId(navigation.state.params.itemId);
        }
    }, [navigation.state.params])

    return (
        <DrawerScreen title={"Reseller"} navigation={navigation} loading={false}>
            <Text>Reseller Home--- itemId : {itemId}</Text>
        </DrawerScreen>
    );
}

export default ResellerHome;
