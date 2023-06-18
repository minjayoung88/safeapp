import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator, SearchStackNavigator, SettingsStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home_" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;