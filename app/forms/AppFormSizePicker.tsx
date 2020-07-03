import React, { useState, Fragment } from "react";
import { View, StyleSheet, Text, Modal, Button, FlatList } from "react-native";
import { CheckBox } from 'react-native-elements';
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as _ from "lodash";

import defaultStyles from "../config/styles";
import ErrorMessage from "./ErrorMessage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import AppText from "../components/AppText";
import Screen from "../components/Screen";

const AppFormSizePicker: React.FC<{
    items: any,
    name: string,
    numberOfColumns: number
    PickerItemComponent: any,
    placeholder: string,
    width: string,
}> = ({
    items,
    name,
    numberOfColumns,
    placeholder,
    width,
}) => {
        const { errors, setFieldValue, touched, values } = useFormikContext();
        const [modalVisible, setModalVisible] = useState(false);
        const [t, st] = useState(false);

        return (
            <>
                {/* <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={[styles.container, { width }]}>
                        <MaterialCommunityIcons
                            name="format-color-fill"
                            Size={30}
                            color={defaultStyles.colors.primary}
                        />

                        {(values as any)[name].length > 0 ? (
                            <Fragment>
                                {
                                    (values as any)[name].map((it: color) => (
                                        <Text key={it.id} style={{ flex: 1, backgroundColor: it.code }}>{`${it.name}`}</Text>
                                    ))
                                }
                            </Fragment>
                        ) : (
                                <AppText style={styles.placeholder}>Select Color</AppText>
                            )}


                    </View>
                </TouchableWithoutFeedback>
                <ErrorMessage error={errors[name]} visible={touched[name]} />
                <Modal visible={modalVisible} animationType="slide">
                    <Screen>
                        <Button title="Select Color" onPress={() => setModalVisible(false)} />
                        <FlatList
                            data={sizeList}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            renderItem={({ item }) => (

                                <View style={{ height: 60, width: 140, marginVertical: 15, backgroundColor: item.code, marginHorizontal: 5, borderRadius: 25 }} >
                                    <CheckBox
                                        title={item.name}
                                        checked={item.selected}
                                        onPress={() => {
                                            debugger;
                                            item.selected = !item.selected;
                                            st(!t);
                                            if (item.selected) {
                                                (values as any)[name].push(item);
                                            }
                                            else {
                                                _.remove((values as any)[name], function (n: any) {
                                                    return n.id == item.id;
                                                });
                                            }
                                        }}
                                        textStyle={{ backgroundColor: item.code, color: item.code.startsWith('#FF') ? '#000000' : '#FFFFFF' }}
                                        containerStyle={{ backgroundColor: item.code, borderColor: item.code }}
                                    />
                                </View>
                            )}
                        />
                    </Screen>
                </Modal> */}
            </>
        );
    }

const styles = StyleSheet.create({
    colorView: {

    },
    container: {
        backgroundColor: defaultStyles.colors.lightMedium,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
    },
});


class Size {
    id: string = "0";
    name: string = "";
    quantity: number = 0;
    color: string = "NA";
    selected: boolean = false;
    constructor(init: Size) {
        Object.assign(this, init);
    }
}

const sizeList = [
    { name: 'XS' },
    { name: 'S' },
    { name: 'M' },
    { name: 'L' },
    { name: 'XL' },
    { name: 'XXL' },
];

export default AppFormSizePicker;
