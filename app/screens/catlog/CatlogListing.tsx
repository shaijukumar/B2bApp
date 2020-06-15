import * as React from 'react';
import { useContext, useState, useEffect } from "react";

import { NavigationStackScreenProps } from "react-navigation-stack";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../common/data/rootStore";

import Screen from "../../common/components/Screen";
import { FlatList } from "react-native-gesture-handler";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import RightBottomButton from "../../common/components/RightBottomButton";
import Card from "../../common/components/Card";
import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
import colors from "../../config/colors";
import ListingEditScreen from '../ListingEditScreen';
import { SearchBar } from 'react-native-elements';
import { ICatlog } from '../../common/models/catlog';

export interface myProps extends NavigationStackScreenProps { }

const CatlogListing: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, itemList, getList } = rootStore.catlogStore;

    const [catalogList, setCatalogList] = useState(itemList);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        //debugger;
        getList().then((lst) => {
            setCatalogList(lst ? lst : []);
            //debugger;
            //console.log(itemList);
        })
    }, [getList]);

    const searchFilterFunction = text => {
        debugger;
        setSearchText(text);
        if (text) {
            const newData = itemList.filter(item => {
                const textData = text.toUpperCase();
                return item.displayName.toUpperCase().indexOf(textData) > -1;
            });
            setCatalogList(newData);
        }
        else {
            setCatalogList(itemList);
        }
    };

    return (
        <Screen style={styles.screen} loading={loadingInitial}>
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => searchFilterFunction(text)}
                autoCorrect={false}
                value={searchText}
            />
            
            <FlatList
                data={catalogList}
                keyExtractor={(listing) => listing.id ? listing.id : '-'}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.container}
                        onPress={() => { navigation.navigate("EditCatlog", { itemId: item.id }); }}>
                        <Text style={styles.text}>
                            {item.displayName}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <RightBottomButton
                onPress={() => { navigation.navigate("EditCatlog") }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
    container: {
        padding: 5,
        marginTop: 3,
        backgroundColor: colors.lightMedium,
    },
    text: {
        alignItems: "flex-start",
        textAlignVertical: 'center',      
        color: colors.black,
        height: 50,
        paddingLeft: 10,
    }
})

export default observer(CatlogListing);