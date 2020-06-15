import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { v4 as uuid } from "uuid";

import { RootStoreContext } from '../common/data/rootStore';
import { observer } from "mobx-react-lite";
import Screen from "../common/components/Screen";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
    ErrorMessage,
    // TouchableOpacity,
    // Text, 
    // View,
} from "../common/forms";
import CategoryPickerItem from "../common/components/CategoryPickerItem";
import AppFormMultiPicker from "../common/forms/AppFormMultiPicker";
import ColorPickerItem from "../common/components/ColorPickerItem";
import { Catlog } from "../common/models/catlog";
import AppMultiSelect from "../common/forms/AppMultiSelect";
import SizePicker from "../common/forms/SizePicker";
import ImageList from "../common/components/ImageList";

export interface myProps extends NavigationStackScreenProps { }

const Dashboard: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { configLoading, appConfigList, categorys, getColorList, updateConfig, categoryGroup } = rootStore.configStore;
    const { loadingInitial, loadCategoryItem, createItem } = rootStore.catlogStore;

    const [catList, setCatList] = useState(categorys)
    const [catId, setCatId] = useState("")

    const [error, setError] = useState("");

    const [catlog, setCatlog] = useState(new Catlog());

    // useEffect(() => {
    //     let id = navigation.getParam("itemId");
    //     if (id) {
    //         loadCategoryItem(id);
    //     }
    //     else {
    //         setCatlog(new Catlog());
    //     }

    // }, [loadCategoryItem]);

    const onCatalogSubmit = (values, { setErrors }) => {
        //const { ...catlog } = values;
        if (!catlog.id) {
            createItem(values)
                .then((cat) => {
                    debugger;
                    setCatlog(cat);
                });
        }
    }

    // React.useEffect(() => {
    //     //debugger;
    //     if (categoryGroup.length == 0 || appConfigList.length == 0) {
    //         //console.log("updateConfig");
    //         updateConfig();
    //     }
    // }, [updateConfig])

    return (
        <Screen style={styles.container} loading={configLoading}>
            <SafeAreaView >
                <ScrollView>
                    <Form
                        initialValues={catlog}
                        onSubmit={(v) => { console.log(v) }}
                        //validationSchema={validationSchema}
                    >

                        <AppMultiSelect
                            items={categorys}
                            name="categoryId"
                            placeholder='Category'
                            selectSingleItem={true}
                            readOnlyHeadings={true}
                            onSelect={(cid) => { setCatId(cid) }} />

                        <FormField maxLength={255} name="displayName" placeholder="Product Name" />

                        <AppMultiSelect
                            items={getColorList}
                            name="colores"
                            placeholder='Color'
                            selectSingleItem={false}
                            readOnlyHeadings={false} />

                        <FormField maxLength={255} name="description" placeholder="Description" numberOfLines={3} />

                        <FormField
                            //value={catlog.price}
                            keyboardType="numeric"
                            maxLength={10}
                            name="price"
                            placeholder="Price"
                            width={120}
                        />

                        <SizePicker name="size" categoryId={catId} />

                        {/* <ImageList id={catlog.id} /> */}

                        <SubmitButton title="Post" />

                        <ErrorMessage error={error} visible={error != ""} />
                    </Form>
                </ScrollView>
            </SafeAreaView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});


export default observer(Dashboard); 
