import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const Modal = ({isVisible,content}) => {
  return (
    <View style={[{display: isVisible?'flex':'none'},styles.modalMain]}>
      <View style={styles.modal}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    modalMain: {
    width: '100%',
    height: '100%',
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:11,
    elevation:11,
  },
  modal: {
    width: '90%',
    maxHeight:350,
    padding:20,
    backgroundColor:'white',
    borderRadius:20,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
});
export default Modal;
