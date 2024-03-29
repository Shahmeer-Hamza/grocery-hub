import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView, ProgressBarAndroid,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
  greyishBlackColorShaded,
  borderColor,
  whitecolor,
} from '../../utils/Colors';

import { LogoInverse } from '../../utils/Logos';
import { AuthButton, PrimaryButton } from '../../components/Buttons';
import { InputField } from '../../components/InputField';
import { AuthContext } from '../../navigation/AuthProvider';
import { styles } from '../../assets/styles/auth';
import { windowHeight } from '../../utils/WindowDimensions';
import { Divider } from 'react-native-elements';
import { RalewayRegular } from '../../utils/fonts';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    register,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage, 
    isLoading,
    onGoogleLogin,
  } = useContext(AuthContext);

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const doRegister = () => {
    if (username == '') {
      setErrorMessage('Username field is required');
    } else if (email == '') {
      setErrorMessage('Email field is required');
    } else if (password == '') {
      setErrorMessage('Password field is required');
    } else {
      register(username, email, password)
    }
  };
  const { width, height } = Dimensions.get('screen')
  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={"transparent"} />
      <SafeAreaView style={styles.container}>
        <View style={{ height: height * .18, position: 'relative', top: 0, left: 0, }}>
          <Image resizeMode='stretch' source={require('../../assets/auth-header.png')} style={{ width: width + 1, height: height * .16 }} />
        </View>
        {/* <View style={{ ...styles.topContainer }}>
      </View> */}
        <ScrollView style={{ ...styles?.scrollView, }}>
          <View style={[styles.bottomContainer, {}]}>
            {/* <Text style={{ ...styles.logo, height: 110, position: "absolute", top: (height - (height * 1.1)), alignSelf: "center", marginBottom: 12 }}>
          <LogoInverse width={120} height={120} />
        </Text> */}
            <View style={styles?.formContainer}>
              <View style={styles.messageContainer}>
                <Text style={styles.heading}>Welcome!</Text>
                <Text style={{ ...styles.forecolor, textAlign: "center", }}>Create an account to Sign Up</Text>
              </View>
              {successMessage && (
                <Text style={styles.successMessage}>{successMessage}</Text>
              )}

              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
              <View style={[styles.inputContainer]}>
                <View>
                  {/* <Text style={styles.forecolor}>Username: </Text> */}
                  <InputField
                    placeholder="Enter your name"
                    placeholderTextColor={primaryColorShaded}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View>
                  {/* <Text style={styles.forecolor}>Email: </Text> */}
                  <InputField
                    placeholder="Enter your email"
                    placeholderTextColor={primaryColorShaded}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
                <View>
                  {/* <Text style={styles.forecolor}>Password:</Text> */}
                  <InputField
                    secureTextEntry
                    placeholder="Enter your password"
                    placeholderTextColor={primaryColorShaded}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View>
                  {/* <PrimaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Signup"} onPress={() => doRegister()} /> */}
                  <AuthButton buttonText={isLoading ? <ActivityIndicator color='#fff' size="small" /> : "SIGNUP"} onPress={() => doRegister()} />
                </View>
              </View>
              <View style={{paddingBottom: 10}}>
                <View style={{ flexDirection: 'row', paddingVertical: 1, alignItems: 'center' }}>
                  <View style={{ borderTopWidth: 0.5, width: '40%', height: 0, borderColor: borderColor }}></View>
                  <Text style={{ width: '20%', textAlign: 'center', color: greyishBlackColorShaded, fontFamily: RalewayRegular, fontSize: 12, fontWeight: 500, letterSpacing: 1, paddingVertical: height * 0.020, lineHeight: 22 }}> Or </Text>
                  <View style={{ borderTopWidth: 0.5, width: '40%', height: 0, borderColor: borderColor }}></View>
                </View>
                <View>
                  <PrimaryButton onPress={() => onGoogleLogin()} buttonText={<><Image resizeMode='contain' style={{ width: 15, height: 15 }} source={require("../../assets/google-icon.png")} /> <Text style={{ fontSize: 12 }}>Signup with Google</Text></>} />
                </View>
              </View>

              {/* <View style={{ ...styles?.viewSignup, marginTop: 0 }}>
              <Text style={styles.loginText}>
                Already have an account </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ ...styles.loginText, fontWeight: "700" }}>Login</Text>
              </TouchableOpacity>
            </View> */}
            </View>
          </View>
        </ScrollView>
        <View style={{ display: showFooter, width: width, height: height * .16, position: 'relative', bottom: 0, left: 0, }}>
          <ImageBackground resizeMode='stretch' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width + 1, height: height * .2, alignItems: "flex-end" }} source={require('../../assets/auth-footer.png')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: height * .02, }}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ ...styles.loginText }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* <View style={{ width: width, height: height * .16, position: "absolute", bottom: 0, }}>
          <ImageBackground resizeMode='stretch' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width + 1, height: height * .2, alignItems: "center" }} source={require('../../assets/auth-footer.png')}>
            <View style={{ position: "absolute", bottom: 20, flexDirection: 'row', justifyContent: 'center', }}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => navigation.navigate('Login')}>
                <Text style={{
                  ...styles.loginText,
                }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View> */}
      </SafeAreaView>
    </>
  );
};


export default Signup;
