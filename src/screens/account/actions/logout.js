import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native-gesture-handler';

import { SecondaryButton } from '../../../components/Buttons';
import { AuthContext } from '../../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ styles }) => {
  const { logout, getWalkthrough, setWalkthrough } = useContext(AuthContext);
  return <SecondaryButton styles={styles} buttonText="Logout" onPress={() => {
    logout()

  }} />;
};

export default Logout;
