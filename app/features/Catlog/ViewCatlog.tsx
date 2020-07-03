import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../../forms";


import colors from "../../common/colors";
import defaultStyles from "../../common/styles";
import AppButton from "../../components/AppButton";
import { RootStoreContext } from "../../common/rootStore";
import { Catlog } from "./Catlog";
import Loader from "../../components/Loader";
import { ColorItem } from "../Config/configStore";
import SizeView from "../../forms/SizeView";
import SizePicker from "../../forms/SizePicker";

const ViewCatlog: React.FC<{ navigation: any, onBackToListing: any, catlogID: string }>
    = ({ navigation, onBackToListing, catlogID }) => {

        const rootStore = useContext(RootStoreContext);
        const { colorList } = rootStore.configStore;
        const { loadingInitial, submitting, loadCategoryItem, createItem, editItem } = rootStore.catlogStore;

        const [catlog, setCatlog] = useState(new Catlog());
        const [catId, setCatId] = useState("");
        const getColor = (colors: any[]) => {
            //debugger;
            var color = "";
            let colorID = "";
            var c: any;
            try {
                if (colors.length > 0) {
                    colorID = colors[0];
                    c = colorList.find((c) => c.Id == colorID)?.name;
                }
            }
            finally {
                c ? color = c : color = "";
                return color;
            }
        }

        const validationSchema = Yup.object().shape({

            // DisplayName: Yup.string().required().min(1).label("Title"),
            // Price: Yup.number().required().min(1).max(10000).label("Price"),
            // CategoryId: Yup.string().required().nullable().label("Category"),
        });

        React.useEffect(() => {
            //debugger;
            //console.log("ViewCatlog - useEffect")
            if (catlogID) {
                loadCategoryItem(catlogID).then((cat) => {
                    setTimeout(() => {
                        setCatlog(new Catlog(cat));
                        setCatId(cat.CategoryId);
                        //console.log(cat);
                    }, 200);
                });
            }
        }, [catlogID])

        const onCatalogSubmit = (values, { setErrors }) => {
            //debugger;
            //console.log(values);
            // if (values.Sizes.length > 0) {
            //     let slist: any[] = [];
            //     values.Sizes.forEach((sz) => {
            //         if (sz.Qty > 0) {
            //             // let s: any = {};
            //             // s.configid = sz.configid;
            //             // s.title = sz.title;
            //             // s.Qty = Number(sz.Qty);
            //             slist.push(sz);
            //         }
            //     });
            //     values.Sizes = slist;
            // }
            // //return;
            // //debugger;
            // if (!catlog.Id) {
            //     //console.log(values.Id);
            //     createItem(values).then((cat) => {
            //         // console.log("\r\n\r\n===============================");
            //         // console.log(cat);
            //         setCatlog(new Catlog(cat));
            //         setCatId(values.CategoryId);
            //         setCatlogId(cat.Id);
            //     });
            // }
            // else {
            //     editItem(values)
            //         .then((cat) => {
            //             setCatlog(new Catlog(cat));
            //             setCatId(values.CategoryId);
            //         })
            //         .catch((err: string) => {
            //             debugger;
            //             setError("Error while update....");
            //             console.log(err);
            //         })
            // }
        }

        return (
            <Loader style={styles.container} loading={loadingInitial}>
                <SafeAreaView  >
                    <ScrollView>
                        <Form
                            initialValues={catlog}
                            onSubmit={onCatalogSubmit}//{(v) => { console.log(v) }}
                            validationSchema={validationSchema}
                        >
                            <Text>DisplayName : {catlog.DisplayName} </Text>
                            <Text>Category : {catlog["Category"]} </Text>
                            <Text>Colores : {getColor(catlog.Colores)} </Text>
                            <Text>Description : {catlog.Description} </Text>
                            <Text>Price : {catlog.Price} </Text>
                            <Text>Sizes : ??</Text>
                            <SizeView name="Sizes" categoryId={catId} />
                            <Text>Photos :</Text>

                        </Form>

                    </ScrollView>
                </SafeAreaView>

                <AppButton title="Back to listing" onPress={onBackToListing} />
            </Loader>
        )
    }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default observer(ViewCatlog); 