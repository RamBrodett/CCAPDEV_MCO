// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home.jsx'
import {About} from './Pages/about.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'
import { Guide } from './Pages/guide.jsx'
import { LabSelect } from './Pages/labSelect.jsx'
import { Book } from './Pages/book.jsx'
import { Checkout } from './Pages/checkout.jsx'
import { Profile } from './Pages/profile.jsx'
import { Reservations } from './Pages/reservations.jsx'
import { SettingsProfile } from './Pages/settings.jsx'
import { useAuth } from './AuthContext.jsx'

function App() {
    const {user, setLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAndLoginUser = async () => {
        try {
          const response = await fetch('https://techquiverlrs.onrender.com/auth/check', {
            method: 'GET',
            credentials: 'include',
          });
    
          if (response.ok) {
            const { userData } = await response.json();
            setLoggedIn(userData);
          }
        } catch (error) {
          console.error('Error checking login status: ', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      checkAndLoginUser();
    
    },[]);

  
    if (isLoading) {
      // loading indicator or spinner while checking login status
      return <div className='LoadingScreen'>Loading...</div>;
    }
  
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/locations' element={<Location />} />
          <Route path='/guide' element={<Guide />} />
          <Route path='/About' element={<About />} />
          <Route path='/labSelect' element={<LabSelect />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/book' element={<Book />} />
          <Route path='/profile/:userCred' element={<Profile />} />
          <Route path='/reservations/:userCred' element={<Reservations />}/>
          <Route path='/settings' element={<SettingsProfile />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
