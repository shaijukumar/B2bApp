import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { observer } from 'mobx-react-lite'
import { NavigationStackScreenProps } from "react-navigation-stack";

import colors from "../config/colors";
import { RootStoreContext } from '../common/data/rootStore';
import Screen from "../common/components/Screen";
import RightBottomButton from "../common/components/RightBottomButton";
import Card from "../common/components/Card";

const listings = [
    {
        id: 1,
        title: "Red jacket for sale",
        price: 100,
        image: require("../assets/jacket.jpg"),
    },
    {
        id: 2,
        title: "Couch in great condition",
        price: 1000,
        image: require("../assets/couch.jpg"),
    },
];

export interface myProps extends NavigationStackScreenProps { }

const ListingsScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, itemList, getList } = rootStore.catlogStore;

    const [catalogList, setCatalogList] = useState({ hits: [] });
    //debugger;
    useEffect(() => {
        //debugger;
        getList().then(() => {
            //debugger;
            console.log(itemList);
        })
    }, [getList]);

    return (
        <Screen style={styles.screen} loading={loadingInitial}>
            <FlatList
                data={itemList}
                keyExtractor={(listing) => listing.categoryId.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.displayName}
                        subTitle={item.price.toString()} //{"$" + item.description}
                        imageUrl={item.imageUrl ? item.imageUrl : ""} //{require("../assets/couch.jpg")}
                        onPress={() => {
                            console.log(item);
                            //navigation.navigate("ListingDetailsScreen", { itemId: item.id });
                            navigation.navigate("ListingEditScreen", { itemId: item.id });

                        }}
                    />
                )}
            />

            <RightBottomButton
                onPress={() => { navigation.navigate("ListingEditScreen") }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
}); 

export default observer(ListingsScreen);

