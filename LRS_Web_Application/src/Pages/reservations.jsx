/*
Author: Chantal Sia
*/

import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'

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

