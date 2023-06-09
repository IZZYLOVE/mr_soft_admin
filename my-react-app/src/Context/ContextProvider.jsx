import React, { useState, createContext } from 'react';
import { Login } from '../routes/Login';
import { Register } from '../routes/Register';

export const AppContext = createContext(null)

export function ContextProvider() {
   const [rooturl, setRooturl] = useState('http://127.0.0.1:7300/');

   return (
     <AppContext.Provider value={{rooturl, setRooturl}}>
       <Login  />
       <Register/>
      </AppContext.Provider>
   );
}