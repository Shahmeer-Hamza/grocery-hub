import React, { Component, useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl, Dimensions
} from 'react-native';

import { ToastAndroid, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import { borderColor, inputBackgroundColor, primaryColor, primaryColorShaded, secondaryColor, secondaryColorShaded } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartArrowDown, faCross, faHeart, faMapMarked, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { PoppinsRegular } from '../../utils/fonts';
import { Item } from './ordersHistory';

const WINDOWHEIGHT = Dimensions.get("screen").height
const ViewOrder = ({ route, navigation }) => {

  const { user } = useContext(AuthContext);

  const { order_id } = route.params;
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    loadOrder();
  }, []);

  // const loadOrder = async () => {
  //   setLoading(true);
  //   const orderDoc = await firestore().collection('orders')
  //     .doc(order_id)
  //     .get()
  //   // .then((doc) => {
  //   let status = '';
  //   if (orderDoc.data().status == 0) {
  //     status = 'New Order';
  //   }
  //   else if (orderDoc.data().status == 1) {
  //     status = 'Pending';
  //   }
  //   else if (orderDoc.data().status == 2) {
  //     status = 'Confirmed';
  //   }
  //   else if (orderDoc.data().status == 3) {
  //     status = 'Cancelled By You';
  //   }
  //   else if (orderDoc.data().status == 4) {
  //     status = 'Cancelled By Vendor';
  //   }
  //   else if (orderDoc.data().status == 5) {
  //     status = 'Cancelled By Admin';
  //   }
  //   else if (orderDoc.data().status == 6) {
  //     status = 'Completed';
  //   }
  //   setOrderStatus(status);
  //   setTableData(orderDoc);

  //   let orderTotal = 0;
  //   let tableRow = [];
  //   for (let i in orderDoc.data().items) {
  //     // alert(orderDoc.data().items[i]);
  //     firestore().collection("listings")
  //       .doc(orderDoc.data().items[i])
  //       .get()
  //       .then((item) => {
  //         // alert(item.id);
  //         let vendorStatus = 'Pending';
  //         if (orderDoc.data().vendorStatuses) {
  //           vendorStatus = orderDoc.data().vendorStatuses[i]
  //         }
  //         tableRow.push({
  //           name: item.data().name, price: item.data().price, vendorStatus: vendorStatus
  //         });
  //         orderTotal += parseInt(item.data().price.replace(',', ''));
  //       });
  //   }
  //   setTimeout(() => {
  //     setItemData(tableRow);
  //     setTotal(orderTotal);

  //     setLoading(false);
  //   }, 2000);

  //     // }
  //     // );
  // }
  
  const getStatusText = (statusNumber)=> {
    // Map status numbers to text descriptions
    switch (statusNumber) {
      case 0:
        return 'New Order';
      case 1:
        return 'Pending';
      case 3:
        return 'Cancelled By You';
      case 4:
        return 'Cancelled By Vendor';
      case 5:
        return 'Cancelled By Admin';
      case 6:
        return 'Completed';
      default:
        return 'Unknown Status';
    }
  }

  const loadOrder = async () => {
    try {
      setLoading(true);
  
      alert('Order Id : '+ order_id);
      console.log('Order Id', order_id);
      const orderDoc = await firestore().collection('orders').doc(order_id).get();
      const status = await getStatusText(orderDoc.data().status); // Use a function for status mapping
      setOrderStatus(status);
      setTableData(orderDoc);
  
      const itemPromises = [];
      let orderTotal = 0;
  
      for (const itemId of orderDoc.data().items) {
        const itemPromise = firestore().collection("listings").doc(itemId).get();
        itemPromises.push(itemPromise);
  
        itemPromise.then((item) => {
          console.log("Order Items", item)
          const vendorStatus = orderDoc.data().vendorStatuses?.[i] ?? 'Pending'; // Default to pending
          orderTotal += parseInt(item.data().price.replace(',', ''));
          return { name: item.data().name, price: item.data().price, vendorStatus };
        });
      }
  
      const tableRow = await Promise.all(itemPromises);
      setItemData(tableRow);
      setTotal(orderTotal);
    } catch (error) {
      console.error('Error loading order:', error);
      // Handle error appropriately (e.g., display user-friendly message)
    } finally {
      setLoading(false);
    }
  };

