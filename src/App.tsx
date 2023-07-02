import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  
  return (
  <NavigationContainer> 
    <BottomTabNavigator />
  </NavigationContainer>
  )
};

export default App;
