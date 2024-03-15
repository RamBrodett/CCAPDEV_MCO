/*for admins only*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'

export function editreservations(){
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