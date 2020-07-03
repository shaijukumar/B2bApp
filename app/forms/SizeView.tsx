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

const SizeView: React.FC<{
    name: string,
    categoryId: string,
}>
    = ({
        name,
        categoryId = "Size",
    }) => {

        const rootStore = React.useContext(RootStoreContext);
        const { appConfigListCategory, categoryList, getSizeList, appConfigList } = rootStore.configStore;

        const { setFieldTouched, handleChange, errors, setFieldValue, touched, values, validateField } = useFormikContext();

        let configs: ICategorySize[] = [];
        const [items, setItems] = useState(configs);

        const [t, st] = useState(false);

        useEffect(() => {
            //debugger;
            if (categoryId) {
                //console.log((values as any)[name]);
                let SizVal = getSizeList(categoryId, (values as any)[name], appConfigList, categoryList);
                (values as any)[name] = "";
                setItems(SizVal);
            }
        }, [categoryId])

        const onItemSelect = (item) => {
            debugger;
            item.OrderSelected = true;

            items.forEach(i => {
                if (i.configid == item.configid) {
                    i.OrderSelected = true;
                }
                else {
                    i.OrderSelected = false;
                }
            });
            st(!t);
            setItems(items);
        }

        return (
            <View style={styles.sizeContainer}>
                {items.length > 0 &&
                    items.map((item) => (
                        <View style={item.OrderSelected ? styles.seletedSize : styles.unselectedSize} key={item.configid}>

                            {item.selected ?
                                (
                                    <TouchableOpacity style={styles.sizeList}
                                        onPress={() => onItemSelect(item)}
                                    >
                                        <Text style={styles.sizeText}>
                                            {item.Title}({item.Qty})
                                    </Text>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View style={styles.sizeNotAvalaiable}>
                                        <Text style={styles.sizeText}>
                                            {item.Title}({item.Qty})
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    ))
                }
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </View>
        );
    }

const styles = StyleSheet.create({
    sizeContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sizeList: {
        // marginVertical: 3,
    },
    sizeNotAvalaiable: {
        // marginVertical: 3,
        backgroundColor: colores.light,
    },
    seletedSize: {
        backgroundColor: colores.primary,
        borderWidth: 5,
        borderColor: colores.white,
    },
    unselectedSize: {
        backgroundColor: colores.secondary,
        borderWidth: 5,
        borderColor: colores.white,
    },
    sizeText: {
        height: 30,
        width: 100,
        textAlign: "center",
        textAlignVertical: "center",
        marginRight: 5,
        paddingEnd: 10,

    },
});

export default observer(SizeView);


