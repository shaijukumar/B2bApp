import React, { useState, useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import * as Yup from "yup";
import { observer } from 'mobx-react-lite'

import { RootStoreContext } from '../common/data/rootStore';
import { Form, FormField, SubmitButton } from "../common/forms";
import AppButton from "../common/components/AppButton";
import Screen from "../common/components/Screen";
import AppText from "../common/components/AppText";
import { IUserFormValues } from "../common/models/user";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

export interface myProps extends NavigationStackScreenProps { }

const LoginScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loading, user, login } = rootStore.userStore;

    const [errorMessage, setErrorMessage] = useState(" ");

    return (
        <Screen style={styles.container} loading={loading}>
            <Image style={styles.logo} source={require("../assets/logo-red.png")} />
            <Form
                initialValues={{ email: "admin@test.com", password: "Pa$$w0rd" }}
                //initialValues={{ email: "", password: "" }}
                onSubmit={(values: IUserFormValues) => {
                    // debugger;
                    // let t = testFun();
                    // return;

                    login(values)
                        .then(() => {
                            //debugger;
                            //console.log(user);
                            //navigation.navigate("AccountScreen");
                            navigation.navigate("BottomTabs");
                        })
                        .catch((error) => {
                            debugger;
                            setErrorMessage("Invlaid login");
                        })
                }}

                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />

                {errorMessage && <AppText>{errorMessage}</AppText>}
                <SubmitButton title="Login" />
                <AppButton
                    title="Back"
                    //onPress={onLoginSubmit}
                    onPress={() => navigation.navigate("WelcomeScreen")}
                />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});

export default observer(LoginScreen);