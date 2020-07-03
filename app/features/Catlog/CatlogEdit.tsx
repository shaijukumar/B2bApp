import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../../forms";

import colors from "../../common/colors";
import defaultStyles from "../../common/styles";
import DrawerScreen from "../navigation/DrawerScreen";
import AppButton from "../../components/AppButton";
import { RootStoreContext } from "../../common/rootStore";


import { Catlog } from "./Catlog";
import Loader from "../../components/Loader";
import AppMultiSelect from "../../forms/AppMultiSelect";
import SizePicker from "../../forms/SizePicker";
import ImageList from "../../components/ImageList";
import { useFormikContext } from "formik";

const CatlogEdit: React.FC<{ navigation: any, onBackToListing: any, catlogID: string }>
    = ({ navigation, onBackToListing, catlogID }) => {

        const rootStore = useContext(RootStoreContext);
        const { colorList, categorys } = rootStore.configStore;
        const { loadingInitial, submitting, loadCategoryItem, createItem, editItem } = rootStore.catlogStore;

        const [catlog, setCatlog] = useState(new Catlog());
        const [catId, setCatId] = useState("");
        const [error, setError] = useState("");
        const [catlogId, setCatlogId] = useState("")

        const validationSchema = Yup.object().shape({

            DisplayName: Yup.string().required().min(1).label("Title"),
            Price: Yup.number().required().min(1).max(10000).label("Price"),
            CategoryId: Yup.string().required().nullable().label("Category"),
            //Color: Yup.array().required().nullable().label("Color"),
            Sizes: Yup.array().test('size', 'Select atleast one quantity',
                function (value) {
                    //debugger;
                    if (value.length > 0) {
                        //debugger;
                        //console.log('test-name : ' + value[0].title);
                        //return value;

                        let valid: Boolean = false;
                        value.forEach(val => {
                            //debugger;
                            if (val.Qty) {
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
            if (values.Sizes.length > 0) {
                let slist: any[] = [];
                values.Sizes.forEach((sz) => {
                    if (sz.Qty > 0) {
                        // let s: any = {};
                        // s.configid = sz.configid;
                        // s.title = sz.title;
                        // s.Qty = Number(sz.Qty);
                        slist.push(sz);
                    }
                });
                values.Sizes = slist;
            }
            //return;
            //debugger;
            if (!catlog.Id) {
                //console.log(values.Id);
                createItem(values).then((cat) => {
                    // console.log("\r\n\r\n===============================");
                    // console.log(cat);
                    setCatlog(new Catlog(cat));
                    setCatId(values.CategoryId);
                    setCatlogId(cat.Id);
                });
            }
            else {
                editItem(values)
                    .then((cat) => {
                        setCatlog(new Catlog(cat));
                        setCatId(values.CategoryId);
                    })
                    .catch((err: string) => {
                        debugger;
                        setError("Error while update....");
                        console.log(err);
                    })
            }
        } 

        React.useEffect(() => {

            // let catId = catlogID;
            // if (navigation.state.params) {
            //     catId = navigation.state.params.itemId;
            // }
            //debugger;
            console.log("CatlogEdit - useEffect")
            if (catlogID) {
                loadCategoryItem(catlogID).then((cat) => {


                    setTimeout(() => {
                        setCatlog(new Catlog(cat));
                        setCatId(cat.CategoryId);
                        setCatlogId(cat.Id)
                    }, 200);

                    ;
                });
            }
        }, [loadCategoryItem])

        return (
            <Loader style={styles.container} loading={loadingInitial}>
                <SafeAreaView  >
                    <ScrollView>
                        <Form
                            initialValues={catlog}
                            onSubmit={onCatalogSubmit}//{(v) => { console.log(v) }}
                            validationSchema={validationSchema}
                        >

                            <AppMultiSelect
                                items={categorys}
                                name="CategoryId"
                                placeholder='Category'
                                selectSingleItem={true}
                                readOnlyHeadings={true}
                                onSelect={(cid) => {
                                    // debugger;
                                    setCatId(cid);
                                }} />

                            <FormField maxLength={255} name="DisplayName" placeholder="Product Name" />

                            <AppMultiSelect
                                items={colorList}
                                name="Color"
                                placeholder='Color'
                                selectSingleItem={true}
                                readOnlyHeadings={false} />


                            <FormField name="Description" placeholder="Description" numberOfLines={3} multiline={true} />

                            <FormField
                                //value={catlog.price}
                                keyboardType="numeric"
                                maxLength={10}
                                name="Price"
                                placeholder="Price"
                                width={120}
                            />

                            <SizePicker name="Sizes" categoryId={catId} />

                            {catlog.Id &&
                                <ImageList name="Photos" categoryId={catlogId} />
                            }
                            {submitting ?
                                (<View style={{ flexDirection: 'row', backgroundColor: colors.lightMedium, paddingLeft: 30 }}>
                                    <ActivityIndicator size="small" color={colors.primary} style={{ paddingRight: 30 }} />
                                    <Text style={defaultStyles.text}  >Updating catlog...</Text>
                                </View>)
                                :
                                (catlog.Id ?
                                    (<SubmitButton title="Save" />)
                                    :
                                    (<SubmitButton title="Save and upload image" />)
                                )
                            }

                            <AppButton title="Back to listing" onPress={onBackToListing} />
                            <ErrorMessage error={error} visible={error != ""} />
                        </Form>
                    </ScrollView>
                </SafeAreaView >
            </Loader>
        );
    }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default observer(CatlogEdit); 