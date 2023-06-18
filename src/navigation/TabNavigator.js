import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, SearchStackNavigator, SettingsStackNavigator } from "./StackNavigator";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  let uniqueValue = 1;
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      
      <Tab.Screen name="HomeScreen" component={MainStackNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          
        }}

        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //     navigation.navigate("HomeScreen",  {screen: 'HomeScreen', uniqueValue: 2});
        //   },
        // })}
      />
      <Tab.Screen name="SearchScreen" component={SearchStackNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen name="SettingsScreen" component={SettingsStackNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}      
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;