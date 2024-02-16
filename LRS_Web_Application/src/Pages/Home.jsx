/*
Author: Ram David Brodett
*/

import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
import Booking_icon from '../assets/Booking_Icon.png'
import Location_icon from '../assets/Map_Icon.png'
import Guide_icon from '../assets/Guide_Icon.png'

export function Home(){
    return(
        <>
            <div className="Home_Container">
                <Header/> 
                    <div className="Home_Body">
                        <div className="topContent">
                            <span></span> {/* complab image 1 */}
                            <div className='topText'>
                                <h1>Features</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit blanditiis enim modi eligendi explicabo unde.
                                Veniam eum adipisci illum ratione ipsum, corrupti vero consequatur dolorum tempora sed ab est deserunt. Lorem ipsum 
                                dolor sit amet consectetur adipisicing elit. Distinctio repellendus optio repudiandae? Excepturi, non officia quidem 
                                ipsam fugit recusandae voluptates, nihil doloribus omnis voluptas vel blanditiis neque totam aliquid cupiditate!</p>
                            </div>
                        </div>
                        <div className="bottomContent">
                            <div id="contact">
                                <h3>CONTACT INFORMATION</h3>
                                <p id='IT-INFO'>ITS Help Desk @ the Manila Campus</p>
                                <p className='text'>Room 305, Gokongwei Hall
                                <br/>De La Salle University
                                <br/>2401 Taft Avenue
                                <br/>1004 Manila, Philippines
                                </p>
                                <p id='emailIT'>Email:
                                <br /> <a href='mailto:itservices@dlsu.edu.ph'>itservices@dlsu.edu.ph</a></p>
                                <p id='contactIT'>Contact Numbers:
                                <br/><span className='text'>SMS/Viber:   </span>
                                (+ 632) 917 - 587 - 3364
                                <br />(+ 632) 8524 - 4611 to 26 local 316 and 466
                                <br />(+ 632) 8526 - 4242 (Direct Line)
                                

                    

                                </p>
                            </div>
                            <div id="image2"></div>
                            <div id="shortcuts">
                                <div id="topShortcut">
                                    <Link to='/book'>
                                         <div>
                                            <img id='bookIcon' src={Booking_icon}/>
                                        </div>
                                    </Link>
                                    <h1>SEAT BOOKING</h1>
                                </div>
                                <div id="botShortcut">
                                    <div id="leftbotShortcut" onClick={Location}>
                                        <Link to='/locations'>
                                            <div>
                                                <img id='mapIcon' src={Location_icon}/>
                                            </div>
                                        </Link>
                                        <h1>LOCATIONS</h1>
                                    </div>
                                    <div id="rightbotShortcut">
                                        <Link to='/guide'><div>
                                                <img id='guideIcon' src={Guide_icon}/>
                                            </div></Link>
                                        <h1>GUIDE</h1>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )

}

