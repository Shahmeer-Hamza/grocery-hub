import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faMapMarked } from '@fortawesome/free-solid-svg-icons';

import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { primaryColor, secondaryColor } from '../../utils/Colors';

import firestore from '@react-native-firebase/firestore';
// import {} from 'react-native-gesture-handler';
const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showListing, setShowListing] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('listings')
      .onSnapshot((querySnapshot) => {
        const listingsArray = [];

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
    setFilteredListings(
      listings.filter(function (str) {
        return str.name.toLowerCase().includes(text.toLowerCase());
      }),
    );
    setSearch(text);
    if (text != '') {
      setShowListing(true);
    } else {
      setShowListing(false);
    }
  };

  const ListItem = (item, key) => {
    return (
      // Flat List Item
      <View style={styles.listing_card}>
        <TouchableOpacity style={styles.listing_card_body}>
          <View style={styles.card_img_view}>
            <Text style={styles.type_tag}>{item.type}</Text>
            <Image
              style={styles.card_img}
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/groceryhub-ceb73.appspot.com/o/${item.images[0]}?alt=media`,
              }}
            />
          </View>
          <View style={styles.card_details}>
            <View style={styles.details_top}>
              <Text style={styles.heading}>{item.name}</Text>
              <Text style={styles.price}>PKR {item.price}</Text>
            </View>
            <View style={styles.details_bottom}>
              <FontAwesomeIcon icon={faMapMarked} color="gray" size={18} />
              <Text numberOfLines={1} style={styles.address}>
                {item.address}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SearchBar
        lightTheme={true}
        placeholderTextColor="gray"
        searchIcon={<FontAwesomeIcon icon={faSearch} color="#000" size={18} />}
        placeholder="Search Here..."
        clearIcon={null}
        value={search}
        onChangeText={(text) => updateSearch(text)}
        style={{ color: '#000' }}
      />

      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {showListing && filteredListings && filteredListings.map(ListItem)}
          {(filteredListings.length == 0 || !showListing) && (
            <Text style={{ padding: 15 }}>No results found</Text>
          )}
          {/* {filteredListings.length == 0 && (
            <Text style={{padding: 15}}>No results found</Text>
          )} */}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: '100%',
  },
  listing_card: {
    width: '100%',
    maxHeight: 270,
    padding: 10,
  },
  listing_card_body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 5,
  },
  card_img_view: {
    width: '100%',
    height: 150,
  },
  card_img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card_details: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  details_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 50,
  },
  heading: {
    color: secondaryColor,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
  },
  details_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 5,
    // height: 50,
  },
  address: {
    color: 'gray',
    marginLeft: 10,
    fontSize: 16,
    paddingRight: 15,
  },
  type_tag: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor: secondaryColor,
    color: 'white',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 20,
  },
});
export default Search;
