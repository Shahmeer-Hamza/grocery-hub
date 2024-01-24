import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

import { ToastAndroid, Alert, DevSettings, ProgressBarAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [walkthrough, setWalkthrough] = useState(0);
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [name, setName] = useState(null);
  const [contextWishedCount, setContextWishedCount] = useState(null);
  const [contextCartCount, setContextCartCount] = useState(null);

  // const setToFirestore = async (userData, message) => {
  //   await firestore()
  //     .collection('users')
  //     .doc(userData.uid)
  //     .set(userData)
  //     .then(async () => {
  //       setName(userData.username);
  //       ToastAndroid.show(
  //         `${message} Successfully`,
  //         ToastAndroid.SHORT,
  //       );
  //       setLoading(false)
  //       setUser(userData);
  //     })
  // }
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
        setLoading,
        successMessage,
        setSuccessMessage,
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
                      photoURL: u.user.photoURL, 
                      displayName: userData.data().username
                    });
                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
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
        onGoogleLogin: async () => {
          // setLoading(true)
          GoogleSignin.configure({
            webClientId: '841003551346-9tsu96i9lc7btia3ghqsk7jge530b8q2.apps.googleusercontent.com',
          });
          try {
            // try {
            await GoogleSignin.hasPlayServices();
            // google services are available
            const userInfo = await GoogleSignin.signIn();
            console.log('google signin user', userInfo)
            // } catch (err) {
            //   console.error('play services are not available');
            // }
            const { accessToken, idToken } = userInfo
            // setState({ userInfo, error: undefined });
            const credential = auth.GoogleAuthProvider.credential(
              idToken,
              accessToken,
            );
            const { uid, email, emailVerified, phoneNumber, photoURL, displayName } = (await auth().signInWithCredential(credential)).user
            setToFirestore({ uid, email, emailVerified, phoneNumber, photoURL, username: displayName, role: "user" }, "Sign-in")
          } catch (error) {
            console.error(error)
            if (error) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
              // switch (error.code) {
              //   case statusCodes.SIGN_IN_CANCELLED:
              //     // user cancelled the login flow
              //     break;
              //   case statusCodes.IN_PROGRESS:
              //     // operation (eg. sign in) already in progress
              //     break;
              //   case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              //     // play services not available or outdated
              //     break;
              //   default:
              //   // some other error happened
              // }
            } else {
              // an error that's not related to google sign in occurred
            }
          } finally {
            // setLoading(false)
          }
        },
        register: async (username, email, password) => {
          setLoading(true)
          // console.log("User Name : "+username, 'Email : '+email, "Password : "+password)
          try {
            setName(username);
            AsyncStorage.setItem("username", username).then(() => { })
            await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (userData) => {
                console.log("User Name : "+username, 'Email : '+email, "Password : "+password, "UserData :" + userData)
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
