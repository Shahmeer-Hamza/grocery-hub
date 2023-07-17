import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({headerTitle, ...rest}) => {
  return (
    <View style={styles.headerMain}>
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.headerText}>{headerTitle}</Text>

        <TouchableOpacity {...rest}>
          <FontAwesomeIcon icon={faSearch} color="#000" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    width: '100%',
    height: 50,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#fff',
    zIndex: 2,
    flexDirection: 'row',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
});
export default SearchBar;
