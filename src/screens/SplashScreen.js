import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Logo } from '../utils/Logos';
import { AuthContext } from '../navigation/AuthProvider';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen: () => React$Node = ({ navigation }) => {
  const { walkthrough, getWalkthrough, user } = useContext(AuthContext)

  useEffect(() => {
    setTimeout(() => {
      getWalkthrough()
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        if (walkthrough == 1)
          navigation.navigate("Login")
        else if (walkthrough == 0)
          navigation.navigate("Walkthrough")
      }

    }, 1000);
  }, [walkthrough])

  useEffect(() => {
    setTimeout(() => {
      if (user)
        navigation.navigate("BottomTab")
    }, 1000);
  }, [user])
  return (
    <LinearGradient colors={["#4dca63", "#239337"]} style={[styles.splash,]}>
      <View style={styles.logoDiv}>
        <Logo width={200} height={150} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  splash: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 11111,
  },
});
export default SplashScreen