import React, { useRef, useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl, Dimensions,
  KeyboardAvoidingView, ImageBackground, SafeAreaView
} from 'react-native';

import { TextAreaFull } from '../../components/InputField';
import { ToastAndroid, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import { borderColor, primaryColor, primaryColorShaded, secondaryColor, secondaryColorShaded } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartArrowDown, faEdit, faHeart, faMapMarked, faStar, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import { PoppinsRegular } from '../../utils/fonts';
import { Divider, Icon, Tab, TabView } from 'react-native-elements';
import BottomSheet from '../auth/Walkthrough/BottomSheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const Item = ({ route }) => {

  const navigation = useNavigation()
  const { user, contextCartCount, contextWishedCount, setContextWishedCount, setContextCartCount } = useContext(AuthContext);

  const [img, setImg] = useState('');
  const { item_id } = route.params;
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [wishedList, setWishedList] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalBody, setEditModalBody] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalBody, setDeleteModalBody] = useState();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [ratingError, setRatingError] = useState(false);
  const [userReviewReviews, setUserReviewReviews] = useState('');
  const [userReview, setUserReview] = useState('');
  const [writeReview, setWriteReview] = useState(true);

  //#region FUNCTIONALLITY FIREBASE
  console.log("ID", item_id)

  const getItemData = () => {
    firestore().collection('listings')
      .doc(item_id)
      .get()
      .then((response) => {
        let data = response.data();
        setItem(data);
        const tableRows = [
          ['Price', data.price], ['City', data.city], ['Address', data.address]
        ];
        setTableData(tableRows);
        setLoading(false);
      });
  }

  const addToWishlist = () => {
    if (wishedList) {
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

  const addToCart = () => {
    if (addedCart) {
      var cart_query = firestore()
        .collection('carts')
        .where('user', '==', user.uid)
        .where('item', '==', item_id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
            // setAddedCart(false);
            // setContextCartCount(1 - contextCartCount);
            ToastAndroid.show('Item Removed From The Cart', ToastAndroid.SHORT);
          });
        });
    }
    else {
      firestore().collection("carts").add({
        user: user.uid,
        item: item_id
      })
        .then((docRef) => {
          ToastAndroid.show('Item Added To The Cart', ToastAndroid.SHORT);
          // setAddedCart(true);
          // setContextCartCount(1 + contextCartCount);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  const reviewModal = () => {
    setModalVisible(true);
  };

  const rateItem = (index) => {
    let modalBodyArr = [];
    for (let i = 1; i <= 5; i++) {
      modalBodyArr.push(
        <TouchableOpacity onPress={() => rateItem(i)}>
          <Icon color={(i <= index) ? secondaryColor : '#d3d3d3'} name='star' type='font-awesome' size={40} />
        </TouchableOpacity>);
    }
    setEditModalBody(modalBodyArr);
    setModalBody(modalBodyArr);
    setRate(index);
  };

  const editReview = () => {
    rateItem(userReview.rating);
    setEditModalVisible(true);
  };

  const deleteReview = () => {
    setDeleteModalVisible(true);
  };

  const ReviewItem = (review, key) => {
    return (
      // Flat List Item
      <View style={[styles.review_view, review.user == user.uid ? { backgroundColor: '#f3f3f3' } : '']}>
        <View style={styles.review_user_avatar}>
          <Image
            source={require('../../assets/user-avatar.png')}
            style={{ width: 40, height: 40, resizeMode: 'stretch' }}
          />
        </View>
        <View style={styles.review_user_details}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: "space-between" }}>
            <Text style={{ fontWeight: '700', color: primaryColor }}>{review.username}</Text>
            <View style={{ flexDirection: 'column', }}>
              <Text style={{}}>
                <Icon color={review.rating >= 1 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={17} />
                <Icon color={review.rating >= 2 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={17} />
                <Icon color={review.rating >= 3 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={17} />
                <Icon color={review.rating >= 4 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={17} />
                <Icon color={review.rating == 5 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={17} />
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={{ color: primaryColor }}>{review?.reviews}</Text>
            {review.user == user.uid && (
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => editReview()}>
                  <Icon color={primaryColor} name='edit' type='font-awesome' size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteReview()}>
                  <Icon color={"maroon"} name='trash' type='font-awesome' size={20} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const getReviews = () => {
    firestore().collection('reviews')
      .where('item', '==', item_id)
      .get()
      .then((querySnapshot) => {
        let data = [];
        let user_review = '';
        querySnapshot.forEach(function (doc) {
          if (doc.data().user == user.uid) {
            user_review = {
              ...doc.data(),
              key: doc.id,
            };
          }
          else {
            data.push({
              ...doc.data(),
              key: doc.id,
            });
          }
        });
        if (user_review != '') {
          data.unshift(user_review);
          setUserReview(user_review);
          setUserReviewReviews(user_review.reviews);
          setWriteReview(false);
        }
        else {
          setWriteReview(true);
          setUserReview('');
          setUserReviewReviews('');
        }
        setReviews(data);
        setLoading(false);
      });
    setRate(0);
  };

  useEffect(() => {
    getItemData();
    firestore()
      .collection('wishlist')
      .where('user', '==', user.uid)
      .where('item', '==', item_id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setWishedList(true);
        });
      });

    firestore()
      .collection('carts')
      .where('user', '==', user.uid)
      .where('item', '==', item_id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setAddedCart(true);
        });
      });
    // Unsubscribe from events when no longer in use
    // return () => subscriber();
    getReviews();
    rateItem(0);
  }, []);


  const submitReview = () => {
    if (rate == 0) {
      setRatingError(true);
    }
    else {
      // get username
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((userData) => {
          // add reviews
          firestore().collection("reviews").add({
            user: user.uid,
            item: item_id,
            rating: rate,
            reviews: review,
            username: userData.data().username
          })
            .then((docRef) => {
              let items_ref = firestore()
                .collection('listings').doc(item_id);
              // get item's old ratings and total_ratings
              items_ref
                .get()
                .then((response) => {
                  let data = response.data();
                  let total_ratings = response.get('total_ratings') != null ? data.total_ratings : 0;
                  let new_rating = response.get('rating') != null ? (data.rating * total_ratings) : 0;
                  if (total_ratings == 0) {
                    new_rating = rate;
                    total_ratings++;
                  }
                  else {
                    total_ratings++;
                    new_rating = (new_rating + rate) / total_ratings;
                  }
                  // set item's new ratings and total_ratings
                  firestore()
                    .collection('listings').doc(item_id).set({
                      rating: new_rating,
                      total_ratings: total_ratings
                    }, { merge: true })
                    .then(() => {
                      ToastAndroid.show('Review Submitted Successfully', ToastAndroid.SHORT);
                      setModalVisible(false);
                      getReviews();
                      setLoading(true);
                      getItemData();
                    });
                });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      setRatingError(false);
    }
  };

  const updateReview = () => {
    if (rate == 0) {
      setRatingError(true);
    }
    else {
      // get username
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((userData) => {

          // edit review
          firestore().collection("reviews").doc(userReview.key).set({
            user: user.uid,
            item: item_id,
            rating: rate,
            reviews: userReviewReviews,
            username: userData.data().username
          }, { merge: true })
            .then((docRef) => {
              let items_ref = firestore()
                .collection('listings').doc(item_id);
              // get item's old ratings and total_ratings
              items_ref
                .get()
                .then((response) => {
                  let data = response.data();
                  let total_ratings = response.get('total_ratings') - 1;
                  let new_rating = response.get('rating');
                  if (total_ratings == 0) {
                    new_rating = rate;
                    total_ratings++;
                  }
                  else {
                    total_ratings++;
                    new_rating = ((new_rating * total_ratings) - userReview.rating + rate) / total_ratings;
                  }
                  // set item's new ratings and total_ratings
                  firestore()
                    .collection('listings').doc(item_id).set({
                      rating: new_rating,
                      total_ratings: total_ratings
                    }, { merge: true })
                    .then(() => {
                      ToastAndroid.show('Review Updated Successfully', ToastAndroid.SHORT);
                      setModalVisible(false);
                      setEditModalVisible(false);
                      getReviews();
                      getItemData();
                      setLoading(true);
                    });
                });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      setRatingError(false);
    }
  };

  const destroyReview = () => {
    firestore().collection("reviews").doc(userReview.key).delete()
      .then((docRef) => {
        let items_ref = firestore()
          .collection('listings').doc(item_id);
        // get item's old ratings and total_ratings
        items_ref
          .get()
          .then((response) => {
            let data = response.data();
            let total_ratings = response.get('total_ratings') - 1;
            let new_rating = response.get('rating');
            if (total_ratings == 0) {
              new_rating = 0;
            }
            else {
              new_rating = ((new_rating * (total_ratings + 1)) - userReview.rating) / total_ratings;
            }
            // set item's new ratings and total_ratings
            firestore()
              .collection('listings').doc(item_id).set({
                rating: new_rating,
                total_ratings: total_ratings
              }, { merge: true })
              .then(() => {
                ToastAndroid.show('Review Deleted Successfully', ToastAndroid.SHORT);
                setDeleteModalVisible(false);
                getReviews();
                getItemData();
                setUserReview('');
                setUserReviewReviews('');
                setLoading(true);
              });
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  //#endregion

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const Header = ({ children }) => {
    const params = route?.params?.name?.toLowerCase()
    let source = item?.images?.length > 0 ? `https://firebasestorage.googleapis.com/v0/b/groceryhub-ceb73.appspot.com/o/${item?.images[0]}?alt=media` : ""
    return (
      source &&
      <ImageBackground resizeMethod='auto' resizeMode={SCREEN_HEIGHT > 500 ? 'stretch' : 'cover'} source={{ uri: source }} style={{ width: "100%", height: SCREEN_HEIGHT > 500 ? SCREEN_HEIGHT / 2 : SCREEN_HEIGHT / 3 }}>
        <View style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} >
          {/* <View style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center"
          }} >
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Image source={require("../../assets/left-arrow.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/filter.png")} />
            </TouchableOpacity>
          </View> */}
          {children}
        </View>
      </ImageBackground>
    )
  }

  const TabRating = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
      <>
        {/* <Tab value={tabIndex} onChange={setTabIndex}
          dense
          indicatorStyle={{
            backgroundColor: secondaryColor,
            height: 1,
          }}
          style={{ color: primaryColor }}
        >
          <Tab.Item title={"Reviews"} titleStyle={{ color: tabIndex == 0 ? primaryColor : "grey" }} containerStyle={{ backgroundColor: "#fff", }} />
          <Tab.Item title={"Rating"} titleStyle={{ color: tabIndex == 1 ? primaryColor : "grey" }} containerStyle={{ backgroundColor: "#fff", }} />
        </Tab>
        <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
          <TabView.Item style={{ width: '90%' }}> */}
        <View style={styles.reviews_main}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ ...styles.cart_btn_text, color: primaryColor, fontSize: 18 }}>Reviews</Text>
            {writeReview && (
              // <View style={{ width: '100%', marginVertical: 5, flexDirection: 'row' }}>
              <TouchableOpacity style={{ ...styles.wishlist_btn, marginBottom: 0, backgroundColor: "#fff" }} onPress={() => reviewModal()}>
                <Icon color={primaryColor} name='edit' type='font-awesome' size={18} />
                <Text style={{ ...styles.cart_btn_text, color: primaryColor }}>Write a review</Text>
              </TouchableOpacity>
              // </View>
            )}
          </View>
          {reviews && reviews.map(ReviewItem)}
          {reviews.length == 0 && <Text style={styles.no_reviews}>No Reviews Available</Text>}
        </View>
        {/* </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
          </TabView.Item>
        </TabView> */}
      </>
    )
  }
  if (loading) {
    return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={primaryColorShaded} /></View>;
  }
  return (
    <>
      <Header />
      <BottomSheet>
        <View style={styles.container}>
          {/* <ScrollView style={styles?.scrollView}> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end", width: "100%", }}>
            <TouchableOpacity style={{ marginRight: 10, paddingHorizontal: 5 }} onPress={() => addToWishlist()}>
              <Icon name={!wishedList ? "heart-o" : "heart"} size={20} color={secondaryColor} type='font-awesome' />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10, paddingHorizontal: 5 }} onPress={() => addToCart()}>
              <Icon name={addedCart ? "cart" : "cart-outline"} size={20} color={secondaryColor} type='ionicon' />
            </TouchableOpacity>
          </View>
          <View style={styles.card_body}>
            <Text style={styles.item_name}>{item.name}</Text>
            <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1, marginVertical: 10 }} />
            <View style={styles.card_details} >
              <View style={styles.details_bottom}>
                <Icon name="map-pin" size={15} color={primaryColor} type='feather' />
                <Text numberOfLines={2} style={styles.address}>
                  {item.address}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center', justifyContent: "space-between", width: "100%", }}>
              <Text style={{}}>
                <Icon color={item.rating >= 1 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={18} />
                <Icon color={item.rating >= 2 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={18} />
                <Icon color={item.rating >= 3 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={18} />
                <Icon color={item.rating >= 4 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={18} />
                <Icon color={item.rating == 5 ? "#FEC007" : '#d3d3d3'} name='star' type='font-awesome' size={18} />
              </Text>
              <Text>
                <Text style={{ color: primaryColor, fontSize: 16, fontWeight: '700' }}>
                  {`  ${item.total_ratings ? item.total_ratings : 0}  `}
                </Text>
                <Text style={{ color: "grey", fontSize: 14, fontWeight: '400', marginLeft: 20 }}>
                  ({reviews?.length} reviews)
                </Text>
              </Text>
              <Text style={styles.price}>PKR {item.price}</Text>
            </View>
            <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1, marginVertical: 10 }} />
            <TabRating />
          </View>
          {/* </ScrollView> */}
          <View style={styles.card_footer}>
            <TouchableOpacity style={styles.wishlist_btn} onPress={() => addToWishlist()}>
              <Text style={styles.wishlist_btn_text}>{wishedList ? 'Added To Wishlist' : 'Add To Wishlist'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.cart_btn }} onPress={() => addToCart()}>
              <Text style={styles.cart_btn_text}>{addedCart ? 'Added To Cart' : 'Add To Cart'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      {modalVisible && (
        <Modal isVisible={modalVisible} content={
          <>
            <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Write a review</Text>
            <Text style={{ width: '100%', textAlign: 'center', fontWeight: '600', fontSize: 16, marginTop: 20 }}>Provide Rating</Text>
            {ratingError && (
              <Text style={{ width: '100%', padding: 10, textAlign: 'center', color: 'red' }}>Please provide rating</Text>
            )}
            <View style={{ width: '100%', padding: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              {modalBody}
            </View>
            <View style={{ width: '100%', paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TextAreaFull
                placeholder="Write your reviews here..."
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setReview(text)}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.cart_btn, { marginLeft: 0 }]} onPress={() => submitReview()}>
                <Text style={[styles.cart_btn_text, { paddingLeft: 0 }]}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', right: 10, top: 10, width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon color={"#d3d3d3"} name='times' type='font-awesome' size={30} />
              </TouchableOpacity>
            </View>
          </>
        } />
      )}

      {editModalVisible && (
        <Modal isVisible={editModalVisible} content={
          <>
            <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Edit your review</Text>
            <Text style={{ width: '100%', textAlign: 'center', fontWeight: '600', fontSize: 16, marginTop: 20 }}>Provide Rating</Text>
            {ratingError && (
              <Text style={{ width: '100%', padding: 10, textAlign: 'center', color: 'red' }}>Please provide rating</Text>
            )}
            <View style={{ width: '100%', padding: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              {editModalBody}
            </View>
            <View style={{ width: '100%', paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TextAreaFull
                placeholder="Write your reviews here..."
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setUserReviewReviews(text)}
                value={userReviewReviews}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.cart_btn, { marginLeft: 0 }]} onPress={() => updateReview()}>
                <Text style={[styles.cart_btn_text, { paddingLeft: 0 }]}>Update</Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', right: 10, top: 10, width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Icon color={"#d3d3d3"} name='times' type='font-awesome' size={30} />
              </TouchableOpacity>
            </View>
          </>
        } />
      )}

      {deleteModalVisible && (
        <Modal isVisible={deleteModalVisible} content={
          <>
            <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Are you sure you want to delete your review?</Text>

            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity style={[styles.wishlist_btn, { marginLeft: 0 }]} onPress={() => destroyReview()}>
                <Text style={[styles.cart_btn_text, { paddingLeft: 0 }]}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', right: 10, top: 10, width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
                <Icon color={"#d3d3d3"} name='times' type='font-awesome' size={30} />
              </TouchableOpacity>
            </View>
          </>
        } />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },
  scrollView: {
    width: '100%',
    // marginTop: 300,
  },

  card_img_view: {
    width: '100%',
    height: 500,
  },
  card_img: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  card_body: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }, card_details: {
    width: '100%',
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
    // padding: 10,
  }, details_bottom: {
    flexDirection: 'row',
    // width: "70%",
    alignItems: 'center',
    // justifyContent: "center",
    // height: 50,
  },
  card_footer: {
    width: '100%',
    padding: 20,
    paddingBottom: 80,
  }, address: {
    color: primaryColor,
    marginHorizontal: 10,
    fontSize: 12,
    fontFamily: PoppinsRegular
    // paddingRight: 15,
  },
  price: {
    color: '#000',
    fontSize: 20,
    fontWeight: '900',
    fontFamily: PoppinsRegular,
    textAlign: "right",
    width: "45%"
  },
  item_name: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: "uppercase",
    fontFamily: PoppinsRegular,
  },
  head: { height: 40, backgroundColor: secondaryColor, },
  text: { textAlign: 'left', fontWeight: '100', fontSize: 16 },
  dataWrapper: { marginTop: -1 },
  row: { minHeight: 40, backgroundColor: '#f3f3f3', paddingVertical: 10, paddingLeft: 20, paddingRight: 20 },
  wishlist_btn: {
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: primaryColor
  },
  cart_btn: {
    backgroundColor: secondaryColor,
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 5,
    textAlign: "center",
    fontFamily: PoppinsRegular,
    textTransform: "uppercase"
  },
  wishlist_btn_text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 5,
  },
  reviews_main: {
    width: '99%',
  },
  no_reviews: {
    padding: 20,
  },
  review_view: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center"
  },
  review_user_avatar: {
    width: "10%",
    // height: '100%',
    // flex: 1,
  },
  review_user_details: {
    height: '100%',
    width: "90%",
    marginLeft: 10,
    // flex: 6,
    flexDirection: 'column'
  }


});
export default Item;
