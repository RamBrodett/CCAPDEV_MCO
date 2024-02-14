import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

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
                                Veniam eum adipisci illum ratione ipsum, corrupti vero consequatur dolorum tempora sed ab est deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Distinctio repellendus optio repudiandae? Excepturi, non officia quidem ipsam fugit recusandae voluptates, nihil doloribus omnis voluptas vel blanditiis neque totam aliquid cupiditate!</p>
                            </div>
                        </div>
                        <div className="bottomContent">
                            <div id="contact">
                                <h3>CONTACT INFORMATION</h3>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                            <div id="image2"></div>
                            <div id="shortcuts">
                                <div id="topShortcut">
                                    <Link to='/book'>
                                        <div>
                                            {/*svg logo of booking icon*/}
                                        </div>
                                    </Link>
                                    <h1>SEAT BOOKING</h1>
                                </div>
                                <div id="botShortcut">
                                    <div id="leftbotShortcut" onClick={Location}>
                                        <Link to='/locations'>
                                            <div>
                                                {/*svg logo of map icon*/}

                                            </div>
                                        </Link>
                                        <h1>LOCATIONS</h1>
                                    </div>
                                    <div id="rightbotShortcut">
                                        <Link to='/guide'><div>
                                             {/*svg logo of guide icon*/}
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

