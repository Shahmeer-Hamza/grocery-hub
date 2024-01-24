import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
  greyishBlackColorShaded,
  borderColor,
  background,
} from '../../utils/Colors';

import { LogoInverse } from '../../utils/Logos';
import { AuthButton, PrimaryButton } from '../../components/Buttons';
import { InputField, InputFieldIcon } from '../../components/InputField';
import { AuthContext } from '../../navigation/AuthProvider';
import { Image } from 'react-native';
import { styles } from '../../assets/styles/auth';
import { Icon } from 'react-native-elements';
import { RalewayRegular } from '../../utils/fonts';

const { width, height } = Dimensions.get("screen")
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showFooter, setShowFooter] = useState('flex');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowFooter('none');
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowFooter('flex');
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    login,
    isLoading,
  } = useContext(AuthContext);
  const {
    forgotPassword,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
  } = useContext(AuthContext);

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const doForgotPassword = () => {
    if (email == '') {
      setErrorMessage('Email field is required');
    } else {
      forgotPassword(email);
    }
  };

  return (
    // <>
    //   <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
    //   <SafeAreaView style={styles.container}>
    //     <View style={{ height: height * .18, position: 'relative', top: 0, left: 0 }}>
    //       <Image resizeMode='stretch' source={require('../../assets/auth-header.png')} style={{ width: width + 1, height: height * .18 }} />
    //     </View>
    //     <KeyboardAvoidingView behavior='position'>
    //     <View style={[styles.bottomContainer, { height: height * .64, justifyContent: 'center' }]}>
    //       <View style={styles?.formContainer}>
    //         <View style={styles.messageContainer}>
    //           {/* <Text>{height * .6}</Text> */}
    //           <Text style={styles.heading}>Forgot Password!</Text>
    //           <Text style={{ ...styles.forecolor, textAlign: "center", }}>Enter your email to reset password</Text>
    //         </View>
    //         {successMessage && (
    //           <Text style={styles.successMessage}>{successMessage}</Text>
    //         )}
    //         {errorMessage && (
    //           <Text style={styles.errorMessage}>{errorMessage}</Text>
    //         )}
    //         <View style={{gap: height * 0.045}}>

    //           <View style={[styles.inputContainer]}>
    //             <View>
    //               {/* <Text style={styles.forecolor}>Email: </Text> */}
    //               <InputFieldIcon
    //                 placeholder="Enter your email"
    //                 placeholderTextColor={greyishBlackColorShaded}
    //                 onChangeText={(text) => setEmail(text)}
    //                 rightIcon={<Icon size={20} name="user" type="feather" />}
    //               />
    //             </View>
    //           </View>
    //           <View style={{}}>
    //             <View style={[]} >
    //               {/* <SecondaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Login"} onPress={() => doLogin()} /> */}
    //               <AuthButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={whitecolor} shouldRasterizeIOS /> : "SUBMIT"} onPress={() => doForgotPassword()} />
    //             </View>
    //           </View>
    //         </View>

    //         {/* <View style={{ ...styles?.viewSignup, marginTop: WINDOWHEIGHT / 200 }}>
    //           <Text style={styles.loginText}>
    //             Don't have an account? </Text>
    //           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
    //             <Text style={{ ...styles.loginText, fontWeight: "700" }}>Sign Up</Text>
    //           </TouchableOpacity>
    //         </View> */}
    //       </View>
    //     </View>
    //     </KeyboardAvoidingView>
    //     <View style={{ width: width, height: height * .16, position: 'relative', bottom: 0, left: 0, }}>
    //       <ImageBackground resizeMode='stretch' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width + 1, height: height * .2, alignItems: "flex-end" }} source={require('../../assets/auth-footer.png')}>
    //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: height * .02 }}>
    //           <Text style={styles.loginText}>Remember your account? </Text>
    //           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    //             <Text style={{ ...styles.loginText }}>Login</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //   </SafeAreaView>
    // </>
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
        <View style={{ height: height * .18, position: 'relative', top: 0, left: 0, zIndex: -99 }}>
          <Image resizeMode='stretch' source={require('../../assets/auth-header.png')} style={{ width: width + 1, height: height * .18 }} />
        </View>
        {/* <SafeAreaView style={styles.container}> */}
        <View style={{ ...styles.container, flex: 1, zIndex: 11 }}>
          <KeyboardAvoidingView behavior='padding'>
            <ScrollView>

            <View style={[styles.bottomContainer, { justifyContent: 'center', height: '100%' }]}>
              <View style={styles?.formContainer}>
                <View style={styles.messageContainer}>
                  {/* <Text>{height * .6}</Text> */}
                  <Text style={styles.heading}>Forgot Password!</Text>
                  <Text style={{ ...styles.forecolor, textAlign: "center", }}>Enter your email to reset password</Text>
                </View>
                {successMessage && (
                  <Text style={styles.successMessage}>{successMessage}</Text>
                )}
                {errorMessage && (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                <View style={{ gap: height * 0.045 }}>

                  <View style={[styles.inputContainer]}>
                    <View>
                      {/* <Text style={styles.forecolor}>Email: </Text> */}
                      <InputFieldIcon
                        placeholder="Enter your email"
                        placeholderTextColor={greyishBlackColorShaded}
                        onChangeText={(text) => setEmail(text)}
                        rightIcon={<Icon size={20} name="user" type="feather" />}
                      />
                    </View>
                  </View>
                  <View style={{}}>
                    <View style={[]} >
                      {/* <SecondaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Login"} onPress={() => doLogin()} /> */}
                      <AuthButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={whitecolor} shouldRasterizeIOS /> : "SUBMIT"} onPress={() => doForgotPassword()} />
                    </View>
                  </View>
                </View>

                {/* <View style={{ ...styles?.viewSignup, marginTop: WINDOWHEIGHT / 200 }}>
              <Text style={styles.loginText}>
                Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ ...styles.loginText, fontWeight: "700" }}>Sign Up</Text>
              </TouchableOpacity>
            </View> */}
              </View>
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        <View style={{ display: showFooter, width: width, height: height * .16, position: 'relative', bottom: 0, left: 0, }}>
          <ImageBackground resizeMode='stretch' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width + 1, height: height * .2, alignItems: "flex-end" }} source={require('../../assets/auth-footer.png')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: height * .02 }}>
              <Text style={styles.loginText}>Remember your account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ ...styles.loginText }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* </SafeAreaView> */}
      </SafeAreaView>
    </>
  );
};

export default ForgotPassword;
 