import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../common/data/rootStore';

import { ListItem, ListItemSeparator } from "../common/lists";
import Icon from "../common/components//Icon";
import Screen from "../common/components/Screen";

import colors from "../config/colors";
import { deleteToken } from "../common/CommonFunctions/token";

import { NavigationStackScreenProps } from "react-navigation-stack";

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        screen: "ListingsScreen",
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        screen: "MessagesScreen",
    },
    {
        title: "ImageUpload",
        icon: {
            name: "ImageUpload",
            backgroundColor: colors.secondary,
        },
        screen: "ImageUpload",
    },    
];

export interface myProps extends NavigationStackScreenProps { }

const AccountScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    const [userDetails, setUserDetails] = useState({ hits: [] });
    const updateUserDetails = () => {

    };

    useEffect(() => {
        debugger;
        console.log(user);
    })

    const onLogout = (values) => {


        deleteToken().then((token) => {
            navigation.navigate("Home");
        });
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user!.displayName}//{user.displayName}
                    subTitle={user!.email} //{userDetails.email}
                    //image={require("../assets/user-dummy-200x200.png")}
                    imageUrl={user!.image ? user!.image : "-"}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={() => navigation.navigate(item.screen)}
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                        />
                    )}
                />
            </View>
            <ListItem
                title="Log Out"
                IconComponent={<Icon name="logout" backgroundColor="#cf8d69" />}
                onPress={onLogout}
            />

            <ListItem
                title="Update Profile"
                IconComponent={<Icon name="account-edit" backgroundColor="#6970cf" />}
                onPress={updateUserDetails}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    },
});

export default observer(AccountScreen);
