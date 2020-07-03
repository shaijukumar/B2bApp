import React from 'react';
import { createAppContainer, NavigationParams } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"

import Sidebar from './Sidebar';
import WelcomeScreen from '../user/WelcomeScreen';
import LoginScreen from '../user/LoginScreen';
import SupplierHome from '../supplier/SupplierHome';
import ResellerHome from '../Reseller/ResellerHome';
import RegisterForm from '../user/RegisterForm';
import ResellerTab from '../Reseller/ResellerTab';
import Settings from '../user/Settings';
import UserProfile from '../user/UserProfile';
import UserAlert from '../user/UserAlert';
import SupplierTab from '../supplier/SupplierTab';


const Drawer = createDrawerNavigator(
    {
        WelcomeScreen: { screen: WelcomeScreen },
        LoginScreen: { screen: LoginScreen },
        ResellerHome: { screen: ResellerHome },
        RegisterForm: { screen: RegisterForm },
        ResellerTab: { screen: ResellerTab },
        Settings: { screen: Settings },
        UserProfile: { screen: UserProfile },
        UserAlert: { screen: UserAlert },
        SupplierTab: { screen: SupplierTab },
    },
    {
        initialRouteName: "LoginScreen",
        unmountInactiveRoutes: true,
        contentComponent: props => <Sidebar {...props} />
    }
)

const AppNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer },
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
)

const MainNav = createAppContainer(AppNavigator);
export default MainNav;
