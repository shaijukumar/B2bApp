import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuid } from "uuid";

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
import Screen from "../common/components/Screen";
import colors from "../config/colors";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RootStoreContext } from "../common/data/rootStore";
import { observer } from "mobx-react-lite";
import { Catlog } from "../common/models/catlog";
import ImageList from "../common/components/ImageList";

const validationSchema = Yup.object().shape({
    displayName: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    categoryId: Yup.object().required().nullable().label("Category"),
    description: Yup.string().required().min(1).label("Description"),
    // description: Yup.string().label("Description"),
});
  
export interface myProps extends NavigationStackScreenProps { }

const ListingEditScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, categoryList, loadCategoryItem, catalogItem, getCategoriesList, createItem, editItem, getListwithCategories } = rootStore.catlogStore;

    const [catlog, setCatlog] = useState(new Catlog());
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
 
    useEffect(() => {
        debugger;
        let id = navigation.getParam("itemId");
        //let id = "d98dfd57-c7e2-40ba-8ff0-5c6c33f14b64";//""; //
        setLoad(true);
        getCategoriesList()
            .then((cl) => {
                if (id) {
                    loadCategoryItem(id).then((cat) => {
                        cat.categoryId = cl.filter(x => x.id === cat.categoryId)[0];
                        setCatlog(new Catlog(cat));
                        setLoad(false);
                        console.log(catlog);
                    });
                }
                else {
                    setCatlog(new Catlog());
                    setLoad(false);
                    console.log(catlog);
                }
            })
    }, [getCategoriesList, loadCategoryItem]);

    const onCatalogSubmit = (values, { setErrors }) => {
        debugger;
        setLoad(true);
        console.log(values);

        const { ...catlog } = values;
        if (!catlog.id) {
            let newCatlog = {
                ...catlog,
                id: uuid()
            };
            let temp = newCatlog.categoryId;

            // newCatlog.categoryId = newCatlog.categoryId.id;
            // newCatlog.categoryId = temp;
            // setCatlog(new Catlog(newCatlog));

            newCatlog.categoryId = newCatlog.categoryId.id;
            createItem(newCatlog)
                .then(() => {
                    newCatlog.categoryId = temp;
                    setCatlog(new Catlog(newCatlog));
                    setLoad(false);
                });
        } else {
            debugger;
            let temp = catlog.categoryId;
            catlog.categoryId = catlog.categoryId.id;
            editItem(catlog)
                .then(() => {
                    catlog.categoryId = temp;
                    setCatlog(new Catlog(catlog));
                    setLoad(false);
                })
                .catch((err: string) => {
                    debugger;
                    setError("Error while update....");
                    console.log(err);
                    setLoad(false);
                })
        }
    };

 

    return (
        <Screen style={styles.container} loading={load}>

            <ImageList id={catlog.id} />

            <Form
                initialValues={catlog}
                onSubmit={onCatalogSubmit}
                validationSchema={validationSchema}
            >
                <FormField maxLength={255} name="displayName" placeholder="displayName1" />
                <FormField
                    //value={catlog.price}
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                    width={120}
                />
                <Picker
                    items={categoryList}
                    name="categoryId"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Category"
                    width="50%"
                />
                <FormField
                    //value={catlog.description}
                    maxLength={255}
                    multiline={true}
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />
                <SubmitButton title="Post" />

                <ErrorMessage error={error} visible={error != ""} />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.lightMedium,
    },
});
export default observer(ListingEditScreen);
