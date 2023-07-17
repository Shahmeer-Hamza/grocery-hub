import React, { Component, useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator, ImageBackground, ToastAndroid,
  RefreshControl,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { primaryColor, primaryColorShaded, secondaryColor } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faMapMarked, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import { PoppinsBlack, PoppinsRegular } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { styles } from '../../assets/styles/listingStyles';
import { AuthContext } from '../../navigation/AuthProvider';
import { firebaseStorageUrl } from '../../utils/storage';

const Home: () => React$Node = ({ route, navigation }) => {
  const [img, setImg] = useState('');
  const { listType, item_id } = route.params;
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listings, setListings] = useState([]);
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [wishedList, setWishedList] = useState([]);
  const { user, contextWishedCount, setContextWishedCount } = useContext(AuthContext);

  const getListing = (force = 0) => {
    setLoading(true);
    setListings([]);
    let list_ref = firestore()
      .collection('listings')
      .where('type', '==', listType);
    let list_ref2 = list_ref;
    if (force == 1) {

    }
    else {
      if (selectedCity != 'All') {
        list_ref2 = list_ref.where('city', '==', selectedCity);
      }
      if (selectedRating == 1) {
        list_ref2 = list_ref.where('rating', '<', 2).where('rating', '>=', 1);
      }
      else if (selectedRating == 2) {
        list_ref2 = list_ref.where('rating', '<', 3).where('rating', '>=', 2);
      }
      else if (selectedRating == 3) {
        list_ref2 = list_ref.where('rating', '<', 4).where('rating', '>=', 3);
      }
      else if (selectedRating == 4) {
        list_ref2 = list_ref.where('rating', '<', 5).where('rating', '>=', 4);
      }
      else if (selectedRating == 5) {
        list_ref2 = list_ref.where('rating', '==', 5);
      }
    }

    list_ref2.onSnapshot((querySnapshot) => {
      const listingsArray = [];
      if (querySnapshot != null) {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.id);
          listingsArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

      }

      setListings(listingsArray);
      setLoading(false);
    });
  }
  useEffect(() => {
    getListing();
  }, []);

  const viewItem = (item_id, item_name) => {
    navigation.navigate('ViewItem', { item_id: item_id, name: item_name });
  }

  const Header = () => {
    const params = route?.params?.name?.toLowerCase()
    let source;
    if (params == "caterers") {
      source = require("../../assets/caterers-header.png")
      //  {uri: `${firebaseStorageUrl}Home%2Fcaterers-header.png?alt=media`,};
    }
    else if (params == "decorators") {
      source = require("../../assets/decorators-header.png")
      //  {uri: `${firebaseStorageUrl}Home%2Fdecorators-header.png?alt=media`,};
    }
    else if (params == "photographers") {
      source = require("../../assets/photographer-header.png")
      //  {uri: `${firebaseStorageUrl}Home%2Fphotographer-header.png?alt=media`,};
    }
    else {
      source = require("../../assets/venues-header.png")
      //  {uri: `${firebaseStorageUrl}Home%2Fvenues-header.png?alt=media`,};
    }
    return (
      source &&
      <ImageBackground resizeMethod='auto' resizeMode='cover' source={source} style={{ width: "100%", height: 150, marginBottom: 10 }}>

        <View style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} >
          <View style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center"
          }} >
            <TouchableOpacity onPress={() => navigation.goBack()} >

              <Image source={require("../../assets/left-arrow.png")} />
            </TouchableOpacity>
            <View style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }} >
              <Text style={{ fontSize: 28, fontFamily: PoppinsRegular, color: "#fff", fontWeight: 800 }} >
                {route?.params?.name}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: PoppinsRegular, color: "#fff", fontWeight: 500 }} >
                99 {route?.params?.name} Available
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require("../../assets/filter.png")} />
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    )
  }


  const getItemData = () => {
    firestore().collection('listings')
      .doc(item_id)
      .get()
      .then((response) => {
        let data = response.data();
        setItem(data);
        console.log(data);
        const tableRows = [
          ['Price', data.price], ['City', data.city], ['Address', data.address]
        ];
        setTableData(tableRows);
        setLoading(false);
      });
  }

  const addToWishlist = (item_id, index) => {

    if (wishedList[index]) {
      var wishlist_query = firestore()
        .collection('wishlist')
        .where('user', '==', user.uid)
        .where('item', '==', item_id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
            setWishedList(false);
            setContextWishedCount(1 - contextWishedCount);
            ToastAndroid.show('Item Removed From The Wishlist', ToastAndroid.SHORT);
          });
        });
    }
    else {
      firestore().collection("wishlist").add({
        user: user.uid,
        item: item_id
      })
        .then((docRef) => {
          ToastAndroid.show('Item Added To The Wishlist', ToastAndroid.SHORT);
          setWishedList(true);
          setContextWishedCount(1 + contextWishedCount);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

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
                uri: `https://firebasestorage.googleapis.com/v0/b/davat-ceb73.appspot.com/o/${item.images[0]}?alt=media`,
              }}
            >
              <View style={{ height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "row-reverse" }}>
                <Text style={styles.heading}>{item.name}</Text>
              </View>

            </ImageBackground>
          </View>
          <ScrollView>
            <View style={styles.card_details}  >
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
      {route?.params && <Header />}
      {
        loading ? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={primaryColorShaded} /></View> :
          <>
            <View style={styles.container}>
              {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, paddingHorizontal: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon icon={faFilter} color={secondaryColor} size={22} />
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>Search Filters</Text>
          </TouchableOpacity>
        </View> */}
              <ScrollView style={styles.scrollView}>
                {listings && listings.map((item, index) => {
                  let temp_arr = []
                  wishedList.map((a) => temp_arr.push(a))
                  temp_arr.push(false)
                  return ListItem(item, index)
                })}
              </ScrollView>

            </View>
            {modalVisible && (
              <Modal isVisible={modalVisible} content={
                <>
                  <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Select Search Filters</Text>

                  <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Select Rating</Text>

                  <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
                  }}>
                    <Picker
                      selectedValue={selectedRating}
                      style={{ height: 50, width: '100%' }}
                      onValueChange={(itemValue, itemIndex) => setSelectedRating(itemValue)}
                    >
                      <Picker.Item label="All" value="All" />
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value="4" />
                      <Picker.Item label="5" value="5" />
                    </Picker>
                  </View>

                  <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Select City</Text>

                  <View style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
                  }}>
                    <Picker
                      selectedValue={selectedCity}
                      style={{ height: 50, width: '100%' }}
                      onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                    >
                      <Picker.Item label="All" value="All" />
                      <Picker.Item label="Karachi" value="Karachi" />
                      <Picker.Item label="Lahore" value="Lahore" />
                      <Picker.Item label="Islamabad" value="Islamabad" />
                      <Picker.Item label="Peshawar" value="Peshawar" />
                      <Picker.Item label="Hyderabad" value="Hyderabad" />
                    </Picker>
                  </View>
                  <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.cart_btn, { marginLeft: 0, marginRight: 10, backgroundColor: '#f3f3f3' }]} onPress={() => {
                      setSelectedCity('All'), setSelectedRating('All'), setModalVisible(false), setTimeout(() => {
                        getListing(1)
                      }, 100)
                    }}>
                      <Text style={{ paddingLeft: 0, color: '#000' }}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cart_btn, { marginLeft: 0 }]} onPress={() => { getListing(), setModalVisible(false) }}>
                      <Text style={[styles.cart_btn_text, { paddingLeft: 0 }]}>Filter</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ position: 'absolute', right: 10, top: 10, width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <FontAwesomeIcon icon={faTimes} color='#d3d3d3' size={30} />
                    </TouchableOpacity>
                  </View>
                </>
              } />
            )}
          </>
      }
    </>
  );
};


export default Home;
