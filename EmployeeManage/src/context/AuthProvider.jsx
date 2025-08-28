import React, { createContext, useEffect, useState } from 'react';
import { GetLocalStorage } from '../utils/LocalStorage';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const { employeedata = [], admindata = {} } = GetLocalStorage();
    setUserdata({ employeedata, admindata });
  }, []);

  return (
    <AuthContext.Provider value={[userdata, setUserdata]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;