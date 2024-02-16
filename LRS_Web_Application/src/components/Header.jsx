/*
Author: Ram David Brodett
*/

import './style.css'
import Icon from '../assets/Icon.png'
import { Link } from 'react-router-dom'
import { AccDisplay } from './accDisplay'
import { useState } from 'react'
import {SidePanel} from './sidePanel'
import { Search_Field } from './searchpill'

export function Header(){
    /* this is temporary have to fix the backend for the username retrieval */
    const[username] =  useState('david');
    const[userId] = useState(3);
    const[isSpVisible , setIsSpVisible] = useState(false);
    /* this is temporary have to fix the backend for the login check */
    const[IsLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogOut = () =>{
        //process logout backend mechanism
        setIsLoggedIn(false)
    }

    const toggleSidePanel = () => {
        console.log(isSpVisible)
        console.log('Toggle Side Panel clicked');
        setIsSpVisible(prevState => !prevState);
        console.log(isSpVisible)

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
                <Link className='NavElem' to='/book'>Book</Link>
                {IsLoggedIn?(
                    <a className='NavElem' onClick={handleLogOut}>Log out</a>
                    ):(
                    <Link className='NavElem' to='/login'>Log in</Link>
                )}
                <div onClick={toggleSidePanel}>
                    <AccDisplay className='NavElem' name={username} accLoggedIn={IsLoggedIn}/>
                </div>
                <SidePanel visibility={isSpVisible} onClose={toggleSidePanel} userId={userId} />
            </div>

        </div>
    )

}
