import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [itemId, setItemId] = useState("-")
    React.useEffect(() => {
        console.log("TestScreen1");
        if (navigation.state.params) {
            setItemId(navigation.state.params.itemId);
        }
    }, [navigation.state.params])

    return (
        <DrawerScreen title="Settings" navigation={navigation} >
            <Text>Settings</Text>
        </DrawerScreen>
    );
}

export default Settings;
