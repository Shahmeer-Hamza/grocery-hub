import React, { useCallback, useState } from 'react';
import Home from '../screens/home';
import Listing from '../screens/listing';
import Search from '../screens/search';
import ViewItem from '../screens/item';
import DiscountItems from '../screens/discount';

import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Button, ImageBackground, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { PoppinsBlack, PoppinsRegular } from '../utils/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Header } from './CartStack';
import { useFocusEffect } from '@react-navigation/native';
import Categories from '../screens/categories';
import { primaryColor } from '../utils/Colors';
import OrderHistory from '../screens/account/ordersHistory';
import ViewOrder from '../screens/account/viewOrder';
import ScreenHeader from '../components/ScreenHeader';

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ route }) => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <HomeStack.Navigator initialRouteName='Dashboard' >
        <HomeStack.Screen
          name="Dashboard"
          component={Home}
          initialParams={{ parentNavigation: route.params.parentNavigation }}
          options={{
            headerShown: false,
            headerTitle: 'asd',
            headerTitleAlign: 'center',
          }}
        />
        <HomeStack.Screen
          name="Categories"
          component={Categories}
          initialParams={{ parentNavigation: route.params.parentNavigation }}
          options={
            ({ route, navigation }) => ({
              header: () => <ScreenHeader navigation={navigation} name="Categories" type={true} />,
            })
          }
        />
        <HomeStack.Screen
          name="Listing"
          component={Listing}
          initialParams={{
            modalVisible,
            setModalVisible
          }}
          options={
            ({ route, navigation }) => ({
              header: () => <ScreenHeader navigation={navigation} name={route.params?.name} type={true} />,
            })
          }
        />
        <HomeStack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="ViewItem"
          component={ViewItem}
          options={
            ({ route, navigation }) => ({
              headerShown: true,
              header: () => <Header navigation={navigation} name={route.params?.name} notificationIcon={false} />,
            })
          }
        />
        <HomeStack.Screen
          name="Discount"
          component={DiscountItems}
          options={
            ({ route, navigation }) => ({
              headerShown: true,
              header: () => <Header navigation={navigation} name={route?.name} notificationIcon={false} />,
            })
          }
        />
        <HomeStack.Screen
          name="Order"
          component={OrderHistory}
          options={
            ({ route, navigation }) => ({
              headerShown: true,
              header: () => <ScreenHeader navigation={navigation} name={route?.name} notificationIcon={false} />,
            })
          }
        />
        <HomeStack.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={
            ({ route, navigation }) => ({
              headerShown: true,
              header: () => <Header navigation={navigation} name={route?.name} notificationIcon={false} />,
            })
          }
        />
      </HomeStack.Navigator>
      <TouchableOpacity
        style={{ backgroundColor: primaryColor, width: 50, height: 50, borderRadius: 30, position: "absolute", bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigation.navigate("Cart")}
      >
        <Image source={require("../assets/cart.png")} style={{ width: 27, height: 24, }} />
      </TouchableOpacity>
    </>
  );
};

export default HomeStackScreen;
