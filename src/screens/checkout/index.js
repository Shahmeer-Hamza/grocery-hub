import React, { Component, useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Button
} from 'react-native';
import Header from '../../components/Header';

import * as ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { primaryColor, secondaryColor, primaryColorShaded, secondaryColorShaded } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';

import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import { InputFieldFull } from '../../components/InputField';
import { PrimaryButton } from '../../components/Buttons';

import { ToastAndroid, Alert, Dimensions } from 'react-native';
import { RadioButton, Snackbar } from 'react-native-paper';
import { PoppinsRegular } from '../../utils/fonts';
import DateTimePicker, { DateTimePickerAndroid, } from '@react-native-community/datetimepicker';
import { Icon, Input } from 'react-native-elements';
const Checkout = ({ route, navigation }) => {

  const { user, setContextCartCount } = useContext(AuthContext);

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('');
  const [cnic, setCNIC] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [value, setValue] = useState('cash');
  const [cartTotal, setCartTotal] = useState(0);

  const [selectedPictureUri, setSelectedPictureUri] = useState('');
  const [uploadURI, setUploadURI] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageDownloadLink, setImageDownloadLink] = useState('');

  // #region DATETIMEPICKER HANDLING
  const [showDateTimePicker, setshowDateTimePicker] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setBookingDate(currentDate);
    hideDatePicker();
  };
  // #endregion

  useEffect(() => {
    firestore()
      .collection('carts')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let cartTotalSum = 0;
        const listingsArray = [];
        querySnapshot.forEach(function (doc) {
          firestore().collection('listings').doc(doc.data().item).get().then((response) => {
            listingsArray.push(
              doc.data().item,
            );
            cartTotalSum += parseFloat(response.data().price.replace(/,/g, ''));
          });
          setTimeout(() => {
            setCartTotal(cartTotalSum);
            console.log(listingsArray);
            setListings(listingsArray);
          }, 1000);

        });
        setLoading(false);
      });
  }, [useIsFocused]);

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const selectReceipt = () => {
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;

        setSelectedPictureUri(uri);

        let newImageName = 'profile' + Math.random(0, 9999);
        storage()
          .ref(newImageName)
          .putFile(uri)
          .then((snapshot) => {
            console.log(snapshot);
            //You can check the image is now uploaded in the storage bucket
            let imageRef = storage().ref('/' + newImageName);
            imageRef
              .getDownloadURL()
              .then((url) => {
                //from url you can fetched the uploaded image easily
                url = url.substring(0, url.indexOf('&token'));
                setImageDownloadLink(url);


              })
              .catch((e) => console.log('getting downloadURL of image error => ', e));
            console.log(`${imageName} has been successfully uploaded.`);
          })
          .catch((e) => console.log('uploading image error => ', e));


      }
    });
  }

  const confirmOrder = () => {
    if (fullname == '') {
      setErrorMessage('Full Name field is required');
    } else if (email == '') {
      setErrorMessage('Email field is required');
    } else if (phone == '') {
      setErrorMessage('Phone field is required');
    } else if (bookingDate == '') {
      setErrorMessage('Booking Date field is required');
    } else if (cnic == '') {
      setErrorMessage('CNIC field is required');
    } else {
      if (value == 'online' && imageDownloadLink == '') {
        setErrorMessage('Upload Receipt is required');
        return true;
      }

      firestore().collection("orders").add({
        user: user.uid,
        items: listings,
        fullname: fullname,
        cnic: cnic,
        phone: phone,
        email: email,
        bookingDate: new Date(bookingDate).toLocaleDateString("en"),
        payment: value,
        imageDownloadLink: imageDownloadLink,
        status: 0,
      })
        .then((docRef) => {
          firestore()
            .collection('carts')
            .where('user', '==', user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
                setContextCartCount(0);

              });
            });
          fetch('http://davat.thevertexsolutions.com/admin/apis/email.php?email=' + email + '&subject=Order%20Received&msg=Your%20order%20has%20been%20received%20and%20it%20will%20be%20confirmed%20shortly')
          ToastAndroid.show('Order Placed Successfully', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

    }
  };

  return (
    <>
      {/* <Header /> */}
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} centerContent={true}>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          <Text style={styles?.fieldText}>Username:</Text>
          <InputFieldFull
            placeholder="Username..."
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setFullName(text)}
            value={fullname}
          />
          <Text style={styles?.fieldText}>Email:</Text>
          <InputFieldFull
            placeholder="Email..."
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles?.fieldText}>Phone:</Text>
          <InputFieldFull
            placeholder="03365466542"
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />

          <Text style={styles?.fieldText}>CNIC:</Text>
          <InputFieldFull
            placeholder="42315566998894"
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setCNIC(text)}
            value={cnic}
          />

          <View >
            <Input
              value={bookingDate?.toLocaleString("en")}
              style={styles.inputViewFull}
              containerStyle={{ paddingHorizontal: 0 }}
              placeholder='Select Date'
              editable={false}
              inputContainerStyle={{ borderBottomWidth: 0, backgroundColor: '#F5F7F9', paddingHorizontal: 20, borderRadius: 10, width: '100%', }}
              rightIcon={
                <TouchableOpacity onPress={showDatePicker} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <Icon name='date-range' type="material" size={30} color={secondaryColor} />
                </TouchableOpacity>
              }
            />
          </View>
        
          <Text style={styles.heading}>Billing Details</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={styles.total_amount}>Total Amount: Rs. {cartTotal}</Text>
          </View>
          <Text style={styles.heading}>Payment Method</Text>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} style={{ width: '100%', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <RadioButton color={secondaryColor} value="cash" />
              <Text style={{ ...styles.radioText, color: value == "cash" ? primaryColor : "grey" }}>Cash</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <RadioButton color={secondaryColor} value="online" />
              <Text style={{ ...styles.radioText, color: value == "cash" ? "grey" : primaryColor }}>Online</Text>
              {value == 'online' && (
                <TouchableOpacity style={styles.upload_btn} onPress={() => selectReceipt()}>
                  <Text style={styles.upload_btn_text}>Upload Receipt</Text>
                </TouchableOpacity>

              )}
            </View>
          </RadioButton.Group>

          <TouchableOpacity style={styles.checkout_btn} onPress={() => confirmOrder()}>
            <Text style={styles.checkout_btn_text}>Confirm Order</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {isDatePickerVisible && (
        <DateTimePicker
          value={bookingDate == "" ? new Date() : new Date(bookingDate)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date('2030-01-01')}
        />
      )}
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
    backgroundColor: "#FFF",
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1
  },
  inputViewFull: {
    borderRadius: 10,
    justifyContent: 'center',

    borderBottomWidth: 0,
    fontSize: 14,
    height: 50,
    color: "#000"
  },
  scrollView: {
    width: '100%',
    padding: 20,
  },
  fieldText: {
    fontSize: 15,
    fontFamily: PoppinsRegular,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 4,
    color: "#000000"
  },
  errorMessage: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#F5C6CB',
    padding: 6,
    paddingTop: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: secondaryColor,
    fontWeight: 'bold',
    fontFamily: PoppinsRegular,
    marginBottom: 5,
    letterSpacing: 0.7,
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
  checkout_btn: {
    width: '90%',
    padding: 10,
    backgroundColor: primaryColor,
    textAlign: 'center',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: Dimensions.get("screen").height / 6
  },
  upload_btn: {
    width: '40%',
    padding: 6,
    backgroundColor: secondaryColor,
    textAlign: 'center',
    marginHorizontal: '2%',
    borderRadius: 10,
  },
  checkout_btn_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  upload_btn_text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  datePickerStyle: {
    width: '100%',
    marginLeft: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  total_amount: {
    fontSize: 16,
    marginBottom: 10,
    letterSpacing: 0.5,
    fontWeight: '700',
    color: primaryColor
  }, radioText: {
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: '700',
    color: primaryColor

  }
});
export default Checkout;
