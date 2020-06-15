import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, } from 'react-native-paper';

import defaultStyles from "../../config/styles"
import { useFormikContext } from 'formik';
import ErrorMessage from "../forms/ErrorMessage";

const AppRadio: React.FC<{ name: string }> = ({ name }) => {
    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

    const state = { checked: (values as any)[name], };
    const [checked, setChecked] = React.useState(state)

    return (
        <>
            <View style={styles.container}>
                <RadioButton.Group
                    onValueChange={value => {
                        (values as any)[name] = value;
                        setChecked({ checked: value });
                    }}
                    value={(values as any)[name]}
                >
                    <View style={styles.ButtonGroup}>                        
                        <View style={styles.Button} >
                            <RadioButton value="Supplier" />
                            <Text style={defaultStyles.text} >I am a Supplier</Text>
                        </View>
                        <View style={styles.Button} >

                            <RadioButton value="Reseller" />
                            <Text style={defaultStyles.text}>I am a Reseller</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 3,
        marginVertical: 4,
    },
    ButtonGroup: {
        flexDirection: "row",
        flex: 1,
    },
    Button: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
});

export default AppRadio;
