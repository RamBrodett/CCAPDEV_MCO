/*
Author: Ram David Brodett
*/

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import { Link } from 'react-router-dom'
import Booking_icon from '../Assets/Booking_Icon.png'
import Location_icon from '../Assets/Map_Icon.png'
import Guide_icon from '../Assets/Guide_Icon.png'
import '../Styles/Home.css'

export function Home(){
    return(
        <>
                <div className="Home_Container">
                    {console.log("start")};
                    <Header/> 
                        <div className="Home_Body">
                            <div className="topContent">
                                <span></span> {/* complab image 1 */}
                                <div className='topText'>
                                    <h1>Features</h1>
                                    <p>Our computer lab offers a diverse range of features tailored to meet various needs.
                                     Equipped with powerful software for programming, statistics, 3D modeling, and more, users can unleash their creativity and productivity. 
                                     With seamless internet access, users can explore the web for research and collaboration. Additionally, office productivity suites,
                                     and multimedia playback capabilities are available to handle projects of any scale. 
                                     Security measures are robust, ensuring data protection, while collaboration tools promote communication and file sharing.</p>
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
                                        <Link to='/labSelect'>
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

