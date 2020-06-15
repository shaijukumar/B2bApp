import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
//import { NavigationStackScreenProps } from "react-navigation-stack";
import { NavigationParams } from 'react-navigation';

import * as Yup from "yup";

import { RootStoreContext } from '../../common/data/rootStore';
import { observer } from "mobx-react-lite";
import Screen from "../../common/components/Screen";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
    ErrorMessage,
} from "../../common/forms";

import { Catlog } from "../../common/models/catlog";
import AppMultiSelect from "../../common/forms/AppMultiSelect";
import SizePicker from "../../common/forms/SizePicker";
import ImageList from "../../common/components/ImageList";
import colores from "../../config/colors";
import defaultStyles from "../../config/styles";
import { NavigationStackScreenProps } from "react-navigation-stack";

//export interface myProps extends NavigationStackScreenProps { }
export interface myProps extends NavigationParams { }

const EditCatlog: React.FC<myProps> = ({ navigation, route }) => {

    const rootStore = useContext(RootStoreContext);
    const { configLoading, appConfigList, categorys, updateConfig, categoryGroup, colorList } = rootStore.configStore;
    const { loadingInitial, submitting, loadCategoryItem, createItem, editItem } = rootStore.catlogStore

    const [catList, setCatList] = useState(categorys)
    const [catId, setCatId] = useState("")
    const [catlogId, setCatlogId] = useState("")

    const [error, setError] = useState("");

    const [catlog, setCatlog] = useState(new Catlog());

    const validationSchema = Yup.object().shape({
        displayName: Yup.string().required().min(1).label("Title"),
        price: Yup.number().required().min(1).max(10000).label("Price"),
        categoryId: Yup.string().required().nullable().label("Category"),

        sizes: Yup.array().test('size', 'Select altelst one quantity',
            function (value) {
                //debugger;
                if (value.length > 0) {
                    //debugger;
                    //console.log('test-name : ' + value[0].title);
                    //return value;

                    let valid: Boolean = false;
                    value.forEach(val => {
                        //debugger;
                        if (val.qty) {
                            valid = true;
                        }
                    });
                    if (valid) {
                        return value;
                    }
                }
                else {
                    // debugger;
                    //return value;
                }
            })
    });

    const onCatalogSubmit = (values, { setErrors }) => {

        //debugger;
        //console.log(values);
        if (values.sizes.length > 0) {
            let slist: any[] = [];
            values.sizes.forEach((sz) => {
                if (sz.qty > 0) {
                    // let s: any = {};
                    // s.configid = sz.configid;
                    // s.title = sz.title;
                    // s.qty = Number(sz.qty);
                    slist.push(sz);
                }
            });
            values.sizes = slist;
        }
        //return;
        //debugger;
        if (!catlog.id) {
            console.log(values.id);
            createItem(values).then((cat) => {
                // console.log("\r\n\r\n===============================");
                // console.log(cat);
                setCatlog(new Catlog(cat));
                setCatId(values.categoryId);
            });
        }
        else {
            editItem(values)
                .then((cat) => {
                    setCatlog(new Catlog(cat));
                    setCatId(values.categoryId);
                    // setCatlog(new Catlog(catlog));               
                })
                .catch((err: string) => {
                    debugger;
                    setError("Error while update....");
                    console.log(err);
                })
        }
    }

    React.useEffect(() => {
        //debugger;
        //let catId = "4d3117ed-f774-4d61-f5a3-08d80dee5c65";
        //console.log(navigation);
        //console.log(route);
        let catId = "";
        //debugger;
        if (route.params) {
            //debugger;
            catId = route.params.itemId;
        }

        //console.log("id : " + catId);
        //debugger;
        if (catId) {
            loadCategoryItem(catId).then((cat) => {
                //debugger;
                // if (cat.colores.length > 0) {
                //     let cList: string[] = [];
                //     cat.colores.forEach((col) => {
                //         cList.push(col.configid);
                //     });

                //     cat.colores = cList;
                // }
                setCatlog(new Catlog(cat));
                setCatId(cat.categoryId);
                setCatlogId(cat.id);
            });
        }

    }, [loadCategoryItem])

    return (
        <Screen style={styles.container} loading={loadingInitial}>
            <SafeAreaView  >
                <ScrollView>
                    <Form
                        initialValues={catlog}
                        onSubmit={onCatalogSubmit}//{(v) => { console.log(v) }}
                        validationSchema={validationSchema}
                    >

                        <AppMultiSelect
                            items={categorys}
                            name="categoryId"
                            placeholder='Category'
                            selectSingleItem={true}
                            readOnlyHeadings={true}
                            onSelect={(cid) => {
                                // debugger;
                                setCatId(cid);
                            }} />

                        <FormField maxLength={255} name="displayName" placeholder="Product Name" />

                        <AppMultiSelect
                            items={colorList}
                            name="colores"
                            placeholder='Color'
                            selectSingleItem={false}
                            readOnlyHeadings={false} />


                        <FormField name="description" placeholder="Description" numberOfLines={3} multiline={true} />

                        <FormField
                            //value={catlog.price}
                            keyboardType="numeric"
                            maxLength={10}
                            name="price"
                            placeholder="Price"
                            width={120}
                        />

                        <SizePicker name="sizes" categoryId={catId} />

                        {catlog.id &&
                            <ImageList name="photos" categoryId={catlogId} />
                        }
                        {submitting ?
                            (<View style={{ flexDirection: 'row', backgroundColor: colores.lightMedium, paddingLeft: 30 }}>
                                <ActivityIndicator size="small" color={colores.primary} style={{ paddingRight: 30 }} />
                                <Text style={defaultStyles.text}  >Updating catlog...</Text>
                            </View>)
                            :
                            (catlog.id ?
                                (<SubmitButton title="Save" />)
                                :
                                (<SubmitButton title="Save and upload image" />)
                            )
                        }

                        <ErrorMessage error={error} visible={error != ""} />
                    </Form>
                </ScrollView>
            </SafeAreaView >
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});


export default observer(EditCatlog); 
