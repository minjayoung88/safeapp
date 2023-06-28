import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Settings from '../Screens/Settings';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#888FC7",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Home_" component={Home} />
    </Stack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search_" component={Search} />
    </Stack.Navigator>
  );
}

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="설정" component={Settings} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, SearchStackNavigator, SettingsStackNavigator };