import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../features/navigation/DrawerScreen";

const TestScreen1: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [itemId, setItemId] = useState("-")
    React.useEffect(() => {
        console.log("TestScreen1");
        if (navigation.state.params) {
            setItemId(navigation.state.params.itemId);
        }
    }, [navigation.state.params])

    return (
        <DrawerScreen name="TestScreen111" navigation={navigation} >
            <Text>TestScreen1--- itemId : {itemId}</Text>
        </DrawerScreen>
    );
}

export default TestScreen1;
