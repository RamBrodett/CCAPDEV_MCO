/*
Author: Chantal Sia
*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import '../Styles/guide.css'

export function Guide(){
    return(
        <div className="GuideContainter">
            <Header/>
            <div className="Guide_Body">
                {/*Chantal do this:
                 implement a simple user guide page that 
                explains how to use our webpage, specifically the
                booking part then just navigation tour for other pages
                put the css code in components/style.css */}
                <div className = "topPortion" >
                    <h1>Guide</h1>
                    <p>
                    Welcome to the Laboratory Reservation System! Here is a step-by-step guide on how you
                    can easily book your own laboratory seat.
                    </p>
                </div>

                <div className = "stepcontainer"> 
                    <div className = "step">
                        <div className = "step1imagebox">
                        </div>
                        <div className='steptextbox'>
                            Select booking located at the top right corner of the page next to the login button.
                            You may also click on the booking icon located at the bottom right of the home screen.
                        </div>
                    </div>

                    <div className = "step">
                        <div className = "step2imagebox">
                        </div>
                        <div className='steptextbox'>
                            From this window select which laboratory you would like to book and the date and time.

                        </div>
                    </div>

                    <div className = "step">
                        <div className = "step3imagebox">
                        </div>
                        <div className='steptextbox'>
                           {` Choose among the green available seats and click on the seat you would like to book. the
                            box should turn red once it's reserved.`}
                        </div>
                    </div>
            
                </div>

            </div>
            <Footer />
        </div>
    )
}