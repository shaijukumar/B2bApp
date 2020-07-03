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
import Loader from "../../components/Loader";
import { RootStoreContext } from "../../common/rootStore";
import { OrderMaster } from "./OrderMaster";
import { ICatlog } from "../Catlog/Catlog";

const OrderForm: React.FC<{ navigation: any, onBackToListing: any, catlog: ICatlog }>
    = ({ navigation, onBackToListing, catlog }) => {

        const rootStore = useContext(RootStoreContext);
        const { submitting, createItem } = rootStore.orderMasterStore;

        const [order, setOrder] = useState(new OrderMaster());

        const validationSchema = Yup.object().shape({

            Qty: Yup.string().required().min(1).label("Title"),
            // Price: Yup.number().required().min(1).max(10000).label("Price"),
            // CategoryId: Yup.string().required().nullable().label("Category"),

        });

        const onOrderSubmit = (values, { setErrors }) => {
            values.Status = "In Progress";
            values.Color = catlog.Colores[0];
            values.Catalog = catlog.CategoryId;

            createItem(values).then((cat) => {
                //
            });
        }

        return (
            <Loader style={styles.container} >
                <SafeAreaView  >
                    <ScrollView>
                        <Form
                            initialValues={order}
                            onSubmit={onOrderSubmit}
                            validationSchema={validationSchema}
                        >
                            <FormField
                                keyboardType="numeric"
                                maxLength={10}
                                name="Qty"
                                placeholder="Qty"
                                width={120}
                            />

                            <FormField name="ShippingAddress" placeholder="ShippingAddress" numberOfLines={3} multiline={true} />
                            <FormField name="BillingAddress" placeholder="BillingAddress" numberOfLines={3} multiline={true} />



                            {/* Id: string = "";
                            Reseller: string = "";
                            Supplier: string = "";
                            Catalog: string = "";
                                Qty: number = 0;
                            Size: string = "";
                                Color: string = "";
                                ShippingAddress: string = "";
                                BillingAddress: string = "";
                                Status: string = "";
                            Transactions: IOrderTransactions[] = []; */}
                        </Form>

                    </ScrollView>
                </SafeAreaView>
            </Loader>
        )
    }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default observer(OrderForm); 