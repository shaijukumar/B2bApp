import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import AppButton from "../../components/AppButton";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { getToken } from "../../common/token";

export interface myProps extends NavigationStackScreenProps { }

const WelcomeScreen: React.FC<myProps> = ({ navigation }) => {

    useEffect(() => {

        // navigation.navigate("RegisterForm");
        // return;

        // getToken().then((token) => {
        //     if (token) {
        //         navigation.navigate("ListingEditScreen", { itemId: "ecc19db4-f7c8-40a4-ba22-36f52d13cf45" });
        //         //navigation.navigate("ImageList")
        //         //navigation.navigate("ImageUpload")
        //         //navigation.navigate("ListingsScreen");
        //     }
        // })
    })

    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require("../../assets/background.jpg")}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/logo-red.png")} />
                <Text style={styles.tagline}>Sell What You Need...</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton
                    title="Login"
                    onPress={() => navigation.navigate("LoginScreen")}
                />
                <AppButton title="Register"
                    onPress={() => navigation.navigate("RegisterForm")} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20,
    },
});

export default WelcomeScreen; 