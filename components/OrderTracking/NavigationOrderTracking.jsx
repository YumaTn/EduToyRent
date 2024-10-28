import React from 'react';
import SCREENS from './index.jsx';
import Processing from './Processing.jsx';
import Shipping from './Shipping.jsx';
import Delivered from './Delivered.jsx';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const NavigationOrderTracking = () => { 
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'black' },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FE3734', // Màu chỉ dẫn
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.PROCESSING}
        component={Processing}
        options={{ title: 'Processing' }}
      />
      <Tab.Screen
        name={SCREENS.SHIPPED}
        component={Shipping}
        options={{ title: 'Shipped' }}
      />
      <Tab.Screen
        name={SCREENS.DELIVERED}
        component={Delivered}
        options={{ title: 'Delivered' }}
      />
    </Tab.Navigator>
  );
};

export default NavigationOrderTracking;
