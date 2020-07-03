import React, { useState, useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import * as Yup from "yup";
import { observer } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactNative'

import { RootStoreContext } from '../../common/rootStore';
import { Form, FormField, SubmitButton } from "../../forms";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { IUserFormValues } from "./user";
import AppButton from "../../components/AppButton";

const validationSchema = Yup.object().shape({
    Email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

export interface myProps extends NavigationStackScreenProps { }

const LoginScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loading, user, login } = rootStore.userStore;
    const { configLoading, updateConfig, categoryGroup, appConfigList } = rootStore.configStore;

    const [errorMessage, setErrorMessage] = useState(" ");
    //loading={loading}
    return (

        <Screen style={styles.container} loading={loading} >
            <Image style={styles.logo} source={require("../../assets/logo-red.png")} />
            <Form
                initialValues={{ Email: "r1@test.com", password: "Pa$$w0rd" }}
                //initialValues={{ email: "", password: "" }}
                onSubmit={(values: IUserFormValues) => {
                    login(values)
                        .then((user) => {
                            if (categoryGroup.length == 0 || appConfigList.length == 0) {
                                //console.log("updateConfig");
                                updateConfig();
                            }

                            if (user.UserRoles.find(x => x == "Supplier")) {
                                navigation.navigate("SupplierTab");
                            }
                            else {
                                navigation.navigate("ResellerTab")
                            }
                        })
                        .catch((error) => {
                            debugger;
                            setErrorMessage("Invlaid login");
                        })
                }}

            //validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
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
        color: "red"
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