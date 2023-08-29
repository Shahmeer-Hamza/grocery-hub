import React, { Component, useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { ToastAndroid, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import { background, borderColor, greyColorShaded, primaryColor, primaryColorShaded, secondaryColor, secondaryColorShaded, textColor } from '../../utils/Colors';
import { PoppinsRegular, RalewayRegular } from '../../utils/fonts';

export const Item = ({ v }: ItemProps) => (
  <View style={styles.item}>
    <View style={{ borderBottomColor: borderColor, borderBottomWidth: 0.2, paddingVertical: 15 }}>
      <View style={{ flexDirection: "row", }}>
        <View>
          <Text style={{ ...styles.title, }}>Order ID:</Text>
          <Text style={styles.title}>Booking Date:</Text>
          <Text style={styles.title}>Order Status:</Text>
          <Text style={styles.title}>Payment Status:</Text>
        </View>
        <View>
          <Text style={{ ...styles.title, fontWeight: '700', letterSpacing: 0.5 }}> {v.order_id}</Text>
          <Text style={styles.value}> {v.bookingDate}</Text>
          <Text style={styles.value}> {v.status}</Text>
          <Text style={styles.value}> {v.payment} </Text>
        </View>
      </View>

      <View style={{ justifyContent: 'flex-end' }}>
        {v.button}
      </View>


      {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Payment Status:<Text style={styles.value}> {v.payment} </Text></Text>
        {v.button}
      </View> */}
    </View>

  </View>
);


const OrderHistory = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    firestore().collection('orders')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let tableRows = [];
        querySnapshot.forEach(function (doc) {
          let status = '';
          if (doc.data().status == 0) {
            status = 'New Order';
          }
          else if (doc.data().status == 1) {
            status = 'Pending';
          }
          else if (doc.data().status == 2) {
            status = 'Confirmed';
          }
          else if (doc.data().status == 3) {
            status = 'Cancelled By You';
          }
          else if (doc.data().status == 4) {
            status = 'Cancelled By Vendor';
          }
          else if (doc.data().status == 5) {
            status = 'Cancelled By Admin';
          }
          else if (doc.data().status == 6) {
            status = 'Completed';
          }
          try {
            tableRows.push({
              order_id: doc.id,
              bookingDate: doc.data().bookingDate, status: status, payment: doc.data().payment,
              button: <TouchableOpacity onPress={() => navigation.navigate('ViewOrder', { order_id: doc.id, name: 'Order #' + doc.id })} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            })
          } catch (error) {
            console.log(error);

          }
        });
        setTableData(tableRows);
        setLoading(false);
      });
  }

  if (loading) {
    return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={primaryColorShaded} /></View>;
  }

  const viewItem = (item_id) => {
    navigator.navigate()
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadOrders}
          />
        }>
          <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 20, }}>
            <View style={{
              backgroundColor: primaryColor, width: "90%", borderRadius: 10, elevation: 1, overflow: "hidden"
            }}>
              {
                tableData.map((v, i) => <Item v={v} />)
              }
            </View>
          </View>

        </ScrollView>
      </SafeAreaView >
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
    height: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: background,
  },
  scrollView: {
    width: '100%',
  },

  card_img_view: {
    width: '100%',
    height: 200,
  },
  card_img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card_body: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  card_footer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item_name: {
    color: secondaryColor,
    fontSize: 26,
    fontWeight: 'bold',
  },
  head: { height: 40, backgroundColor: secondaryColor, color: 'white', padding: 10 },
  text: { textAlign: 'center', fontWeight: '100', fontSize: 16, color: 'white' },
  dataWrapper: { marginTop: -1 },
  row: { minHeight: 40, backgroundColor: '#f3f3f3', paddingVertical: 10, paddingLeft: 20, paddingRight: 20 },
  wishlist_btn: {
    backgroundColor: primaryColorShaded,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  cart_btn: {
    backgroundColor: secondaryColor,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 15,
  },
  cart_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 5,
  },
  wishlist_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 5,
  },
  viewButton: {
    backgroundColor: primaryColor,
    width: 80,
    marginLeft: '20%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-end"
  },
  viewButtonText: {
    color: 'white',
    fontFamily: RalewayRegular,
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
    marginLeft: 10,
  },
  title: {
    color: "#6D6D6D",
    fontFamily: RalewayRegular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: 1.4
    // marginTop: 5,
  },
  value: {
    color: textColor,
    fontFamily: RalewayRegular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: 1.4,
  },

});
export default OrderHistory;
