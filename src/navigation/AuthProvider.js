import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

import { ToastAndroid, Alert, DevSettings, ProgressBarAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [walkthrough, setWalkthrough] = useState(0);
  const [isLoading, setLoading] = useState(false)

  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [name, setName] = useState(null);
  const [contextWishedCount, setContextWishedCount] = useState(null);
  const [contextCartCount, setContextCartCount] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        walkthrough,
        setWalkthrough,
        errorMessage,
        setErrorMessage,
        isLoading,
        successMessage,
        setSuccessMessage,
        vendor,
        setVendor,
        name,
        setName,
        contextWishedCount,
        setContextWishedCount,
        contextCartCount,
        setContextCartCount,
        login: async (email, password) => {
          setLoading(true)
          try {
            // setUsername(null);
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then((u) => {
                firestore()
                  .collection('users')
                  .doc(u.user.uid)
                  .get()
                  .then((userData) => {
                    setName(userData.data().username);
                    setUser({
                      uid: u.user.uid,
                      email: u.user.email,
                      emailVerified: u.user.emailVerified,
                      phoneNumber: u.user.phoneNumber,
                      photoURL: u.user.photoURL, displayName: userData.data().username
                    });
                    setLoading(false)
                  }).catch((err) => console.log(err))
                setLoading(false)
              })
              .catch((e) => {
                setLoading(false)
                if (e.code === 'auth/invalid-email') {
                  setErrorMessage('That email address is invalid!');
                } else if (e.code === 'auth/wrong-password') {
                  setErrorMessage('That password is invalid!');
                } else if (e.code === 'auth/user-not-found') {
                  setErrorMessage('User not found');
                }
              });
          } catch (e) {
            setLoading(false)
          }
        },
        register: async (username, email, password) => {
          setLoading(true)
          try {
            setName(username);
            AsyncStorage.setItem("username", username).then(() => { })
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async (userData) => {
                await firestore()
                  .collection('users')
                  .doc(userData.user.uid)
                  .set({
                    username: username,
                    email: email,
                    role: 'user',
                    uid: userData.user.uid
                  })
                  .then(async () => {
                    ToastAndroid.show(
                      'Signed Up Successfully',
                      ToastAndroid.SHORT,
                    );
                    setLoading(false)
                    console.log("userData.user", userData.user);
                    setUser(userData.user);
                  })
                  .catch((e) => {
                    setLoading(false)
                  });
              });
          } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
              setErrorMessage('That email address is already in use!');
            } else if (e.code === 'auth/invalid-email') {
              setErrorMessage('That email address is invalid!');
            } else if (e.code === 'auth/wrong-password') {
              setErrorMessage('That password is invalid!');
            } else if (e.code === 'auth/weak-password') {
              setErrorMessage('Password should be at least 6 characters');
            }
            setLoading(false)
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(() => {
                AsyncStorage.removeItem("username")
                AsyncStorage.setItem("_walkthrough", "1")
                setUser(null)
                ToastAndroid.show(
                  'Logged Out Successfully',
                  ToastAndroid.SHORT,
                );
              });
          } catch (e) {
            console.log(e);
          }
        },
        forgotPassword: async (email) => {
          try {
            await auth()
              .sendPasswordResetEmail(email)
              .then((response) => {
             
                ToastAndroid.show(
                  'Reset Password Email Sent Successfully',
                  ToastAndroid.SHORT,
                );
              });
          } catch (e) {
            if (e.code == 'auth/user-not-found') {
              setErrorMessage('There is no user with this email');
            } else if (e.code === 'auth/invalid-email') {
              setErrorMessage('That email address is invalid!');
            }
          }
        },
        getUser: async (user) => {
          firestore()
            .collection('users')
            .doc(user?.uid)
            .get()
            .then((userData) => {
              console.log('userdata from account' + userData);
              setName(userData.data().username);
              setUser(userData.data());
            }).catch((err) => console.log(err))
        },
        getWalkthrough: () => {
          setLoading(true)
          AsyncStorage.getItem("_walkthrough").then((w) => {
            setLoading(false)
            setWalkthrough(w)
            return w
          }).catch(() => setLoading(false))
        }
      }}>

      {children}
    </AuthContext.Provider>
  );
};
