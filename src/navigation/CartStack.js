import React, { useState } from 'react';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
// import Listing from '../screens/listing';
// import Search from '../screens/search';
import ViewItem from '../screens/item';

import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import { PoppinsRegular } from '../utils/fonts';
import { borderColor, primaryColor } from '../utils/Colors';
import { Modal } from 'react-native-paper';
import { Divider } from 'react-native-elements';
const CartStack = createStackNavigator();

headerIcons = {
  backgroundColor: '#fff',
  elevation: 5, // Controls the shadow depth
  shadowColor: '#000', // Shadow color
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25, // Shadow opacity
  shadowRadius: 3.84, // Shadow radius
  borderRadius: 75, // Half of the width and height for a circular container
  overflow: 'hidden'
}

export const NotificationModal = ({ modalVisible, setModalVisible, navigation }) => {

  return (
    <>
      <Header name="Notifications" notificationIcon={false} navigation={navigation} />
      <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }} />
      <View style={{ height: "100%", backgroundColor: "#fff" }} ></View>
    </>

  )
}
const WINDOWWIDTH = Dimensions.get("screen").width
const WINDOWHEIGHT = Dimensions.get("screen").height
export const Header = ({ navigation, name, notificationIcon = true }) => {

  return (
    <>
      <View style={{
        display: "flex",
        flexDirection: "column",
        height: WINDOWHEIGHT ? WINDOWHEIGHT/10 : WINDOWHEIGHT/15,
        justifyContent: "center",
        alignItems: "center", backgroundColor: '#ffffff',
      }} >
        <View style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }} >
          <TouchableOpacity style={headerIcons} onPress={() => {
            try {
              navigation.goBack()
            } catch (error) {

            }
          }} >

            <Image source={require("../assets/left-arrow.png")} />
          </TouchableOpacity>
          <View style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: "70%"

          }} >
            <Text style={{ fontSize: name?.length < 15 ? WINDOWWIDTH / 18 : WINDOWWIDTH / 22, fontFamily: PoppinsRegular, color: primaryColor, fontWeight: 800, textTransform: "uppercase", }}  >
              {name}
            </Text>
          </View>
          {
            notificationIcon ?
              <TouchableOpacity style={headerIcons}
                onPress={() => navigation.navigate("Notification")}
              >
                <Image source={require("../assets/notification.png")} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
              : <View style={{ width: name?.length < 10 ? 45 : 15, height: 45 }} />
          }
        </View>
      </View>

    </>
  )
}

const CartStackScreen: () => React$Node = ({ navigation }) => {
  return (
    <>
      <CartStack.Navigator initialRouteName='Cart' >
        <CartStack.Screen
          name="CartScreen"
          component={Cart}
          options={({ route, navigation }) => ({
            header: () => <Header navigation={navigation} name="CART" notificationIcon={false} />
          })}
        />
        <CartStack.Screen
          name="Checkout"
          component={Checkout}
          options={({ route, navigation }) => ({
            header: () => <Header navigation={navigation} name="CHECK-OUT" notificationIcon={false} />
          })}
        />

      </CartStack.Navigator>
    </>
  );
};

export default CartStackScreen;
