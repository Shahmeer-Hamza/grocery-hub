/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Providers from './src/navigation/index';
// import {primaryColor, secondaryColor} from './src/utils/Colors';

// import {Logo} from './src/utils/Logos';
import { AuthProvider } from './src/navigation/AuthProvider';

const App: React.FC = () => {
  const [splashShow, setSplashShow] = useState('flex');

  useEffect(() => {
    setTimeout(() => {
      setSplashShow('none');
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle="default" translucent={true} backgroundColor="transparent" />
      <AuthProvider splashShow={splashShow} ><Providers /></AuthProvider>
    </>
  );
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
//   splash: {
//     backgroundColor: 'white',
//     flex: 1,
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     height: '100%',
//     width: '100%',
//     position: 'absolute',
//     zIndex: 11111,
//   },
// });

export default App;
