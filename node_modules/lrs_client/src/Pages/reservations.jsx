/*
Author: Chantal Sia
*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import '../Styles/reservations.css'

export function Reservation(){
    return(
        <>
            <div className="ReservationContainer">
                <Header/> 
                <div className = "Reservation_Body">
                    <div className = "seeBox">
                        see reservations here?
                    </div>

                    <div className = "editBox">
                        edit your reservations here
                    </div>

                    <div className = "removeBox">
                        delete your reservations here
                    </div>
                    
                </div>
                <Footer/>
            </div>
        </>
    )

}

