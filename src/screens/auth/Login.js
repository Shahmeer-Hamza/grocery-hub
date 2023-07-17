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
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
  greyishBlackColorShaded,
} from '../../utils/Colors';

import { LogoInverse } from '../../utils/Logos';
import { AuthButton, PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { InputField } from '../../components/InputField';
import { AuthContext } from '../../navigation/AuthProvider';
import { Image } from 'react-native';
import { styles } from '../../assets/styles/auth';
import { Divider } from 'react-native-elements';


const WINDOWHEIGHT = Dimensions.get("screen").height
const { width, height } = Dimensions.get("screen")
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles?.scrollView}>
        <StatusBar barStyle="light-content" />
        <View style={{ height: height * .2 }}>
          <Image resizeMode='contain' source={require('../../assets/auth-header.png')} style={{ width: width, height: height * .2 }} />
        </View>
        {/* <View style={{ ...styles.topContainer, }}>

        </View> */}
        <View style={styles.bottomContainer}>
          {/* <Text style={{ ...styles.logo, height: 110, position: "absolute", top: (WINDOWHEIGHT - (WINDOWHEIGHT * 1.1)), alignSelf: "center", }}>
            <LogoInverse width={120} height={120} />
          </Text> */}

          <View style={styles?.formContainer}>
            <View style={styles.messageContainer}>
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
                <InputField
                  placeholder="Enter your email"
                  placeholderTextColor={greyishBlackColorShaded}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles?.marginTop} >
                {/* <Text style={styles.forecolor}>Password:</Text> */}
                <InputField
                  secureTextEntry
                  placeholder="Enter your password"
                  placeholderTextColor={greyishBlackColorShaded}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>
            <View style={styles.forgotButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={[]} >
              {/* <SecondaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Login"} onPress={() => doLogin()} /> */}
              <AuthButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "LOGIN"} onPress={() => doLogin()} />
            </View>
            <View style={{flexDirection: 'row', paddingVertical:1, alignItems: 'center' }}>
              {/* <Divider inset={true} width={1} color='#000' insetType='left' /> */}
              <View style={{borderTopWidth: 1, width: '40%', height: 0, borderColor:'#000'}}></View>
              <Text style={{width: '20%', textAlign: 'center', color: greyishBlackColorShaded, fontFamily: 'Raleway', fontSize: 12, fontWeight: 500, letterSpacing: 1, paddingVertical: height/60}}> Or </Text>
              <View style={{borderTopWidth: 1, width: '40%', height: 0, borderColor:'#000'}}></View>
              {/* <Divider inset={true} width={1} color='#000' insetType='right' /> */}
            </View>
            <View >
              <PrimaryButton buttonText={<><Image resizeMode='contain' style={{ width: 15, height: 15 }} source={require("../../assets/google-icon.png")} /> <Text style={{ fontSize: 12 }}>Login with Google</Text></>} />
            </View>

            {/* <View style={{ ...styles?.viewSignup, marginTop: WINDOWHEIGHT / 200 }}>
              <Text style={styles.loginText}>
                Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ ...styles.loginText, fontWeight: "700" }}>Sign Up</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <View></View>
        </View>
        <View style={{}}>
        <ImageBackground resizeMode='contain' style={{flex:1, flexDirection: 'row', justifyContent:'center', width: width, height: height * .2, alignItems: "center"}} source={require('../../assets/auth-footer.png')}>
        <Text style={styles.loginText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ ...styles.loginText }}>Sign Up</Text>
              </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};



export default Login;
