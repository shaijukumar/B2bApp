import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ActivityIndicator } from "react-native";

import colores from "../config/colors"

//function Screen({ children, style }) {
const Screen: React.FC<{ children: any, style?: any, loading?: boolean }> = ({ children, style, loading = false }) => {
    return (
        <SafeAreaView style={[styles.screen, style]}>

            {loading &&
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color={colores.primary} />
                </View>
            }
            {!loading && <View style={[styles.view, style]}>{children}</View>}
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

});

export default Screen;
