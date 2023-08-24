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
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
  greyishBlackColorShaded,
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

  const {
    register,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage, isLoading,
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ ...styles?.scrollView, }}>
        <StatusBar barStyle="light-content" backgroundColor={"transparent"} />
        {/* <View style={{ ...styles.topContainer }}>
      </View> */}
        <View style={{ height: height * .2 }}>
          <Image resizeMode='contain' source={require('../../assets/auth-header.png')} style={{ width: width, height: height * .2 }} />
        </View>
        <View style={styles.bottomContainer}>
          {/* <Text style={{ ...styles.logo, height: 110, position: "absolute", top: (height - (height * 1.1)), alignSelf: "center", marginBottom: 12 }}>
          <LogoInverse width={120} height={120} />
        </Text> */}
          <View style={styles?.formContainer}>
            <Text style={styles.heading}>Welcome!</Text>
            <Text style={{ ...styles.forecolor, textAlign: "center", }}>Create an account to Sign Up</Text>
            {successMessage && (
              <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <View style={styles.marginTop} >
              {/* <Text style={styles.forecolor}>Username: </Text> */}
              <InputField
                placeholder="Enter your name"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            <View style={styles.marginTop} >
              {/* <Text style={styles.forecolor}>Email: </Text> */}
              <InputField
                placeholder="Enter your email"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.marginTop} >
              {/* <Text style={styles.forecolor}>Password:</Text> */}
              <InputField
                secureTextEntry
                placeholder="Enter your password"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.marginTop} >
              {/* <PrimaryButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "Signup"} onPress={() => doRegister()} /> */}
              <AuthButton buttonText={isLoading ? <ProgressBarAndroid styleAttr="Small" color={secondaryColor} shouldRasterizeIOS /> : "SIGNUP"} onPress={() => doRegister()} />
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 1, alignItems: 'center' }}>
              <View style={{ borderTopWidth: 1, width: '40%', height: 0, borderColor: '#000' }}></View>
              <Text style={{ width: '20%', textAlign: 'center', color: greyishBlackColorShaded, fontFamily: RalewayRegular, fontSize: 12, fontWeight: 500, letterSpacing: 1, paddingVertical: height / 60 }}> Or </Text>
              <View style={{ borderTopWidth: 1, width: '40%', height: 0, borderColor: '#000' }}></View>
            </View>

            <View>
              <PrimaryButton buttonText={<><Image resizeMode='contain' style={{ width: 15, height: 15 }} source={require("../../assets/google-icon.png")} /> <Text style={{ fontSize: 12 }}>Signup with Google</Text></>} />
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
        <View style={{}}>
          <ImageBackground resizeMode='contain' style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: width, height: height * .2, alignItems: "center" }} source={require('../../assets/auth-footer.png')}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => navigation.navigate('Login')}>
              <Text style={{
                ...styles.loginText,
              }}>Login</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Signup;
