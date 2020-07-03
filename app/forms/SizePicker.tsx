import React, { useState, Fragment, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, Platform } from "react-native";
import { CheckBox } from 'react-native-elements';

import { useFormikContext } from "formik";
import { RootStoreContext } from "../common/rootStore";
import { observer } from "mobx-react-lite";

import colores from "../config/colors";

import {
    ICategorySize,
    CategorySize,
} from "../features/Catlog/Category";

import colors from "../config/colors";
import ErrorMessage from "./ErrorMessage";

const SizePicker: React.FC<{
    //items: any,
    name: string,
    categoryId: string,
    placeholder?: string,

    // readOnlyHeadings: boolean,
    // selectSingleItem: boolean,
}>
    = ({
        //items: any,
        name,
        categoryId = "Size",
        placeholder,
        // readOnlyHeadings = false,
        // selectSingleItem = false
    }) => {

        const rootStore = React.useContext(RootStoreContext);
        const { appConfigListCategory, categoryList, getSizeList, appConfigList } = rootStore.configStore;

        const { setFieldTouched, handleChange, errors, setFieldValue, touched, values, validateField } = useFormikContext();
        let configs: ICategorySize[] = [];
        const [items, setItems] = useState(configs); //([(values as any)[name]])
        //const [val, setVal] = useState([]);
        //const [Qty, setQty] = useState('');

        const [t, st] = useState(false);

        useEffect(() => {
            //console.log("SizePicker : " + name + " : " + (values as any)[name]);
            //debugger;
            if (categoryId) {
                //let s = getSizeList(categoryId, appConfigList, categoryList);
                //(values as any)[name] = items;
                let SizVal = getSizeList(categoryId, (values as any)[name], appConfigList, categoryList);
                (values as any)[name] = SizVal;
                setItems(SizVal);

            }
        }, [categoryId])

        // const OnItemSelect = (s) => {
        //     debugger;
        //     setSelectedItems(s);
        //     (values as any)[name] = s;
        // };

        return (



            <View>
                {items.length > 0 &&
                    items.map((item) => (
                        <View key={item.configid} style={styles.viewList}>
                            <View style={styles.viewSelect}>
                                <CheckBox
                                    title={item.Title}
                                    checked={item.selected}
                                    onPress={() => {
                                        //debugger;
                                        item.selected = !item.selected;
                                        item.Qty = 0;
                                        st(!t);
                                        setItems(items);
                                        (values as any)[name] = items;
                                    }}
                                    textStyle={{ backgroundColor: colores.white, color: colores.black, height: 30 }}
                                    containerStyle={{ borderColor: colores.white, borderWidth: 5, width: 150 }}
                                />
                            </View>
                            <View style={styles.viewQty}>
                                <TextInput
                                    placeholder="Qty"
                                    style={styles.QtyTextbox}
                                    keyboardType="numeric"
                                    editable={item.selected}
                                    onChangeText={val => { item.Qty = Number(val); setItems(items); st(!t) }}
                                    maxLength={3}
                                    value={item.Qty == 0 ? "" : item.Qty?.toString()} //{item.Qty?.toString()}
                                />
                            </View>
                        </View>
                    ))
                }
                <ErrorMessage error={errors[name]} visible={touched[name]} />

            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingVertical: 6,
        paddingLeft: 5,
        alignItems: "flex-start",
        width: "90%",
    },
    flatlist: {
        backgroundColor: colores.lightMedium,
    },
    viewList: {
        alignItems: "flex-start",
        marginVertical: 3,
        flex: 1,
        flexDirection: "row",
    },
    viewSelect: {
        alignItems: "flex-start",
        height: 30,
    },
    viewQty: {
        marginVertical: 3,
        alignItems: "center",
        width: 60,

    },
    QtyTextbox: {
        color: colors.dark,
        fontSize: 16,
        height: 30,
        width: 40,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        backgroundColor: colores.white,
        borderRadius: 5
    },
});

export default observer(SizePicker);


