/*
Author: Ram David Brodett
*/

import '../Styles/Header_Footer.css'
import Icon from '../Assets/Icon.png'
import { Link } from 'react-router-dom'
import { AccDisplay } from './accDisplay'
import { useState } from 'react'
import {SidePanel} from './sidePanel'
import { Search_Field } from './searchpill'
import { useAuth} from '../AuthContext.jsx'

export function Header(){
    const {user, setLoggedOut} = useAuth();
    /* this is temporary have to fix the backend for the username retrieval */
    const[userId] = useState(3);
    const[isSpVisible , setIsSpVisible] = useState(false);
    /* this is temporary have to fix the backend for the login check */
    const handleLogOut = async () =>{
        
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials (cookies) in the request
        });
        
        if (response.ok){
            setLoggedOut();
        }
        
        setLoggedOut();
    }

    const toggleSidePanel = () => {
        setIsSpVisible(prevState => !prevState);
    }

    return(
        <div className="Header" >
            <div className='LRS-Banner'>
            <img id='LRS_Header-Icon' src={Icon}/>
            <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
            </div>
            <div id='SearchHeader'>
                <Search_Field />
            </div>
            <div className="NavMenu">
                <Link className='NavElem' to='/'>Home</Link>
                <Link className='NavElem' to='/labSelect'>Book</Link>
                {user.isLoggedIn?(
                    <a className='NavElem' onClick={handleLogOut}>Log out</a>
                    ):(
                    <Link className='NavElem' to='/login'>Log in</Link>
                )}
                <div onClick={toggleSidePanel}>
                    <AccDisplay className='NavElem' />
                </div>
                <SidePanel visibility={isSpVisible} onClose={toggleSidePanel} userId={userId} />
            </div>

        </div>
    )

}
