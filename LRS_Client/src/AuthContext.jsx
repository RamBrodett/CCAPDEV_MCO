
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

  const AuthContext = createContext();
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      userID: null,
      firstname: null,
      lastname: null,
      profileKey: null,
      isLoggedIn: false,
    }
    );
  
    const setLoggedIn = (userData) => {
      setUser({
        userID: userData.userId,
        firstname: userData.firstname,
        lastname: userData.lastname,
        profileKey: userData.profileKey,
        isLoggedIn: true,
      })
    };
  
    const setLoggedOut = () => {
      setUser({
        userID: null,
        firstname: null,
        lastname: null,
        profileKey: null,
        isLoggedIn: false,
      })
    };

    AuthProvider.propTypes = {
      children: PropTypes.node.isRequired,
    };
  
    return (
      <AuthContext.Provider value={{ user, setLoggedIn, setLoggedOut }}>
        {children}
      </AuthContext.Provider>
    );

  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };