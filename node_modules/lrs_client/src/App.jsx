// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'
import { Guide } from './Pages/guide.jsx'
import { LabSelect } from './Pages/labSelect.jsx'
import { Book } from './Pages/book.jsx'
import { Checkout } from './Pages/checkout.jsx'
import { Profile } from './Pages/profile.jsx'
import{ SettingsProfile } from './Pages/settings.jsx'
import { useAuth } from './AuthContext.jsx'

function App() {
   const [isLoading, setIsLoading] = useState(true);
   const {user,setLoggedIn} = useAuth();

    useEffect(()=>{
        const checkAndLoginUser = async () =>{
            try{
                const response = await fetch('http://localhost:3000/auth/check',{
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok){
                    const { userData } = await response.json();
                    setLoggedIn(userData);
                }

            }catch(error){
                console.error('Error checking login status: ', error);
            }finally{
                setIsLoading(false);
            }
        }

        checkAndLoginUser();

    },[user]);

    if (isLoading) {
        // loading indicator or spinner while checking login status
        return <div className='LoadingScreen'>Loading...</div>;
      }


    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/locations' element={<Location/>}/>
                <Route path='/guide' element={<Guide/>}/>
                <Route path='/labSelect' element={<LabSelect />}/>
                <Route path='/checkout' element={<Checkout />}/>
                <Route path='/book' element={<Book />}/>
                <Route path='/profile/:userCred' element={<Profile />}/>
                <Route path='/settings' element={<SettingsProfile />}/>
            </Routes>
        </Router>
    )
}
export default App