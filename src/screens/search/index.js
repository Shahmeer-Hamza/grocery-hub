import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import { faSearch, faMapMarked } from '@fortawesome/free-solid-svg-icons';

import { Icon, SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { background, borderColor, greyColorShaded, inputBackgroundColor, inputPlaceholderColor, primaryColor, secondaryColor, textColor, whitecolor } from '../../utils/Colors';

import firestore from '@react-native-firebase/firestore';
import { PoppinsRegular, RalewayRegular } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { itemTypes } from '../../utils/itemTypes';
import { Card } from 'react-native-paper';
import { styles } from '../../assets/styles/listingStyles';
import { AuthContext } from '../../navigation/AuthProvider';
// import {} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen')

const Search = ({ listType, placeholderText, setSearchItems, main, searchText }) => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('');

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showListing, setShowListing] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const { user, contextCartCount, setContextCartCount } = useContext(AuthContext);

  const searchRef = useRef(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('listings')
      .onSnapshot((querySnapshot) => {
        const listingsArray = [];
        if (querySnapshot)
          querySnapshot.forEach((documentSnapshot) => {
            listingsArray.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

        setListings(listingsArray);
        //   setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  const updateSearch = (text) => {
    const filtered = listings.filter(function (str) {
      if (listType.includes(str.type))
        return str.name.toLowerCase().includes(text.toLowerCase());
    })
    setSearchItems && setSearchItems(filtered)
    setFilteredListings(filtered);
    setSearch(text);
    if (text != '') {
      setShowListing(true);
    } else {
      setShowListing(false);
      setSearchItems && setSearchItems([])
      setFilteredListings([]);
    }
  };


  useEffect(() => {
    searchText ? searchRef.current.focus() : searchRef.current.blur()
  }, [searchText])
  const addToCart = (item_id) => {
    firestore().collection("carts").add({
      user: user.uid,
      item: item_id
    })
      .then((docRef) => {
        ToastAndroid.show('Item Added To The Cart', ToastAndroid.SHORT);
        setAddedCart(true);
        setContextCartCount(1 + contextCartCount);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    // }
  };


  const ListItem = ({ item, key }) => {
    return (
      // Flat List Item
      // <TouchableNativeFeedback style={styles.listing_card} onPress={() => viewItem(item.key, item.name)}>
      <View style={styles.listing_card}>
        <Card style={styles.card}>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10, }}>
            <View style={{ width: 130 }}>

              <View style={styles.card_img_view}>

                {item?.image?.length > 0 && <Image source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/davat-ceb73.appspot.com/o/${item?.image[0]}?alt=media`,
                }} resizeMode='contain' style={{ width: 100, height: 80 }} />}


              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: RalewayRegular, fontSize: width * 0.04, fontWeight: '500', color: textColor, letterSpacing: width * 0.003, }}>{item?.name}</Text>
                <Text style={{ fontFamily: RalewayRegular, fontSize: width * 0.026, fontWeight: '400', color: greyColorShaded, }}>{item?.quantity + " " + item?.quantity_type}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
                  <Text style={{
                    color: primaryColor,
                    fontFamily: 'Play',
                    fontSize: width * 0.04,
                    fontWeight: 400,
                    // paddingRight: 10,
                  }}>Rs.{item?.price}</Text>
                  <Text style={{
                    color: "#6F6F6F",
                    fontFamily: 'Play',
                    fontSize: width * 0.030,
                    fontWeight: 400,
                    textDecorationLine: 'line-through',
                  }}>Rs.{item?.price}</Text>
                </View>
                <TouchableOpacity style={[styles.addCartButton]} onPress={() => addToCart(item?.key)}>
                  <Icon name="add" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            {/* <ScrollView>
            <View style={styles.card_details}  >
              <View style={styles.details_bottom}>
                <Icon name="map-pin" size={15} color="#900" type='feather' />
                <Text numberOfLines={2} style={styles.address}>
                  {item.address}
                </Text>
                </View>
                <Text style={styles.price}>PKR {item.price}</Text>
                </View>
          </ScrollView> */}
          </View>
        </Card>
      </View>
      // </TouchableNativeFeedback>
    );
  };

console.log("filteredListings.length", filteredListings.length, !main)

  return (
    <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", paddingHorizontal: 10, paddingVertical:20 }}>
      <SearchBar
        lightTheme={true}
        placeholderTextColor={inputPlaceholderColor}

        searchIcon={<Icon name='search' color={inputPlaceholderColor} size={24} style={{ marginRight: 0 }} />} placeholder="What are you looking for?"
        clearIcon={null}
        ref={searchRef}
        value={searchText ?? search}
        onChangeText={(text) => {

          main ? navigation.navigate('Listing', { search: text, listType: itemTypes, searchEnabled: true })
            : navigation.setParams({ search: undefined })


          updateSearch(text);
        }}
        style={{ color: '#000' }}

        inputStyle={{
          minHeight: 20,
          fontSize: 14,
          fontFamily: PoppinsRegular

        }}
        inputContainerStyle={{
          backgroundColor: inputBackgroundColor,
          flexDirection: "row-reverse",
          // borderWidth: 1,
          // borderColor: borderColor,
          // borderTopWidth: 0,
          // borderBottomWidth: 0,
          // elevation: 0.5,
          // shadowColor: "#9D9D9D",
          // shadowOffset: {
          //   width: 0,
          //   height: -13,
          // },

          // shadowOpacity: 20.19,
          // shadowRadius: 1.65,
        }}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255)',
          borderRadius: 20,
          borderTopWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          flexDirection: "row-reverse",
          padding: 0
        }}
      />

      {(filteredListings.length == 0) ? (
        <></>
        // <Text style={{ padding: 15, color: "#fff" }}>No results found</Text>
      )
        :
        <View style={{
          flexDirection: "row",
          width: '100%',
          zIndex: 1,
          // flex: 1,
          // alignItems: 'flex-start',
          // justifyContent: 'flex-start',
          backgroundColor: background
        }}>

          <ScrollView contentContainerStyle={[styles.scrollView, { marginTop: 20, paddingBottom: 150 }]} showsVerticalScrollIndicator={false}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}>

            {showListing && filteredListings.length > 0 && filteredListings?.map((item, i) => <ListItem item={item} key={i} />)}
            </View>
            {/* {filteredListings.length == 0 && (
            <Text style={{padding: 15}}>No results found</Text>
          )} */}
          </ScrollView>
        </View>
      }
    </View>
  );
};

export default Search;
