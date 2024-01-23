import React from 'react';
import Account from '../screens/account';
import OrderHistory from '../screens/account/ordersHistory';
import ViewOrder from '../screens/account/viewOrder';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from './CartStack';
import ScreenHeader from '../components/ScreenHeader';
const AccountStack = createStackNavigator();
const AccountStackScreen = ({ navigation }) => {
  return (
    <>
      <AccountStack.Navigator initialRouteName='AccountScreen'  >
        <AccountStack.Screen
          name="AccountScreen"
          component={Account}
          options={({ route, navigation }) => ({
            header: () => <ScreenHeader navigation={navigation} name="ACCOUNT" notificationIcon={false} />
          })}
        />
        <AccountStack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={({ route, navigation }) => ({
            headerTitle: '',
            header: () => <ScreenHeader navigation={navigation} name="Order History" notificationIcon={false} />
          })}
        />
        <AccountStack.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={({ route, navigation }) => ({
            headerTitle: '',
            header: () => <ScreenHeader navigation={navigation} name={"Order: " + " " + route?.params?.order_id} notificationIcon={false} />
          })}
        />

      </AccountStack.Navigator>
    </>
  );
};

export default AccountStackScreen;
