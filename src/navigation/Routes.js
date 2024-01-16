import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import VendorStack from './VendorStack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

import firestore from '@react-native-firebase/firestore';
import { Text, ToastAndroid, View } from 'react-native';
import Walkthrough from '../screens/auth/Walkthrough';

const Routes: () => React$Node = ({ navigation }) => {
  const {
    user,
    setUser,
    walkthrough,
    getWalkthrough,
    vendor,
    setVendor,
    setErrorMessage,
    name,
    setName, 
    setLoading,
    isLoading
  } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // const insertUsername = async (userData, username) => {
  //   await firestore()
  //     .collection('users')
  //     .doc(user.uid)
  //     .set({
  //       username: username,
  //       email: userData.email,
  //       role: 'user',
  //     })
  //     .then((doc) => {
  //       console.log('doc: ' + doc);
  //       console.log('username' + username);
  //       console.log('name' + name);

  //       setUser(user);
  //       setName(null);
  //       // setVendor(0);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // Handle user state changes
  function onAuthStateChanged(user, name) {
    // console.log(user);
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((userData) => {
          setName(userData.data().username);
          setUser({ ...user._user, displayName: userData.data().username });
          setLoading(false)
        }).catch((err) => console.log(err))
    // console.log(vendor);
  }

  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const checkAuth = async () => {
    const subscriber = await auth().onAuthStateChanged(onAuthStateChanged);
    
    return subscriber; // unsubscribe on unmount
  };
  checkAuth();
}, []);

return (
  <NavigationContainer>
    {
      user ?
        <MainStack />
        :
        <AuthStack walkthrough={walkthrough} isLoading={isLoading} />
    }
  </NavigationContainer>
);
};

export default Routes;
