import React, {Component} from 'react';
import Header from '../../components/Header';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import {secondaryColor} from '../../utils/Colors';
// import {} from 'react-native-gesture-handler';
const Home: () => React$Node = ({navigation}) => {
  return (
    <>
      <Header
        headerTitle="Dashboard"
        onPress={() => navigation.navigate('Search')}
      />

      {/* <View style={styles.container}>
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('Listing', {name: 'Venues', listType: 'Venue'})
          }>
          <Image
            source={require('../../assets/venues.png')}
            style={{
              width: '100%',
              height: 135,
              resizeMode: 'stretch',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('Listing', {
              name: 'Photographers',
              listType: 'Photographer',
            })
          }>
          <Image
            source={require('../../assets/photographers.png')}
            style={{
              width: '100%',
              height: 135,
              resizeMode: 'stretch',
              marginVertical: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('Listing', {
              name: 'Caterers',
              listType: 'Caterer',
            })
          }>
          <Image
            source={require('../../assets/caterers.png')}
            style={{
              width: '100%',
              height: 135,
              resizeMode: 'stretch',
              marginBottom: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('Listing', {
              name: 'Decorators',
              listType: 'Decorator',
            })
          }>
          <Image
            source={require('../../assets/decorators.png')}
            style={{
              width: '100%',
              height: 125,
              resizeMode: 'stretch',
            }}
          />
        </TouchableOpacity>
      </View> */}
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
