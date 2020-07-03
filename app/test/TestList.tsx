import React, { useState } from "react";
import { Text, FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../config/colors";

const TestList: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View >
            <Text>Reseller Home11</Text>

            <FlatList
                data={litstItems.items}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("ResellerCatlogListItem")} >
                        <View style={styles.listItem}>
                            <Ionicons name={item.icon} size={50} />
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default TestList;

const styles = StyleSheet.create({

    listItem: {
        padding: 5,
        marginTop: 3,
        backgroundColor: colors.lightMedium,
        flexDirection: "row",
        borderRadius: 10
    },
})

const litstItems = {
    items: [
        { id: 1, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 2, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 3, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 4, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 5, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 6, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 7, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 8, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 9, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 10, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 11, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 12, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 13, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 14, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 15, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 16, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 17, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 18, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 19, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 20, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 21, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 22, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 23, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 24, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 25, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 26, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 27, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 28, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 29, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
        { id: 30, name: 'ResellerTab', icon: 'ios-home', title: 'Reseller' },
    ]
}