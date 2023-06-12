import React from 'react';
import { createAppContainer, createSwitchNavigator, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Settings from '../Screens/Settings';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions } from 'react-navigation';

const HomeScreen = createStackNavigator(
  {
    screen: {
      screen: Home,
      navigationOptions:{
        title: '근처 복지시설 찾기'
      }
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'screen'
          })]
        }))
        defaultHandler();
      },
      tabBarButton: () => {}
    },
})

const SearchScreen = createStackNavigator({
  screen: {
    screen: Search,
    navigationOptions:{
      title: '시설 검색'
    }
  },
},
{
  navigationOptions: {
  }
})

const SettingScreen = createStackNavigator({
  screen: {
    screen: Settings,
    navigationOptions:{
      title: '설정'
    }
  }
},
{
  navigationOptions: {
  }
})

const AuthStack = createBottomTabNavigator(
    {
      Home: HomeScreen,
      Search: SearchScreen,
      Settings: SettingScreen,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({horizontal, tintColor}) => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Search') {
            iconName = 'trophy';
          } else {
            iconName = 'settings';
          }
          return (
            <Icon name={iconName} size={30} color={"#778899"}/>
          );
        },
        tabBarOptions: { 
            showLabel: false, 
            style:{
              height:70
            },
        },
      }),
    },
);

// 최상단 네비게이터
const AppNavigator = createSwitchNavigator(
    {
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth',
    }
);

export default createAppContainer(AppNavigator);