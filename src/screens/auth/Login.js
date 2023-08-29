import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  ProgressBarAndroid,
  Pressable,
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
  greyishBlackColorShaded,
  borderColor,
} from '../../utils/Colors';

import { LogoInverse } from '../../utils/Logos';
import { AuthButton, PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { InputField, InputFieldIcon } from '../../components/InputField';
import { AuthContext } from '../../navigation/AuthProvider';
import { Image } from 'react-native';
import { styles } from '../../assets/styles/auth';
import { Divider, Icon } from 'react-native-elements';
// import FeatherIcons from 'react-native-elements/FeatherIcons';
import { RalewayRegular } from '../../utils/fonts';


const WINDOWHEIGHT = Dimensions.get("screen").height
const { width, height } = Dimensions.get("screen")
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    login,
    isLoading,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
  } = useContext(AuthContext);

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const doLogin = () => {
    if (email == '') {
      setErrorMessage('Email field is required');
    } else if (password == '') {
      setErrorMessage('Password field is required');
    } else {
      login(email, password);
    }
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={{ height: height * .18 }}>
          <Image resizeMode='stretch' source={require('../../assets/auth-header.png')} style={{ width: width, height: height * .18 }} />
        </View>
        <View style={[styles.bottomContainer, { height: height * .64 }]}>
          <ScrollView style={styles?.scrollView}>
            <View style={styles?.formContainer}>
              <View style={styles.messageContainer}>
                {/* <Text>{height * .6}</Text> */}
                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={{ ...styles.forecolor, textAlign: "center", }}>Enter your details to Log In</Text>
              </View>
              {successMessage && (
                <Text style={styles.successMessage}>{successMessage}</Text>
              )}
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
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
                <View style={styles?.marginTop} >
                  {/* <Text style={styles.forecolor}>Password:</Text> */}
                  <InputFieldIcon
                    secureTextEntry={!showPassword}
                    placeholder="Enter your password"
                    placeholderTextColor={greyishBlackColorShaded}
                    onChangeText={(text) => setPassword(text)}
                    rightIcon={<Icon size={20} name={showPassword ? "eye-off" : "eye"} type="feather" onPress={() => setShowPassword(!showPassword)} />}
                  />
                </View>
              </View>
              <View style={styles.forgotButtonContainer}>
                <View>
                  <Pressable style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgot}>Forget your password?</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ paddingBottom: 10, }}>
                <View style={[]} >
                  {/* <SecondaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Login"} onPress={() => doLogin()} /> */}
                  <AuthButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "LOGIN"} onPress={() => doLogin()} />
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 1, alignItems: 'center' }}>
                  {/* <Divider inset={true} width={1} color='#000' insetType='left' /> */}
                  <View style={{ borderTopWidth: 1, width: '40%', height: 0, borderColor: borderColor }}></View>
                  <Text style={{ width: '20%', textAlign: 'center', color: greyishBlackColorShaded, fontFamily: RalewayRegular, fontSize: 12, fontWeight: 500, letterSpacing: 1, paddingVertical: height * 0.020, lineHeight: 22 }}> Or </Text>
                  <View style={{ borderTopWidth: 1, width: '40%', height: 0, borderColor: borderColor }}></View>
                  {/* <Divider inset={true} width={1} color='#000' insetType='right' /> */}
                </View>
                <View>
                  <PrimaryButton buttonText={<><Image resizeMode='contain' style={{ width: 15, height: 15 }} source={require("../../assets/google-icon.png")} /> <Text style={{ fontSize: 12 }}>Login with Google</Text></>} />
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
            {/* <View></View> */}
          </ScrollView>
        </View>
        <View style={{ width: width, height: height * .16, }}>
          <ImageBackground resizeMode='stretch' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width + 1, height: height * .2, alignItems: "center" }} source={require('../../assets/auth-footer.png')}>
            <View style={{ position: "absolute", bottom: 20, flexDirection: 'row', justifyContent: 'center', }}>
              <Text style={styles.loginText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ ...styles.loginText }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </>
  );
};



export default Login;
