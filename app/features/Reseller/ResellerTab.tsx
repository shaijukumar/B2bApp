import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ResellerHome from './ResellerHome';
import ResellerOrders from './ResellerOrders';
import ResellerReturns from './ResellerReturns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ResellerCatlogs from './ResellerCatlogs';


const Tab = createBottomTabNavigator();

const ResellerTab: React.FC<{ navigation?: any }> = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="ResellerHome"
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                }} >
                <Tab.Screen name="ResellerHome"
                    options={{
                        tabBarLabel: 'ResellerHome',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}>
                    {props => <ResellerHome {...props} navigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="My Catlogs"
                    options={{
                        tabBarLabel: 'ResellerCatlogs',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                        ),
                    }}>
                    {props => <ResellerCatlogs {...props} rootNavigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="Orders"
                    options={{
                        tabBarLabel: 'Orders',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="gift" color={color} size={size} />
                        ),
                    }}>
                    {props => <ResellerOrders {...props} navigation={navigation} />}
                </Tab.Screen>

                <Tab.Screen name="Returns"
                    options={{
                        tabBarLabel: 'Returns',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="backup-restore" color={color} size={size} />
                        ),
                    }}>
                    {props => <ResellerReturns {...props} navigation={navigation} />}
                </Tab.Screen>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default ResellerTab;