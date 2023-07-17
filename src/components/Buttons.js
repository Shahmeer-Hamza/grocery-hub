import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { greyishBlackColorShaded, primaryColor } from '../utils/Colors';

export const PrimaryButton = ({ buttonText, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={styles.btn}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export const SecondaryButton = ({ buttonText, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <Text style={{
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
      }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export const AuthButton = ({ buttonText, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={styles.authBtn}>
      <Text style={{
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Raleway',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 22,
        letterSpacing: 1,
      }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    elevation: 2,
  },
  authBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#222235',
    borderRadius: 8,
    justifyContent: 'center',
  },
  text: {
    fontFamily: "Raleway",
    fontSize: 12,
    fontWeight: '400',
    color: greyishBlackColorShaded,
  },
});
