import React from 'react';
import 'react-native-gesture-handler';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import TestEdit from './app/test/TestEdit';
import ImageUpload from './app/common/components/ImageUpload';
import ImageList from './app/common/components/ImageList';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import RegisterForm from './app/screens/RegisterForm';
import BottomTabs from './app/Navigation/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import NavigationMain from './app/Navigation/NavigationMain';
import { FeedStack } from './app/Navigation/FeedStack';


export default function App() {
  return (

    // <>
    //   <BottomTabs />
    // </FeedStack>
 
    // <AppContainer />

    <NavigationMain />

  );
}


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountScreen: {
      screen: AccountScreen,
      navigationOptions: {
        headerShown: false,
        //title: "AccountScreen",
      },
    },
    ListingsScreen: {
      screen: ListingsScreen,
      navigationOptions: {
        headerShown: false,
        //title: "ListingsScreen",
      },
    },

    ListingDetailsScreen: {
      screen: ListingDetailsScreen,
      navigationOptions: {
        headerShown: false,
        //title: "ListingDetailsScreen",
      },
    },
    ListingEditScreen: {
      screen: ListingEditScreen,
      navigationOptions: {
        headerShown: false,
        //title: "ListingEditScreen",
      },
    },
    TestEdit: {
      screen: TestEdit,
      navigationOptions: {
        headerShown: false,
        //title: "TestEdit",
      },
    },
    ImageUpload: {
      screen: ImageUpload,
      navigationOptions: {
        headerShown: false,
        //title: "ImageUpload",
      },
    },
    ImageList: {
      screen: ImageList,
      navigationOptions: {
        headerShown: false,
        //title: "ImageList",
      },
    },
    RegisterForm: {
      screen: RegisterForm,
      navigationOptions: {
        headerShown: false,
        //title: "RegisterForm",
      },
    },
    BottomTabs: {
      screen: BottomTabs,
      navigationOptions: {
        headerShown: false,
        //title: "BottomTabs",
      },
    },



  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


