import React, { Component, useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl, ImageBackground,
  TouchableOpacity
} from 'react-native';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { borderColor, primaryColor, secondaryColor } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';

// const Wishlist: () => React$Node = ({route, navigation}) => {

import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import { Header } from '../../navigation/CartStack';
import { Divider, Icon } from 'react-native-elements';
import { styles } from '../../assets/styles/listingStyles';
const Wishlist = ({ route, navigation }) => {


  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);
  const [getAllListings, setGetAllListings] = useState([]);
  const { contextWishedCount } = useContext(AuthContext);
  const { parentNavigation } = route.params

  const isFocused = useIsFocused();

  useEffect(() => {

    firestore()
      .collection('wishlist')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const listingsArray = [];
        querySnapshot.forEach(function (doc) {
          firestore().collection('listings').doc(doc.data().item).get().then((response) => {

            listingsArray.push({
              ...response.data(),
              key: response.id,
            });
          });


        });
        setTimeout(() => {
          setListings(listingsArray);
        }, 1000);
        setLoading(false);

      });

  }, [isFocused]);

  if (loading) {
    return <ActivityIndicator />;
  }
  const viewItem = (item_id, item_name) => {
    navigation.navigate('ViewItem', { item_id: item_id, name: item_name });
  }

  const ListItem = (item, key) => {
    return (
      // Flat List Item
      <TouchableNativeFeedback style={styles.listing_card} onPress={() => viewItem(item.key, item.name)}>
        <View>
          <View style={styles.card_img_view}>
            <ImageBackground
              style={styles.card_img}
              imageStyle={{ borderRadius: 15, }}
              source={{
                uri: item.length > 0 ? `https://firebasestorage.googleapis.com/v0/b/groceryhub-ceb73.appspot.com/o/${item?.images[0]}g?alt=media` : "",
              }}
            >

              <View style={{ flex: 1, width: "100%", justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "row-reverse" }}>
                <Text style={styles.heading}>{item.name}</Text>
              </View>

            </ImageBackground>
          </View>
          <ScrollView>
            <View style={styles.card_details} >
              <View style={styles.details_bottom}>
                <Icon name="map-pin" size={15} color="#900" type='feather' />
                <Text numberOfLines={2} style={styles.address}>
                  {item.address}
                </Text>
              </View>
              <Text style={styles.price}>PKR {item.price}</Text>
            </View>
          </ScrollView>
        </View>
      </TouchableNativeFeedback>

    );
  };

  return (
    <>
      <Header
        name="WISHLIST"
        navigation={navigation}
        parent={true}
      />
      <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }} />
      <View style={{ ...styles.container, marginTop: 10, marginBottom: 20 }}>
        <ScrollView style={{ ...styles.scrollView, marginBottom: 60 }}>
          {listings.length > 0 && listings.map(ListItem)}
        </ScrollView>
      </View>
    </>
  );
};

export default Wishlist;
