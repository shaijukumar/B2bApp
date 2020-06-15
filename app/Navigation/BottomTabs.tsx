import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationParams } from 'react-navigation';

import Dashboard from '../screens/Dashboard';
import { RootStoreContext } from '../common/data/rootStore';
import OrderScreen from '../screens/OrderScreen';
import ReturnsScreen from '../screens/ReturnsScreen';
import CatlogScreen from '../screens/CatlogScreen';
import EditCatlog from '../screens/catlog/EditCatlog';
import CatlogListing from '../screens/catlog/CatlogListing';

const Tab = createMaterialBottomTabNavigator();

export interface myProps extends NavigationParams { }

const BottomTabs: React.FC<myProps> = (props) => {

    const rootStore = React.useContext(RootStoreContext);
    const { configLoading, updateConfig, categoryGroup, appConfigList } = rootStore.configStore;

    React.useEffect(() => {
        //debugger;
        if (categoryGroup.length == 0 || appConfigList.length == 0) {
            //console.log("updateConfig");
            updateConfig();
        }
    }, [updateConfig])

    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={false}
            sceneAnimationEnabled={true}
        >
            {/* <Tab.Screen
                name="Home"
                component={EditCatlog}
                options={{
                    tabBarIcon: 'home-account',
                }}
            /> */}
            <Tab.Screen
                name="Home"
                component={CatlogListing}
                options={{
                    tabBarIcon: 'home-account',
                }}
            />
            <Tab.Screen
                name="Catlog"
                component={CatlogScreen}

                options={{
                    tabBarIcon: 'bell-outline',
                    tabBarLabel: 'Catlog',
                    tabBarAccessibilityLabel: 'Catlog',
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrderScreen}
                options={{
                    tabBarIcon: 'message-text-outline',
                }}
            />
            <Tab.Screen
                name="Returns"
                component={ReturnsScreen}
                options={{
                    tabBarIcon: 'message-text-outline',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

