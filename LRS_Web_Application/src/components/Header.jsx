import './style.css'
import Icon from '../assets/Icon.png'
import { Link } from 'react-router-dom'
import { AccDisplay } from './accDisplay'
import { useState } from 'react'

export function Header(){
    /* this is temporary have to fix the backend for the username retrieval */
    const[username] =  useState('temp');
    /* this is temporary have to fix the backend for the login check */
    const[IsLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogOut = () =>{
        //process logout backend mechanism
        setIsLoggedIn(false)
    }

    return(
        <div className="Header" >
            <div className='LRS-Banner'>
            <img id='LRS_Header-Icon' src={Icon}/>
            <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
            </div>
            <div className="NavMenu">
                <Link className='NavElem' to='/'> Home </Link>
                <Link className='NavElem' to='/Booking'> Book </Link>
                {IsLoggedIn?(
                    <a className='NavElem' onClick={handleLogOut}>Log out</a>
                    ):(
                    <Link className='NavElem' to='/login'> Log in </Link>
                )}
                <AccDisplay className='NavElem' name={username} accLoggedIn={IsLoggedIn}/>
            </div>

        </div>
    )

}
