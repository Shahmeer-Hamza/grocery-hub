import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  primaryColor,
  secondaryColor,
  primaryColorShaded,
} from '../../utils/Colors';

import { LogoInverse } from '../../utils/Logos';
import { PrimaryButton } from '../../components/Buttons';
import { InputField } from '../../components/InputField';
import { AuthContext } from '../../navigation/AuthProvider';
import { Image } from 'react-native';
import { styles } from '../../assets/styles/auth';

const WINDOWHEIGHT = Dimensions.get("screen").height
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

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
    <>

      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={"transparent"} />
        <View style={{ ...styles.topContainer }}>

        </View>
        {/*   <View style={styles.bottomContainer}>

          <Text style={{ ...styles.logo, height: 110, position: "absolute", top: (WINDOWHEIGHT - (WINDOWHEIGHT * 1.1)), alignSelf: "center", marginBottom: 12 }}>
            <LogoInverse width={120} height={120} />
          </Text>

          <View style={styles?.formContainer}>
            <Text style={styles.heading}>Welcome To Davat</Text>
            <Text style={{ ...styles.forecolor, textAlign: "center", }}>making memories memorable</Text>
            {successMessage && (
              <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}

            <View>
              <Text style={styles.forecolor}>Email: </Text>
              <InputField
                placeholder="Enter your email"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.marginTop} >
              <Text style={styles.forecolor}>Password:</Text>
              <InputField
                secureTextEntry
                placeholder="*********"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.marginTop} >
              <PrimaryButton buttonText="Login" onPress={() => doLogin()} />
            </View>
            <View style={styles.marginTop} >
              <PrimaryButton buttonText={<><Image resizeMode='stretch' style={{ width: 15, height: 15 }} source={require("../../assets/google-icon.png")} /> <Text style={{ fontSize: 14 }}>Login with Google</Text></>} />
            </View>

            <View style={{...styles?.viewSignup, marginTop: 20}}>
              <Text style={styles.loginText}>
                Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ ...styles.loginText, fontWeight: "700" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
            </View>*/}
        <View style={{ ...styles.bottomContainer, height: WINDOWHEIGHT / 2 }}>

          <Text style={{ ...styles.logo, height: 110, position: "absolute", top: (WINDOWHEIGHT - (WINDOWHEIGHT * 1.1)), alignSelf: "center", marginBottom: 12 }}>
            <LogoInverse width={120} height={120} />
          </Text>

          <View style={styles?.formContainer}>
            <Text style={styles.heading}>Welcome To Davat</Text>
            <Text style={{ ...styles.forecolor, textAlign: "center", }}>making memories memorable</Text>
            {successMessage && (
              <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}

            <View style={styles.marginTop} >
              <Text style={styles.forecolor}>Email or Phone Number: </Text>
              <InputField
                placeholder="Enter here"
                placeholderTextColor={primaryColorShaded}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.marginTop} >
              <PrimaryButton buttonText="Submit" onPress={() => doForgotPassword()} />
            </View>




          </View>
        </View>
        <View style={{ backgroundColor: "#fff", height: WINDOWHEIGHT / 5, borderTopLeftRadius: 30, borderTopRightRadius: 30 , display: "flex", flexDirection:"column", justifyContent: "center", position: "absolute", bottom: 0, width: "100%" }}>

          <View style={{ ...styles?.viewSignup}}>
            <Text style={{ ...styles.loginText, color: "#000", fontSize: 14, fontWeight: '600' }}>
              Don't have an account? </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            >
              <Text style={{ ...styles.loginText, fontWeight: "700", color: secondaryColor }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;
