import React, { useState } from "react";
import { Text, FlatList, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import DrawerScreen from "../navigation/DrawerScreen";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import CatlogListing from "../Catlog/CatlogListing";
import ViewCatlog from "../Catlog/ViewCatlog";

const ResellerCatlogs: React.FC<{ rootNavigation: any, navigation: any }> = ({ rootNavigation, navigation }) => {

    const [catMob, setCatMob] = useState("12345")
    const [catlogID, setCatlogID] = useState("");

    const [listingVisible, setListingVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState(false);

    return (
        <>
            <DrawerScreen title={"ResellerCatlogs"} navigation={rootNavigation} loading={false}>
                <View>
                    <AppTextInput
                        placeholder="Catlog ID                                          "
                        keyboardType="number-pad"
                        onChangeText={val => { setCatMob(val) }}
                        value={catMob}
                        maxLength={10}
                    />

                    <AppButton title="View Catlog" onPress={() => {
                        setListingVisible(true)
                        setTimeout(() => { setCatlogID(catlogID); }, 100);
                    }} />

                </View>
            </DrawerScreen>

            <Modal visible={listingVisible} animationType="slide" >
                <View style={styles.listModelView}>
                    <AppButton title="Back" onPress={() => { setListingVisible(false) }} />
                    <View style={styles.listingContainer}>
                        <CatlogListing
                            SupplierPhone={catMob}
                            navigation={navigation}
                            onBackToListing={() => { setListingVisible(false); }}
                            onItemClick={(id) => { setCatlogID(id); setItemVisible(true); }}
                        />
                    </View>
                </View>

            </Modal>

            <Modal visible={itemVisible} animationType="slide">
                <ViewCatlog
                    navigation={navigation}
                    onBackToListing={() => { setCatlogID(""); setItemVisible(false); }}
                    catlogID={catlogID}
                />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    listModelView: {
        height: "100%"
    },
    listingContainer: {
        height: "100%",
        paddingBottom: 45,
    },
});

export default ResellerCatlogs;
