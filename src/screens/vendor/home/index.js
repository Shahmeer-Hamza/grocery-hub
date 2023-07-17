import React, {Component} from 'react';
import Header from '../../../components/Header';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

// import {} from 'react-native-gesture-handler';
const Home: () => React$Node = ({navigation}) => {
  return (
    <>
      <Header headerTitle="Vendor Dashboard" hideSearch={true} />

      <View style={styles.container}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Home;
