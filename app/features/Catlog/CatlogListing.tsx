import * as React from 'react';
import { useContext, useState, useEffect } from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { observer } from "mobx-react-lite";
import { FlatList } from "react-native-gesture-handler";
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native'

import colors from "../../config/colors";
import { SearchBar } from 'react-native-elements';
import { RootStoreContext } from '../../common/rootStore';
import Loader from '../../components/Loader';

export interface myProps extends NavigationStackScreenProps { }

const CatlogListing: React.FC<{ navigation: any, onBackToListing: any, onItemClick: any, SupplierPhone?: string }>
    = ({ navigation, onBackToListing, onItemClick, SupplierPhone = "" }) => {

        const rootStore = useContext(RootStoreContext);
        const { user } = rootStore.userStore;
        const { loadingInitial, itemList, getList, ResellerCatalogList } = rootStore.catlogStore;

        const [catalogList, setCatalogList] = useState(itemList);
        const [searchText, setSearchText] = useState("");

        useEffect(() => {
            //console.log("useEffect : CatlogListing : SupplierPhone : " + SupplierPhone);
            if (user?.UserRoles.includes("Supplier")) {
                getList().then((lst) => {
                    setCatalogList(lst ? lst : []);
                })
            }
            else if (SupplierPhone) {
                ResellerCatalogList(SupplierPhone).then((lst) => {
                    setCatalogList(lst ? lst : []);
                })
            }

        }, [getList, ResellerCatalogList]);

        const searchFilterFunction = text => {
            debugger;
            setSearchText(text);
            if (text) {
                const newData = itemList.filter(item => {
                    const textData = text.toUpperCase();
                    return item.DisplayName.toUpperCase().indexOf(textData) > -1;
                });
                setCatalogList(newData);
            }
            else {
                setCatalogList(itemList);
            }
        };

        return (
            <Loader loading={loadingInitial}>
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
                    keyExtractor={(listing) => listing.Id ? listing.Id : '-'}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.Id}
                            onPress={() => { onItemClick(item.Id) }}>
                            <View style={styles.listItem}>

                                {item.ImageUrl ?
                                    (<Image source={{ uri: item.ImageUrl }} style={styles.image} />)
                                    :
                                    (<Image source={require("../../assets/no-image-box.png")} style={styles.image} />)
                                }
                                <Text style={styles.listItemText}>
                                    {item.DisplayName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </Loader>
        );
    }

const styles = StyleSheet.create({

    listItem: {
        padding: 5,
        marginTop: 3,
        backgroundColor: colors.lightMedium,
        flexDirection: "row",
        borderRadius: 10
    },
    listItemText: {
        alignItems: "flex-start",
        textAlignVertical: 'center',
        color: colors.black,
        height: 50,
        paddingLeft: 10,
    },
    image: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 50,
        height: 50
    }
})

export default observer(CatlogListing);