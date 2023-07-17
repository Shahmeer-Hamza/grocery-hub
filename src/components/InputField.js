import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {greyishBlackColorShaded, primaryColor, secondaryColorShaded} from '../utils/Colors';

export const InputField = ({...rest}) => {
  return (
    <View style={styles.inputView} {...rest}>
      <TextInput {...rest} style={{...styles.inputText, color: greyishBlackColorShaded}} placeholderTextColor={greyishBlackColorShaded} />
    </View>
  );
};
export const InputFieldFull = ({...rest}) => {
  return (
    <View style={styles.inputViewFull}>
      <TextInput {...rest} style={styles.inputText} placeholderTextColor={"grey"}/>
    </View>
  );
};

export const TextAreaFull = ({...rest}) => {
  return (
    <View style={styles.textAreaViewFull}>
      <TextInput {...rest} style={styles.textAreaText} multiline />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    // width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 50,
    // marginBottom: 10,
    justifyContent: 'center',
    borderColor: "#000",
    // borderWidth: 1,
    padding: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    elevation: 3,
  },
  inputViewFull: {
    width: '100%',
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  textAreaViewFull: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    minHeight: 50,
    maxHeight: 100,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  inputText: {
    height: 50,
    color: "#000",
    
  },
  textAreaText:{
    color: primaryColor,  
  }
});
