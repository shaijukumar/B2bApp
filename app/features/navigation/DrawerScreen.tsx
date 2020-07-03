import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

import colores from "../../config/colors"
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";

//function Screen({ children, style }) {
const DrawerScreen: React.FC<{
    title: string,
    style?: any,
    loading?: boolean,
    navigation: any
    children: any,
}>
    = ({
        title,
        style,
        loading = false,
        navigation,
        children,
    }) => {
        return (
            <SafeAreaView style={[styles.screen, style]}>
                {loading &&
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color={colores.primary} />
                    </View>
                }
                {!loading &&
                    <View style={[styles.view, style]}>

                        <View style={styles.header} >
                            <TouchableOpacity onPress={() => {
                                navigation.openDrawer()
                            }}>
                                <Ionicons name="ios-menu" size={32} />
                            </TouchableOpacity>

                            <Text style={styles.headerText}>{title}</Text>

                            <MaterialCommunityIcons
                                name="bell-circle"
                                size={43}
                                color={colores.primary}
                                style={styles.icon}
                                onPress={() => { navigation.navigate("UserAlert"); }}
                            />

                            <MaterialCommunityIcons
                                name="account-circle"
                                size={43}
                                color={colores.primary}
                                style={styles.icon}
                                onPress={() => { navigation.navigate("UserProfile"); }}
                            />
                        </View>
                        {children}
                    </View>}
            </SafeAreaView>
        );


    }

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    view: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    header: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "center",
        paddingHorizontal: 20,
        alignItems: "stretch"

    },
    headerText: {
        textAlign: 'center',
        width: "60%",
        color: colors.dark,
        //backgroundColor: "red",
        fontSize: 22,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
    icon: {
        //backgroundColor: "green",
        //paddingTop: 5
        //marginRight: 10,       
    },

});

export default DrawerScreen;
