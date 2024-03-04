
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

  const AuthContext = createContext();
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      fname: null,
      isLoggedIn: false,
    }
    );
  
    const setLoggedIn = (userData) => {
      setUser({
        fname: userData,
        isLoggedIn: true,
      })
    };
  
    const setLoggedOut = () => {
      setUser({
        fname: null,
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