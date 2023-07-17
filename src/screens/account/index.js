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
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../navigation/AuthProvider';

import Header from '../../components/Header';

import { ToastAndroid, Alert } from 'react-native';

import { InputField, InputFieldFull } from '../../components/InputField';
import { PrimaryButton } from '../../components/Buttons';
import { borderColor, primaryColor, primaryColorShaded, secondaryColor } from '../../utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import firestore from '@react-native-firebase/firestore';
import { PoppinsRegular } from '../../utils/fonts';
import { Icon } from 'react-native-elements';

const Account = ({ navigation }) => {
  const { user, name } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
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

  return (
    <>

      <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')} style={styles.orderHistoryButton}>
        <Text style={styles.orderHistoryButtonText}>Orders History</Text>
        <Icon color={primaryColor} name='chevron-right' type='font-awesome' size={16} />
      </TouchableOpacity>

      <View style={styles.container}>
        <ScrollView style={styles.scrollView} centerContent={true}>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          <Text style={styles?.fieldText}>Username:</Text>
          <InputFieldFull
            placeholder="Username..."
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setUsername(text)}
            value={username ?? name}
          />
          <Text style={styles?.fieldText}>Email:</Text>
          <InputFieldFull
            placeholder="Email..."
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles?.fieldText}>Password:</Text>
          <InputFieldFull
            placeholder="Password..."
            secureTextEntry
            placeholderTextColor={primaryColorShaded}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity style={styles.checkout_btn} onPress={() => updateProfile()}>
            <Text style={styles.checkout_btn_text}>UPDATE</Text>
          </TouchableOpacity>
          <Logout styles={styles} />
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
    backgroundColor: "#fff"
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
    fontFamily: PoppinsRegular,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 4,
    color: "#000000",
    fontFamily: PoppinsRegular,
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
  },
  checkout_btn_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: PoppinsRegular,
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
