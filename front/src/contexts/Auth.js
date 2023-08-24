import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: '',
    name: '',
    email: '',
  });

  const signIn = async (email, password) => {
    // Lógica para autenticação e obtenção do token
    const token = await yourAuthenticationFunction(email, password);
    setAuthData({ ...authData, token });
    return authData;
  };

  const signOut = async () => {
    // Lógica para fazer logout e remover o token
    setAuthData({ ...authData, token: '' });
  };

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};