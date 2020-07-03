import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useFormikContext } from "formik";
import { observer } from "mobx-react-lite";
import colors from "../config/colors";
import ErrorMessage from "./ErrorMessage";

const AppMultiSelect: React.FC<{
    items: any,
    name: string,
    placeholder: string,
    readOnlyHeadings: boolean,
    selectSingleItem: boolean,
    onSelect?: any,
}>
    = ({
        items,
        name,
        placeholder,
        readOnlyHeadings = false,
        selectSingleItem = false,
        onSelect = () => { }
    }) => {

        const { errors, setFieldValue, touched, values, setFieldTouched } = useFormikContext();
        let t2: any[] = []
        const [selectedItems, setSelectedItems] = useState(t2); //((values as any)[name]); //([]); //([(values as any)[name]])       

        const [t, st] = useState(false);

        useEffect(() => {
            let selectedVal = (values as any)[name];
            if (selectedVal) {
                if (selectSingleItem) {
                    setSelectedItems([selectedVal]);
                }
                else {
                    //setSelectedItems(["BLUE", "GREEN"]);
                    setSelectedItems(selectedVal)
                    //debugger;
                    //console.log(selectedVal);
                }
            }


            // if (selectedVal) {
            //     debugger;
            //     //setSelectedItems(selectedVal);
            // }

        }, [(values as any)[name]])

        const OnItemSelect = (s) => {
            //console.log("useEffect =============== OnItemSelect : " + s)
            //debugger;
            setSelectedItems(s);

            if (selectSingleItem) {
                if (s.length > 0) {

                    (values as any)[name] = s[0];
                }
                else {
                    (values as any)[name] = "";
                }
            }
            else {
                (values as any)[name] = s;
            }
            onSelect(s);
            setFieldTouched(name, true);
        };

        return (
            <View style={styles.selectView}>
                <SectionedMultiSelect
                    items={items}
                    uniqueKey='Id'
                    subKey='children'
                    selectText={placeholder}
                    searchPlaceholderText={placeholder}
                    showDropDowns={false}
                    readOnlyHeadings={readOnlyHeadings}
                    onSelectedItemsChange={OnItemSelect} //{setSelectedItems}
                    selectedItems={selectedItems}
                    single={selectSingleItem}
                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </View>
        );
    }

const styles = StyleSheet.create({
    selectView: {
        backgroundColor: colors.lightMedium,
        marginVertical: 5,
        borderRadius: 10,
        // height: 60,

    },
});

export default observer(AppMultiSelect);


