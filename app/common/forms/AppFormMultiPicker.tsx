import React, { useState, Fragment } from "react";
import { View, StyleSheet, Text, Modal, Button, FlatList } from "react-native";
import { CheckBox } from 'react-native-elements'; 
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as _ from "lodash";

import defaultStyles from "../../config/styles";
import ErrorMessage from "./ErrorMessage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import AppText from "../components/AppText";
import Screen from "./../components/Screen";


// <AppFormMultiPicker
// items={categories1}
// name="colores"
// numberOfColumns={3}
// PickerItemComponent={ColorPickerItem}
// placeholder="Category"
// width="100%"
// />

const AppFormMultiPicker: React.FC<{
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
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={[styles.container, { width }]}>
                        <MaterialCommunityIcons
                            name="format-color-fill"
                            size={30}
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
                            data={colorList}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            renderItem={({ item }) => (

                                <View style={{ height: 60, width: 140, marginVertical: 15, backgroundColor: item.code, marginHorizontal: 5, borderRadius: 25 }} >
                                    <CheckBox
                                        title={item.name}
                                        checked={item.selected}
                                        onPress={() => {
                                            //debugger;
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
                </Modal>
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


class color {
    id: number = 0;
    name: string = "";
    code: string = "";
    selected: boolean = false;
    constructor(init: color) {
        Object.assign(this, init);
    }
}

const colorList: color[] = [
    new color({ id: 1, name: 'WHITE', code: '#FFFFFF', selected: false }),
    new color({ id: 2, name: 'SILVER', code: '#C0C0C0', selected: false }),
    new color({ id: 3, name: 'GRAY', code: '#808080', selected: false }),
    new color({ id: 4, name: 'BLACK', code: '#000000', selected: false }),
    new color({ id: 5, name: 'RED', code: '#FF0000', selected: false }),
    new color({ id: 6, name: 'MAROON', code: '#800000', selected: false }),
    new color({ id: 7, name: 'YELLOW', code: '#FFFF00', selected: false }),
    new color({ id: 8, name: 'OLIVE', code: '#808000', selected: false }),
    new color({ id: 9, name: 'LIME', code: '#00FF00', selected: false }),
    new color({ id: 10, name: 'GREEN', code: '#008000', selected: false }),
    new color({ id: 11, name: 'AQUA', code: '#00FFFF', selected: false }),
    new color({ id: 12, name: 'TEAL', code: '#008080', selected: false }),
    new color({ id: 13, name: 'BLUE', code: '#0000FF', selected: false }),
    new color({ id: 14, name: 'NAVY', code: '#000080', selected: false }),
    new color({ id: 15, name: 'FUCHSIA', code: '#FF00FF', selected: false }),
    new color({ id: 16, name: 'PURPLE', code: '#800080', selected: false }),

];

export default AppFormMultiPicker;
