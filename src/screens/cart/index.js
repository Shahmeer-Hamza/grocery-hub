import React, { Component, useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity, ImageBackground, Dimensions, Pressable, SafeAreaView, ToastAndroid
} from 'react-native';
import Header from '../../components/Header';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { background, borderColor, greyColorShaded, inputBackgroundColor, primaryColor, secondaryColor, textColor } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import { PoppinsBlack, PoppinsRegular, RalewayRegular } from '../../utils/fonts';
import { Icon, Divider } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { itemTypes } from '../../utils/itemTypes';
import { windowHeight } from '../../utils/WindowDimensions';

const { width, height } = Dimensions.get("window")

const Cart = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1)
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext)

  useEffect(() => {
    // if (listings.length <= 0) {
    getAllCarts()
    // }
  }, [isFocused]);


  const getAllCarts = async () => {
    firestore()
      .collection('carts')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let listingsArray = [];
        let notNeedItems = 0;
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function (doc) {
            firestore().collection('listings')
              .doc(doc.data().item)
              .get()
              .then((response) => {
                if (itemTypes?.includes(response.data()?.type)) {
                  listingsArray.push({
                    ...response.data(),
                    key: response.id,
                  });
                } else {
                  notNeedItems++
                }
                if (listingsArray?.length == querySnapshot.size - notNeedItems) {
                  setListings(listingsArray);
                  setLoading(false);
                  setrefreshing(false)
                }
              }).catch(() => {
                setLoading(false);
                setrefreshing(false)

              })

          })
        }
        else {
          setListings([])
          setLoading(false);
          setrefreshing(false)
        }
      })
      .catch(() => {
        setLoading(false);
        setrefreshing(false)
      })

  }

  if (loading) {
    return <SafeAreaView style={{ backgroundColor: background, height }}><View style={[{ justifyContent: "center", alignItems: "center", height: height - 250, }]} ><ActivityIndicator size={40} color={primaryColor} /></View></SafeAreaView>
  }
  const viewItem = (item_id, item_name) => {
    navigation.navigate('ViewItem', { item_id: item_id, name: item_name });
  };

  const addQuantity = (index) => setQuantity(quantity + 1);


  const addToCart = (item_id, index) => {
    var cart_query = firestore()
      .collection('carts')
      .where('user', '==', user.uid)
      .where('item', '==', item_id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          setListings((listings) => listings.filter(lists => lists?.key != item_id))
          // setAddedCart(false);
          // setContextCartCount(1 - contextCartCount);
          ToastAndroid.show('Item Removed From The Cart', ToastAndroid.SHORT);
        });
      });
  }

  const ListItem = (item, index) => {
    return (
      // Flat List Item
      <View style={styles.listing_card}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={styles.card_img_view}>
            {item?.image?.length && <Image
              style={styles.card_img}
              // imageStyle={{ borderRadius: 20, }}
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/davat-ceb73.appspot.com/o/${item.image[0]}?alt=media`,
              }}
            />}
          </View>
          <View style={{ justifyContent: "center", paddingLeft: 10, width: '70%' }}>
            <Text style={styles.heading}>{item.name}</Text>
            <Text style={styles.quantityheading}>{item?.quantity + " " + item?.quantity_type}</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              borderColor: borderColor,
              paddingTop: 8
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                <Text style={styles.currentPrice}>Rs.{item.price}</Text>
                <Text style={styles.origanalPrice}>Rs.{item.price}</Text>
              </View>
              <View style={{ flexDirection: "row", }}>

                <Pressable style={{ backgroundColor: "#f6f6f6", borderRadius: 4, paddingHorizontal: 10 }} onPress={() => addToCart(item?.key, index)}>
                  <Text style={{ color: greyColorShaded }}> Remove</Text>
                  {/* <Icon name="delete" color="red" /> */}
                </Pressable>
                {/*    {/* <Pressable style={{ backgroundColor: "#f6f6f6", borderRadius: 4 }} disabled={quantity <= 1 ? true : false} onPress={() => setQuantity(quantity - 1)}>
                  <Icon name="remove" color="#CCCCCC" />
                </Pressable>
                <Text style={{ color: "#000", fontSize: 18, paddingHorizontal: 8, }}>{quantity}</Text>
                <Pressable style={{ backgroundColor: primaryColor, borderRadius: 4 }} onPressIn={() => addQuantity(index)}>
                  <Icon name="add" color="#fff" />
                </Pressable> */}
              </View>
            </View>
          </View>
        </View>
      </View >

    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* <View style={{ height: height}}> */}
          {listings && listings.map(ListItem)}
          {/* </View> */}
        </ScrollView>
        {(listings && listings.length > 0) ? (
          <TouchableOpacity style={styles.checkout_btn} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.checkout_btn_text}>CHECKOUT</Text>
          </TouchableOpacity>
        ) : (
          <SafeAreaView style={{ backgroundColor: background, height, width: width}}>
            <View style={{ justifyContent: "center", alignItems: "center", height: height - 250}} >
              <Text style={{ color: "#000", fontFamily: PoppinsRegular, fontSize: 20 }}>Cart is empty
              </Text>
            </View>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  card_details: {
    width: '100%',
    backgroundColor: background,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  container: {
    width: '100%',
    height: height / 1,
    paddingTop: 20,
    zIndex: 1,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: background,
    // borderTopColor: "#E6E6E6",
    // borderTopWidth: 1
  },
  scrollView: {
    width: '100%',
    // backgroundColor: 'red',
  },
  listing_card: {
    width: '100%',
    maxHeight: 250,
    paddingHorizontal: 20,
    marginVertical: 10,
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
    width: 100,
    minHeight: 100,
    maxHeight: 150,
    borderRadius: 10,
  },
  card_img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: "#E3F4ED",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-end",
    borderRadius: 10
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
    color: textColor,
    fontSize: 18,
    fontFamily: RalewayRegular,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 4,
    // textAlign:"right"
  },
  quantityheading: {
    color: greyColorShaded,
    fontSize: 12,
    // fontFamily: RalewayRegular,
    fontWeight: '400',
    marginBottom: 8
    // textAlign:"right"
  },
  currentPrice: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: '400',
  },
  origanalPrice: {
    color: greyColorShaded,
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 4,
    textDecorationLine: 'line-through',
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
    backgroundColor: "#30A444",
    textAlign: 'center',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    // marginBottom: Dimensions.get("screen").height / 8
  },
  checkout_btn_text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: RalewayRegular,
    fontWeight: '600',
    textAlign: 'center'
  }
});
export default Cart;
