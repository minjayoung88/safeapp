import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, SearchStackNavigator, SettingsStackNavigator } from "./StackNavigator";
import * as config from '../Common/config'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  let uniqueValue = 1;
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="HomeScreen" component={MainStackNavigator} 
        options={{
          //tabBarLabel: '지도검색',
          
          tabBarStyle: { height: 60 },
          
          headerShown :false,
          tabBarActiveTintColor : config.BackColor,
          tabBarShowLabel : false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marked-alt" color={color} size={size}/>
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
          tabBarStyle: { height: 60 },
          headerTitle : "재난문자방송 검색",
          headerTintColor : 'white',
          headerStyle: {
            backgroundColor: "#888FC7",
            height : 60,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarShowLabel : false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alarm-light" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen name="SettingsScreen" component={SettingsStackNavigator} 
        options={{
          tabBarStyle: { height: 60 },
          headerTitle : "설정",
          headerTintColor : 'white',
          headerStyle: {
            backgroundColor: "#888FC7",
            height : 60,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarActiveTintColor : config.BackColor,
          tabBarShowLabel : false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}      
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;