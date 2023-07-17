import React, { useContext, useEffect } from 'react';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import { createStackNavigator } from '@react-navigation/stack';
import Walkthrough from '../screens/auth/Walkthrough';
import { AuthContext } from './AuthProvider';
import SplashScreen from '../screens/SplashScreen';
const Stack = createStackNavigator();

const AuthStack: () => React$Node = ({  }) => {
  
  const { getWalkthrough,isLoading } = useContext(AuthContext)

  useEffect(()=>{
    getWalkthrough()
  },[])

  return (
    <Stack.Navigator initialRouteName='SplashScreen' >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Walkthrough"
        component={Walkthrough}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
