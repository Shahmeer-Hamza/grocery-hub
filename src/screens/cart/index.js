import React, { Component, useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity, ImageBackground,Dimensions
} from 'react-native';
import Header from '../../components/Header';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { primaryColor, secondaryColor } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import { PoppinsBlack, PoppinsRegular } from '../../utils/fonts';
import { Icon, Divider } from 'react-native-elements';

const Cart = ({ route, navigation }) => {

  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {

    firestore()
      .collection('carts')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        console.log(listings);
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
        <View >
          <View style={styles.card_img_view}>
            <ImageBackground
              style={styles.card_img}
              imageStyle={{borderRadius: 15,}}
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/davat-ceb73.appspot.com/o/${item.images[0]}?alt=media`,
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
      </TouchableNativeFeedback >

    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {listings && listings.map(ListItem)}
          {(listings && listings.length > 0) ? (
            <TouchableOpacity style={styles.checkout_btn} onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.checkout_btn_text}>CHECKOUT</Text>
            </TouchableOpacity>
          ) : (
            <View><Text>Cart is empty</Text></View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    zIndex: 1,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1
  },
  scrollView: {
    width: '100%',
  },
  listing_card: {
    width: '100%',
    maxHeight: 250,
    paddingHorizontal: 20,
  },
  headerIcons: {
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
  },
  listing_card_body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

    borderRadius: 15,
  },
  card_img_view: {
    width: '100%',
    minHeight: 184,
    maxHeight: 200,
    borderRadius: 20
  },
  card_img: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-end",
    borderRadius: 20
  },
  card_details: {
    width: '100%',
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  details_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    justifyContent: "flex-end"
    // height: 50,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: '700',
    flex: 1, marginLeft: 10, marginBottom: 10, fontFamily: PoppinsBlack
    // textAlign:"right"
  },
  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 10
  },

  details_bottom: {
    flexDirection: 'row',
    width: "70%",
    alignItems: 'center',
    // justifyContent: "center",
    paddingVertical: 10,
    // height: 50,
  },
  address: {
    color: 'gray',
    marginHorizontal: 10,
    fontSize: 12,
    // paddingRight: 15,
  },
  checkout_btn: {
    width: '90%',
    padding: 10,
    backgroundColor: "#000000",
    textAlign: 'center',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    marginBottom: Dimensions.get("screen").height/8
  },
  checkout_btn_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default Cart;
