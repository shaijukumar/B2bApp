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
import { Catlog } from "../common/models/catlog";
import { Formik } from "formik";

import {
  Form,
  FormField,
  SubmitButton,
  // TouchableOpacity,
  // Text,
  // View,
} from "../common/forms";

// import Input from "./Input";
// import Button from "./Button";

export interface myProps extends NavigationStackScreenProps { }

const TestEdit1: React.FC<myProps> = ({ navigation }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingInitial,
    categoryList,
    loadCategoryItem,
    catalogItem,
    getCategoriesList,
  } = rootStore.catlogStore;

  const [catlog, setCatlog] = useState(new Catlog());

  // useEffect(() => {
  //   //debugger;
  //   //let id = navigation.getParam("itemId");
  //   let id = "ecc19db4-f7c8-40a4-ba22-36f52d13cf45";
  //   getCategoriesList().then(() => {
  //     if (id) {
  //       loadCategoryItem(id).then((cat) => {
  //         debugger;
  //         setCatlog(new Catlog(cat));
  //         //console.log(catlog);
  //       });
  //     }
  //   });
  // }, [getCategoriesList, loadCategoryItem]);

  //const [test, setTest] = useState("abc");



  // const ValidationSchema = Yup.object().shape({
  //   email: Yup.string().min(2, "Minimun length of 2").required("Required"),
  //   password: Yup.string().min(2, "Minimun length of 2").required("Required"),
  // });

  const initialValues = {
    displayName: "123",
    price: 11,
    description: "catlog.description",
    category: "catlog.categoryId",
  };

  const onCatalogSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    // price: Yup.number().required().min(1).max(10000).label("Price"),
    // description: Yup.string().label("Description"),
    // category: Yup.object().required().nullable().label("Category"),
  });

  return (
    <Screen style={styles.container}>
      {/* <TextInput
        onChangeText={text => setTest(text)}
        value={test}
      /> */}

      <Formik
        initialValues={initialValues}
        onSubmit={onCatalogSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <>
              <FormField maxLength={255} name="displayName" placeholder="displayName1" />
              {/* <SubmitButton title="Post3" /> */}
              <Button title="Submit" onPress={onCatalogSubmit} />
            </>
          )
        }}
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
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
  },
  formAction: {},
  conditionText: {
    marginVertical: 10,
    textAlign: "center",
  },
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signInText: {
    color: "rgb(51,130,246)",
  },
});

export default observer(TestEdit);
