import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { RootStoreContext } from '../common/data/rootStore';
import { observer } from "mobx-react-lite";
import Screen from "../common/components/Screen";

export interface myProps extends NavigationStackScreenProps { }

const ReturnsScreen: React.FC<myProps> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { configLoading, categoryList, appConfigList } = rootStore.configStore;

    return (
        <Screen style={styles.container} loading={configLoading}>
            <Text>Returns Screen</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default observer(ReturnsScreen); 
