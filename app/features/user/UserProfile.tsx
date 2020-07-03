import React, { useState } from "react";
import { Text } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";

const UserProfile: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [itemId, setItemId] = useState("-")
    React.useEffect(() => {
        console.log("TestScreen1");
        if (navigation.state.params) {
            setItemId(navigation.state.params.itemId);
        }
    }, [navigation.state.params])

    return (
        <DrawerScreen title="User Profile" navigation={navigation} >
            <Text>User Profile</Text>
        </DrawerScreen>
    );
}

export default UserProfile;
