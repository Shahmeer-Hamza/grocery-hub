import React from 'react';
import { Image, View } from 'react-native';
import { windowHeight } from './WindowDimensions';
import { secondaryColor } from './Colors';

export const LogoInverse = ({ width, height }) => {
  return (
    <View style={{backgroundColor: "transparent", borderRadius: 100,borderWidth:5,borderColor:secondaryColor}}>
    <Image
      source={require('../assets/logo-inverse.png')}
      style={{ 
        width: width, height: height, 
        resizeMode: 'stretch' }}
    />
    </View>
  );
};
export const Logo = ({ width, height }) => {
  let source = require('../assets/logo.png') 
  return (
    <Image
      source={require('../assets/logo.png')}
      style={{ 
        width: width, height: height, 
        resizeMode: 'stretch' }}
    />
  );
};
