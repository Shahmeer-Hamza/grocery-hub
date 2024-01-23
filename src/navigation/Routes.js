import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

import firestore from '@react-native-firebase/firestore';
import { Text, ToastAndroid, View } from 'react-native';
import Walkthrough from '../screens/auth/Walkthrough';

const Routes = ({ navigation }) => {
  const {
    user,
    setUser,
    walkthrough,
    getWalkthrough,
    setErrorMessage,
    name,
    setName,
    setLoading,
    isLoading
  } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user, name) {
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
