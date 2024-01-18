import React from 'react';
import Account from '../screens/account';
import OrderHistory from '../screens/account/ordersHistory';
import ViewOrder from '../screens/account/viewOrder';
// import Listing from '../screens/listing';
// import Search from '../screens/search';
import ViewItem from '../screens/item';

import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Button } from 'react-native';
import { Header } from './CartStack';
const AccountStack = createStackNavigator();
const AccountStackScreen = ({ navigation }) => {
  return (
    <>
      <AccountStack.Navigator initialRouteName='AccountScreen'  >
        <AccountStack.Screen
          name="AccountScreen"
          component={Account}
          options={({ route, navigation }) => ({
            header: () => <Header navigation={navigation} name="ACCOUNT" notificationIcon={false} />
          })}
        />
        <AccountStack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={({ route, navigation }) => ({
            headerTitle: '',
            header: () => <Header navigation={navigation} name="Order History" notificationIcon={false} />
          })}
        />
        <AccountStack.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={({ route, navigation }) => ({
            headerTitle: '',
            header: () => <Header navigation={navigation} name={"Order: " + " " + route?.params?.order_id} notificationIcon={false} />
          })}
        />

      </AccountStack.Navigator>
    </>
  );
};

export default AccountStackScreen;