const cancelOrder = (id) => {
  firestore().collection("orders").doc(id)
    .update({
      status: 3,
    })
    .then(function () {

      ToastAndroid.show('Booking Cancelled Successfully', ToastAndroid.SHORT);
      navigation.goBack(null);
    });
}

if (loading) {
  return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={primaryColorShaded} /></View>;
}

return (
  <>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={loadOrder}
        />
      }>
        <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }} />



        <View style={{ paddingHorizontal: 20, marginVertical: 20, marginBottom: WINDOWHEIGHT / 10 }} >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.item_name}>Total</Text>
              <Text style={{ ...styles.item_name, color: primaryColor }}>PKR {total}</Text>
            </View>

            <View style={styles.card_footer}>
              <TouchableOpacity style={styles.wishlist_btn} onPress={() => cancelOrder(tableData.id)}>
                <FontAwesomeIcon icon={faTimes} color='#fff' size={18} />
                <Text style={styles.wishlist_btn_text}>Cancel Booking</Text>
              </TouchableOpacity>

            </View>
          </View>
          <TextInput
            label="Full Name"
            editable={false}
            underlineColor="none"
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            value={tableData.data().fullname}
          />

          <TextInput
            label="Email"
            editable={false}
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            underlineColor="none"
            value={tableData.data().email}
          />
          <TextInput
            label="Phone"
            editable={false}
            underlineColor="none"
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            value={tableData.data().phone}
          />
          <TextInput
            label="Booking Date"
            editable={false}
            underlineColor="none"
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            value={tableData.data().bookingDate}
          />
          <TextInput
            label="Order Status"
            editable={false}
            underlineColor="none"
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            value={orderStatus}
          />
          <TextInput
            label="Payment Status"
            editable={false}
            underlineColor="none"
            style={{ marginTop: 10, backgroundColor: inputBackgroundColor }}
            underlineStyle={{ borderRadius: 20 }}
            value={tableData.data().payment}
          />
          <Divider style={{ borderBottomColor: borderColor, borderBottomWidth: 1, marginTop: 8 }} />

          {itemData?.map((v) =>
            <View style={styles.item}>
              <Text style={styles.title}>Item Name:<Text style={styles.value}> {v.name}</Text></Text>
              <Text style={styles.title}>Price:<Text style={styles.value}> {v.price}</Text></Text>
              <Text style={styles.title}>Vendor Status:<Text style={styles.value}> {v.vendorStatus} </Text></Text>
            </View>
          )}

        </View>
      </ScrollView>
    </View>
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
    backgroundColor: 'white'
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
    // padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item_name: {
    color: secondaryColor,
    fontFamily: PoppinsRegular,
    fontSize: 26,
    fontWeight: 'bold',
  },
  head: { height: 40, backgroundColor: secondaryColor, color: 'white', padding: 10, paddingLeft: 20 },
  text: { textAlign: 'left', fontWeight: '100', fontSize: 16, color: 'white', paddingRight: 10 },
  dataWrapper: { marginTop: -1 },
  row: { minHeight: 40, backgroundColor: '#f3f3f3', paddingVertical: 10, paddingLeft: 20, paddingRight: 20 },
  wishlist_btn: {
    backgroundColor: primaryColorShaded,
    padding: 12,
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
    backgroundColor: primaryColorShaded,
    width: '80%',
    marginLeft: '20%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#F2F4F5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: PoppinsRegular,
    color: primaryColor,
    marginTop: 5,
    fontWeight: '700'
  },
  value: {
    fontFamily: PoppinsRegular,
    fontSize: 14,
    color: "#666666",
    fontWeight: '600',
    textTransform: "capitalize"
  },


});
export default ViewOrder;
