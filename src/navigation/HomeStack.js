import React, { useCallback, useState } from 'react';
import Home from '../screens/home';
import Listing from '../screens/listing';
import Search from '../screens/search';
import ViewItem from '../screens/item';

import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Button, ImageBackground, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { PoppinsBlack, PoppinsRegular } from '../utils/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Header } from './CartStack';
import {useFocusEffect} from '@react-navigation/native';
import Categories from '../screens/categories';

const HomeStack = createStackNavigator();
const HomeStackScreen: () => React$Node = ({route}) => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
 
  return (
    <>
      <HomeStack.Navigator initialRouteName='Dashboard' >
        <HomeStack.Screen
          name="Dashboard"
          component={Home}
          initialParams={{parentNavigation: route.params.parentNavigation}}
          options={{
            headerShown: false,
            headerTitle: 'asd',
            headerTitleAlign: 'center',
          }}
          />
        <HomeStack.Screen
          name="Categories"
          component={Categories}
          initialParams={{parentNavigation: route.params.parentNavigation}}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="Listing"
          component={Listing}
          initialParams={{
            modalVisible,
            setModalVisible
          }}
          options={{
            headerShown: false,
          }}
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
          options={({ route, navigation }) => ({
            
            headerShown: true,
            header: () => <Header navigation={navigation} name={route.params?.name} notificationIcon={false} />,
            
          })
        }
        />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStackScreen;
