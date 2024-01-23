import React, { Component, useContext, useState, useEffect } from 'react';
import Logout from './actions/logout';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ToastAndroid
} from 'react-native';

import { AuthContext } from '../../navigation/AuthProvider';


import {  InputFieldBorder } from '../../components/InputField';
import { background, borderColor, greyishBlackColorShaded, primaryColor, primaryColorShaded, secondaryColor, textColor, whitecolor } from '../../utils/Colors';

import firestore from '@react-native-firebase/firestore';
import { PoppinsRegular, RalewayRegular } from '../../utils/fonts';

const Account = ({ navigation }) => {
  const { user, name } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    try {
      firestore()
        .collection('users')
        .doc(user?.uid)
        .get()
        .then((userData) => {
          setUsername(userData.data().username);
        }).catch((err) => console.log(err))
    }
    catch { }
  }, []);

  const updateProfile = async () => {
    setErrorMessage(null);
    auth()
      .currentUser.updateEmail(email)

      .then((e) => {
        ToastAndroid.show('Email Updated Successfully', ToastAndroid.SHORT);
      })
      .catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use!');
        } else if (e.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        } else if (e.code === 'auth/wrong-password') {
          setErrorMessage('That password is invalid!');
        } else if (e.code === 'auth/weak-password') {
          setErrorMessage('Password should be at least 6 characters');
        } else if (e.code == 'auth/requires-recent-login') {
          setErrorMessage('Session expired! Re-login and continue');
        }
        console.log(e);
      });
    if (password != '') {
      auth()
        .currentUser.updatePassword(password)
        .then((e) => {
          ToastAndroid.show(
            'Password Updated Successfully',
            ToastAndroid.SHORT,
          );
        })
        .catch((e) => {
          if (e.code === 'auth/email-already-in-use') {
            setErrorMessage('That email address is already in use!');
          } else if (e.code === 'auth/invalid-email') {
            setErrorMessage('That email address is invalid!');
          } else if (e.code === 'auth/wrong-password') {
            setErrorMessage('That password is invalid!');
          } else if (e.code === 'auth/weak-password') {
            setErrorMessage('Password should be at least 6 characters');
          }
        });
      // await auth().currentUser.updatePassword(password);
    }
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        username: username,
        email: email,
      })
      .then(() => {
        ToastAndroid.show('Username Updated Successfully', ToastAndroid.SHORT);
      });
  };
  return (
    <>

      {/* <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')} style={styles.orderHistoryButton}>
        <Text style={styles.orderHistoryButtonText}>Orders History</Text>
        <Icon color={primaryColor} name='chevron-right' type='font-awesome' size={16} />
      </TouchableOpacity> */}

      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 20}} centerContent={true}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 105, height: 105, flexDirection: "row", alignItems: "flex-end", marginBottom: 30 }}>
              <View style={{ backgroundColor: primaryColor, width: 100, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 50, overflow: "hidden" }}>
                <Image style={{ width: 94, height: 94 }} source={require("../../assets/profile-icon.png")} />
              </View>
              {/* <Icon name="photo-camera" size={22} /> */}
            </View>
          </View>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {/* <Text style={styles?.fieldText}>Username:</Text> */}
          <InputFieldBorder
            placeholder="Username..."
            placeholderTextColor={greyishBlackColorShaded}
            onChangeText={(text) => setUsername(text)}
            value={username ?? name}
          />
          {/* <Text style={styles?.fieldText}>Email:</Text> */}
          <InputFieldBorder
            placeholder="Phone..."
            placeholderTextColor={greyishBlackColorShaded}
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
          <InputFieldBorder
            placeholder="Email..."
            placeholderTextColor={greyishBlackColorShaded}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <InputFieldBorder
            placeholder="Address..."
            placeholderTextColor={greyishBlackColorShaded}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          {/* <Text style={styles?.fieldText}>Password:</Text> */}
          <InputFieldBorder
            placeholder="Password..."
            secureTextEntry
            placeholderTextColor={greyishBlackColorShaded}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.checkout_btn} onPress={() => updateProfile()}>
            <Text style={styles.checkout_btn_text}>UPDATE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background,
  },
  errorMessage: {
    width: '70%',
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
    fontFamily: PoppinsRegular,
  },
  orderHistoryButton: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    paddingHorizontal: 20
  },
  orderHistoryButtonText: {
    color: secondaryColor,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: PoppinsRegular,
    textTransform: "uppercase"
  },
  scrollView: {
    width: '100%',
    padding: 20,
  },
  fieldText: {
    fontSize: 15,
    fontFamily: RalewayRegular,
    fontWeight: '600',
    letterSpacing: 0.7,
    marginBottom: 4,
    color: "#000000",
  },
  checkout_btn: {
    width: '100%',
    padding: 10,
    backgroundColor: primaryColor,
    textAlign: 'center',
    // marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  checkout_btn_text: {
    color: whitecolor,
    fontFamily: RalewayRegular,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  logout_btn: {
    width: '90%',
    padding: 10,
    backgroundColor: "#FFFFFF",
    textAlign: 'center',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: PoppinsRegular,
  }
});

export default Account;
