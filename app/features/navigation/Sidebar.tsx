import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStoreContext } from '../../common/rootStore';
import { observer } from 'mobx-react-lite';
import { deleteToken } from '../../common/token';

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.target)}>
            <Ionicons name={item.icon} size={32} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
}

const Sidebar: React.FC<{ navigation: any }> = ({ navigation }) => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    const state = {
        routes: [
            {
                target: user?.UserRoles.includes("Supplier") ? "SupplierTab" : "ResellerTab",
                icon: "ios-home",
                title: user?.UserRoles.includes("Supplier") ? "Supplier Home" : "Reseller Home",
            },
            {
                target: "UserProfile",
                icon: "ios-contact",
                title: "User Profile"
            },
            {
                target: "Settings",
                icon: "ios-settings",
                title: "Settings"
            },
        ]
    }
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/user-dummy-200x200.png")} style={styles.profileImg} />
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>{user?.DisplayName}</Text>
            <Text style={{ color: "gray", marginBottom: 10 }}>{user?.Email}</Text>
            <View style={styles.sidebarDivider}></View>
            <FlatList
                style={{ width: "100%", marginLeft: 30 }}
                data={state.routes}
                renderItem={({ item }) => <Item item={item} navigate={navigation.navigate} />} //this.props.navigation.navigate
                keyExtractor={item => item.target}
            />



            <TouchableOpacity style={styles.listItem} onPress={() => {
                deleteToken().then((token) => {
                    navigation.navigate("WelcomeScreen");
                });
            }}>
                <Ionicons name="ios-log-out" size={32} />
                <Text style={styles.title}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

export default observer(Sidebar);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 40,
        alignItems: "center",
        flex: 1

    },
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
        marginLeft: 20
    },
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20
    },
    sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    }
});