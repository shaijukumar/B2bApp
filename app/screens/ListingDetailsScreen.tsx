import React, { useContext, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import ListItem from "../common/lists/ListItem";
import AppText from "../common/components/AppText";
import Screen from "../common/components/Screen";
import RightBottomButton from "../common/components/RightBottomButton";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RootStoreContext } from "../common/data/rootStore";
import { observer } from "mobx-react-lite";

export interface myProps extends NavigationStackScreenProps { }

const ListingDetailsScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, item, getItem } = rootStore.catlogStore;

    useEffect(() => {
        debugger;;
        let id = navigation.getParam("itemId");
        console.log("itemId : " + id);
        debugger;
        getItem(id).then(() => {
            debugger;
            console.log(item);
        })
    }, [getItem]);

    debugger;


    return (
        <Screen style={styles.screen} loading={loadingInitial}>
            <View>
                {/* <Text>ID: {navigation.getParam("itemId")}</Text> */}
                <Image style={styles.image} source={require("../assets/jacket.jpg")} />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{item.displayName}</AppText>
                    <AppText style={styles.price}>${item.price.toString()}</AppText>
                    <View style={styles.userContainer}>
                        <ListItem
                            image={require("../assets/mosh.jpg")}
                            title={item.displayName}
                            subTitle={item.price.toString()}
                        />
                    </View>
                </View>

                <RightBottomButton
                    icon="square-edit-outline"
                    onPress={() =>
                        navigation.navigate("ListingEditScreen", {
                            itemId: "111",
                        })
                    }
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
    },
    userContainer: {
        marginVertical: 40,
    },
});

export default observer(ListingDetailsScreen);
