import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SupplierHome from './SupplierHome';
import SupplierCatlogList from './SupplierCatlogList';
import SupplierOrders from './SupplierOrders';
import SupplierReturns from './SupplierReturns';
import { RootStoreContext } from '../../common/rootStore';


const Tab = createBottomTabNavigator();

const SupplierTab: React.FC<{ navigation?: any }> = ({ navigation }) => {



    // React.useEffect(() => {
    //     //debugger;
    //     if (categoryGroup.length == 0 || appConfigList.length == 0) {
    //         console.log("updateConfig");
    //         updateConfig();            
    //     }
    // }, [updateConfig])

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Catlog"
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                }} >
                <Tab.Screen name="TestTabHome"
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}>
                    {props => <SupplierHome {...props} navigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="Catlog"
                    options={{
                        tabBarLabel: 'Catlog',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                        ),
                    }}>
                    {props => <SupplierCatlogList {...props} navigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="Orders"
                    options={{
                        tabBarLabel: 'Orders',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="gift" color={color} size={size} />
                        ),
                    }}>
                    {props => <SupplierOrders {...props} navigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="Returns"
                    options={{
                        tabBarLabel: 'Returns',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="backup-restore" color={color} size={size} />
                        ),
                    }}>
                    {props => <SupplierReturns {...props} navigation={navigation} />}
                </Tab.Screen>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default SupplierTab;