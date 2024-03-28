/*for admins only*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'

import { useState} from 'react'
import { Link } from 'react-router-dom';
import  generateTable from '../Components/generateTable';

export function editreservations(){
    /*
        insert auth for admins only viewing
    */
    const fetchrole = async (userData) =>{
        const userId = userData.userID;
    }

    if (isAdmin === false){
        return(
            <h1>Access Denied</h1>
        )
    }

    /*get reservation data and display it*/
    
    return(
        <>
            <Header/>
            <div className="editreservations">
                <h1>Edit Reservations</h1>
            </div>
            <Footer/>
        </>
    )
}