/*
Author: Chantal Sia
*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import GuideImage1 from '../Assets/guideimage1.png'
import GuideImage2 from '../Assets/guideimage2.png'
import GuideImage3 from '../Assets/guideimage3.png'
import '../Styles/guide.css'


export function Guide(){
    return(
        <div className="GuideContainter">
            <Header/>
            <div className="Guide_Body">
                <div className = "topPortion" >
                    <h1>Guide</h1>
                    <p>
                    Welcome to the Laboratory Reservation System! Here is a step-by-step guide on how you
                    can easily book your own laboratory seat.
                    </p>
                </div>

                <div className = "stepcontainer"> 
                    <div className = "step">
                        <div className = "stepimagebox">
                            <img src={GuideImage1} style={{marginBottom: "34px"}}></img>
                        </div>
                        <div className='steptextbox'>
                            Select booking located at the top right corner of the page next to the login button.
                            You may also click on the booking icon located at the bottom right of the home screen.
                        </div>
                    </div>

                    <div className = "step">
                        <div className = "stepimagebox">
                            <img src={GuideImage2}></img>
                        </div>
                        <div className='steptextbox'>
                            From this window select your desired laboratory, day, time slot, and seats. You may also reserve anonymously by checking the box to the left of Checkout.
                        </div>
                    </div>

                    <div className = "step">
                        <div className = "stepimagebox">
                            <img src={GuideImage3}></img>
                        </div>
                        <div className='steptextbox'>
                            Once everything is chosen, click on Checkout to confirm your reservation. You can manage your reservations in the side panel by clicking on your profile in the top right.
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}