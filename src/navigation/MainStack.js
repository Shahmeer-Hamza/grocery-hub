import React, { useState, useContext } from 'react';
import HomeStackScreen from './HomeStack';
import Search from '../screens/search';
import Wishlist from '../screens/wishlist';
import CartStackScreen, { Header, NotificationModal } from './CartStack';
import AccountStack from './AccountStack';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCartArrowDown,
  faHeart,
  faHome,
  faSearch,
  faUser,
  faHouseDamage
} from '@fortawesome/free-solid-svg-icons';
import { Image } from "react-native"
import {
  primaryColor,
  primaryColorShaded,
  secondaryColor,
} from '../utils/Colors';
import { AuthContext } from './AuthProvider';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { firebaseStorageUrl } from '../utils/storage';
import SplashScreen from '../screens/SplashScreen';
const MainStack = () => {
  const { contextCartCount, contextWishedCount, setContextWishedCount, setContextCartCount } = useContext(AuthContext);
  
  firestore()
    .collection('wishlist')
    .where('user', '==', auth().currentUser?.uid)
    .get()
    .then(function (querySnapshot) {
      let wished = 0;
      querySnapshot.forEach(function (doc) {
        wished++;
      });
      setContextWishedCount(wished);
    });

  firestore()
    .collection('carts')
    .where('user', '==', auth().currentUser.uid)
    .get()
    .then(function (querySnapshot) {
      let carted = 0;
      querySnapshot.forEach(function (doc) {
        carted++;
      });
      setContextCartCount(carted);
    });

  const BottomTab = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (
      <>
        <Stack.Navigator
          activeColor="#fff"
          initialRouteName='Home'
          screenOptions={{
            tabBarStyle: {
              backgroundColor: primaryColor,
              position: 'absolute',
              // right: 20,
              bottom: 20,
              marginHorizontal: 20,
              borderRadius: 50,
              height: 50,
              width: 50,
              // alignSelf: 'flex-end',
              // flexDirection: "row",
              // alignItems: "center",
              // justifyContent: "center",
              // overflow: 'hidden',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeStackScreen}
            initialParams={{ parentNavigation: navigation }}
            options={{
              tabBarLabel: "",
              headerShown: false,
              tabBarLabelPosition: "beside-icon",
              tabBarIcon: ({ color, focused }) => (
                // <Icon name="home" size={30} color="#900" />
                <View  >
                  <Image source={{ uri: `${firebaseStorageUrl}bottom-bar%2Fhome-grey.png?alt=media`, }} style={{ width: 20, height: 20, opacity: !focused ? 0.5 : 1 }} />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Wishlist"
            component={Wishlist}
            initialParams={{ parentNavigation: navigation }}
            options={{
              tabBarLabel: '',
              headerShown: false,
              tabBarLabelPosition: "beside-icon",
              tabBarIcon: ({ color, focused }) => {
                return (
                  <>
                    <Icon name="heart-o" size={22} color={focused ? "#fff" : "#F4F5F7"} type='font-awesome' style={{ opacity: !focused ? 0.5 : 1 }} />
                    {contextWishedCount > 0 ? (<Text style={styles.icon_badge}>{contextWishedCount}</Text>) : (<></>)}
                  </>
                )
              },
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartStackScreen}
            options={{
              tabBarLabel: '',
              headerShown: false,
              tabBarLabelPosition: "beside-icon",
              tabStyle: { width: 50, height: 50, backgroundColor: primaryColor, marginBottom: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
              tabBarIcon: ({ color, focused }) => (
                <>
                  <Image source={require("../assets/cart.png")} style={{ width: 20, height: 23, opacity: !focused ? 0.5 : 1 }} />
                  {contextCartCount > 0 ? (<Text style={styles.icon_badge}>{contextCartCount}</Text>) : (<></>)}
                </>
              ),
            }}
          />
          <Stack.Screen
            name="AccountStack"
            component={AccountStack}
            options={{
              tabBarLabel: '',
              headerShown: false,
              tabBarLabelPosition: "beside-icon",
              tabBarIcon: ({ color, focused }) => (
                <>
                  <Image source={{ uri: `${firebaseStorageUrl}bottom-bar%2Fuser.png?alt=media`, }} style={{ width: 20, height: 20, opacity: !focused ? 0.5 : 1 }} />
                </>
              ),
            }}
          />
        </Stack.Navigator>

      </>
    );
  }
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator initialRouteName='SplashScreen' >
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationModal}
          options={{
            headerShown: false,
            header: () => <Header name="Notifications" notificationIcon={false} />
          }}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </>
  )

};

const styles = StyleSheet.create({
  tab_icon: {
    marginHorizontal: 10,
    paddingHorizontal: 10

  },
  icon_badge: {
    backgroundColor: 'red',
    color: '#fff',
    position: 'absolute',
    top: -6,
    right: -10,
    borderRadius: 20,
    width: 15,
    height: 15,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center'
  }
});
export default MainStack;
