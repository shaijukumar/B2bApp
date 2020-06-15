import * as React from 'react';
import { NavigationContainer, } from '@react-navigation/native';

//import BottomTabs from '../Navigation/BottomTabs';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStoreContext } from '../common/data/rootStore';
import BottomTabs from './BottomTabs';
import { observer } from 'mobx-react-lite';
import Dashboard from '../screens/Dashboard';
import EditCatlog from '../screens/catlog/EditCatlog';
import { ScrollView } from 'react-native-gesture-handler';
import CatlogListing from '../screens/catlog/CatlogListing';

const Stack = createStackNavigator();

const NavigationMain: React.FC = () => {
    //export default function NavigationMain() {

    return (
        <NavigationContainer >
            <>
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                    headerMode="float"
                >
                    <Stack.Screen
                        name="WelcomeScreen"
                        component={WelcomeScreen}
                        options={{ headerTitle: 'WelcomeScreen', headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerTitle: 'LoginScreen', headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterForm"
                        component={BottomTabs}
                        options={{ headerTitle: 'LoginScreen', headerShown: false }}
                    />
                    <Stack.Screen
                        name="BottomTabs"
                        component={BottomTabs}
                        options={{ headerTitle: 'Home', headerShown: false, }}
                    />
                    < Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{ headerTitle: 'Dashboard', headerShown: false, }}
                    />

                    < Stack.Screen
                        name="EditCatlog"
                        component={EditCatlog}
                        options={{ headerTitle: 'EditCatlog', headerShown: false, }}
                    />

                    <Stack.Screen
                        name="CatlogListing"
                        component={CatlogListing}
                        options={{ headerTitle: 'CatlogListing', headerShown: false, }}
                    />

                    {/* 
                <Stack.Screen
                    name="CatlogListing"
                    component={CatlogListing}
                    options={{ headerTitle: 'CatlogListing', headerShown: false, }}
                />
                <Stack.Screen
                    name="THome"
                    component={THome}
                    options={{ headerTitle: 'Tweet' }}
                /> */}
                </Stack.Navigator>
            </>
        </NavigationContainer>
    );
}


export default observer(NavigationMain);
