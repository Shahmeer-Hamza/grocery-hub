import React, { useState } from 'react';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
// import Listing from '../screens/listing';
// import Search from '../screens/search';
// import ViewItem from '../screens/item';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TouchableOpacity, Image, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { background, borderColor, primaryColor } from '../utils/Colors';
import { Divider } from 'react-native-elements';
import ScreenHeader from '../components/ScreenHeader';

const CartStack = createStackNavigator();

export const NotificationModal = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <>
      <Header name="Notifications" notificationIcon={false} navigation={navigation} />
      <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }} />
      <View style={{ height: "100%", backgroundColor: "#fff" }} ></View>
    </>
  )
}

const CartStackScreen = ({ navigation }) => {
  return (
    <>
      <CartStack.Navigator initialRouteName='Cart'>
        <CartStack.Screen
          name="CartScreen"
          component={Cart}
          options={({ route, navigation }) => ({
            header: () => <ScreenHeader navigation={navigation} name="Cart" notificationIcon={false} />
          })}
        />
        <CartStack.Screen
          name="Checkout"
          component={Checkout}
          options={({ route, navigation }) => ({
            header: () => <ScreenHeader navigation={navigation} name="CHECKOUT" notificationIcon={false} />
          })}
        />

      </CartStack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});
export default CartStackScreen;
