import React, { useState, useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import * as Yup from "yup";
import { observer } from 'mobx-react-lite'
import { v4 as uuid } from "uuid";

import { RootStoreContext } from '../common/data/rootStore';
import { Form, FormField, SubmitButton, ErrorMessage } from "../common/forms";
import Screen from "../common/components/Screen";
import AppText from "../common/components/AppText";
import { IUserFormValues, UserRegister } from "../common/models/user";
import AppRadio from "../common/components/AppRadio";
import { values } from "mobx";
import AppButton from "../common/components/AppButton";

const validationSchema = Yup.object().shape({
    displayName: Yup.string().required().min(1).label("userType"),
    //username: Yup.string().required().min(1).label("Businessname"),
    mobile: Yup.string().required().min(1).label("userType"),
    password: Yup.string().required().min(4).label("Password"),
    email: Yup.string().required().email().label("Email"),
});

export interface myProps extends NavigationStackScreenProps { }

const RegisterForm: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loading, register } = rootStore.userStore;

    let user = new UserRegister();

    user.displayName = "t1";
    user.email = "t1@test.com";
    user.password = "Pa$$w0rd"
    user.mobile = "12345";


    user.userType = "Supplier";

    const [userData, setUserData] = useState(user);
    const [error, setError] = useState("");

    const [errorMessage, setErrorMessage] = useState(" ");

    return (
        <Screen style={styles.container} loading={loading}>
            <Form
                //initialValues={{ username: "", userType: "", password: "", mobile: "", email: "" }}
                initialValues={userData}
                onSubmit={(values: IUserFormValues) => {
                    debugger;
                    const { ...userData } = values;
                    let newUserData = { ...userData, username: uuid() }

                    console.log(newUserData);
                    register(newUserData)
                        .then((user) => {
                            debugger;
                            console.log(user);
                        })
                        .catch((err) => {
                            debugger;
                            setError("Error: " + err);
                        })
                }
                }

                validationSchema={validationSchema}
            >
                <AppRadio name="userType" />
                <FormField icon="account" maxLength={255} name="displayName" placeholder="Businessname" autoCapitalize="none" />
                <FormField icon="cellphone" maxLength={255} name="mobile" placeholder="Mobile" autoCapitalize="none" />
                <AppText numberOfLines={2}>(This mobile number will be used by seller to open the catalog)</AppText>
                <FormField icon="email" maxLength={255} name="email" placeholder="Email" autoCapitalize="none" />
                <FormField
                    name="password"
                    placeholder="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    secureTextEntry
                    textContentType="password"
                />

                <ErrorMessage numberOfLines={2} error={error} visible={error != ""} />

                <SubmitButton title="SUBMIT" />

                <AppButton
                    title="Back"
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

export default observer(RegisterForm);