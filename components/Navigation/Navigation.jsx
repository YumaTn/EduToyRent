import React from 'react';
import SCREENS from './index.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import Noti from '../Notification/Noti.jsx';
import Profile from '../Profile/Profile.jsx';
import Home from '../Home/Home.jsx'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Navigation = () => { 
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'black' },
        headerShown:false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: '#ffffff',
          shadowColor: '#CCCCCC',
          paddingTop:5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => ( 
            <Ionicons 
            name={focused ? "home" : "home-outline"} 
            size={24}
            color={focused ? "#FE3734" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.NOTIFICATION}
        component={Noti}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
            name={focused ? "notifications" : "notifications-outline"} 
            color={focused ? "#FE3734" : "black"} 
            size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Ionicons
        name={focused ? "person" : "person-outline"} 
        color={focused ? "#FE3734" : "black"} 
        size={24}
      />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
