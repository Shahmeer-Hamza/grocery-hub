import React, { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from './AuthProvider';
import Routes from './Routes';
const Providers: () => React$Node = () => {
  return (
     <Routes />
  );
};

export default Providers;
