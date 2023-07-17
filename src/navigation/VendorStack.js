import React from 'react';
import Home from '../screens/vendor/home';
import Order from '../screens/vendor/order';
import Account from '../screens/account';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChartLine, faHome, faUser} from '@fortawesome/free-solid-svg-icons';

import {secondaryColor} from '../utils/Colors';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const VendorStack: () => React$Node = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{
          backgroundColor: secondaryColor,
          //   position: 'absolute',
          height: 50,
          overflow: 'hidden',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faHome} color={color} size={18} />
            ),
          }}
        />

        {/* <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faSearch} color={color} size={18} />
            ),
          }}
        /> */}

        <Tab.Screen
          name="Orders"
          component={Order}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faChartLine} color={color} size={18} />
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faUser} color={color} size={18} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default VendorStack;
