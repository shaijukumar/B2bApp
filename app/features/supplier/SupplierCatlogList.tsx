import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DrawerScreen from "../navigation/DrawerScreen";
import CatlogEdit from "../Catlog/CatlogEdit";
import AppButton from "../../components/AppButton";
import RightBottomButton from "../../components/RightBottomButton";
import CatlogListing from "../Catlog/CatlogListing";

const SupplierCatlogList: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [listPage, setListPage] = useState(true);
    const [catlogID, setCatlogID] = useState("");

    return (
        <DrawerScreen title={listPage ? "Catlog List" : "Catlog Item"} navigation={navigation} loading={false}>
            {listPage ?
                (
                    <View style={styles.listingContainer}>
                        <CatlogListing
                            navigation={navigation}
                            onBackToListing={() => { setListPage(true); }}
                            onItemClick={(id) => { setCatlogID(id); setListPage(false); }}
                        />
                        <RightBottomButton
                            onPress={() => { setListPage(false); }}
                        />
                    </View>
                )
                :
                (<CatlogEdit navigation={navigation} onBackToListing={() => { setCatlogID(""); setListPage(true); }} catlogID={catlogID} />)
            }
        </DrawerScreen>
    );
}

export default SupplierCatlogList;

const styles = StyleSheet.create({
    listingContainer: {
        height: "100%",
        paddingBottom: 45
    },
});