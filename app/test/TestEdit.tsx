import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import * as Yup from "yup";

import Screen from "../common/components/Screen";
import colors from "../config/colors";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RootStoreContext } from "../common/data/rootStore";
import { observer } from "mobx-react-lite";
import 'mobx-react-lite/batchingForReactNative'
import { Catlog } from "../common/models/catlog";
import { Formik, useFormikContext } from "formik";
import { SubmitButton, FormField, FormPicker } from "../common/forms";
import TFormField from "./TFormField";
import CategoryPickerItem from "../common/components/CategoryPickerItem";



export interface myProps extends NavigationStackScreenProps { }

const TestEdit: React.FC<myProps> = ({ navigation }) => {

  const rootStore = useContext(RootStoreContext);
  const {
    loadingInitial,
    categoryList,
    loadCategoryItem,
    catalogItem,
    getCategoriesList,
  } = rootStore.catlogStore;

  const [load, setLoad] = useState(false);
  const [catlog, setCatlog] = useState(new Catlog());

  useEffect(() => {
    //debugger;
    //let id = navigation.getParam("itemId");
    let id = "ecc19db4-f7c8-40a4-ba22-36f52d13cf45";//""; //
    setLoad(true);
    getCategoriesList().then((cl) => {

      if (id) {
        loadCategoryItem(id).then((cat) => {
          cat.categoryId = cl.filter(x => x.id === cat.categoryId)[0];
          setCatlog(new Catlog(cat));
          console.log(catlog);
          setLoad(false);
        });
      }
      else {
        setCatlog(new Catlog());
        setLoad(false);
      }
    });
  }, [getCategoriesList, loadCategoryItem]);

  const onCatalogSubmit = (values) => {
    console.log(values);
  };


  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  }

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required().min(1).label("displayName"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    // description: Yup.string().label("Description"),
    //category: Yup.object().required().nullable().label("Category"),
  });

  return (
    <Screen style={styles.container} loading={load}>

      <Text>Test 1</Text>

      <Formik
        initialValues={catlog}
        enableReinitialize
        onSubmit={values => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

          <View>

            <TFormField
              name="displayName"
              placeholder="displayName1"
            // value={values.displayName}
            // onChangeText={handleChange('displayName')}
            // onBlur={handleBlur('displayName')}
            />

            <TFormField
              name="price"
              placeholder="price"
              keyboardType="numeric"
            />

            <FormPicker
              items={categoryList}
              name="categoryId"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width="50%"

            //value={values.categoryId}
            />



            <SubmitButton title="Post" />
          </View>

        )}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    paddingTop: 64,
  }
});

export default observer(TestEdit);
