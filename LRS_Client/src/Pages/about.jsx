/* eslint-disable react/no-unescaped-entities */

import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import author1 from '../Assets/IMG_0017.jpg';
import author2 from '../Assets/413929432_2830876957051449_8617965466781913840_n.jpg'
import author3 from '../Assets/118130970_3400683823325994_4713176334080025281_n.jpg'
import '../Styles/about.css'
export function About(){

    return(
        <div className="AboutContainer">
            <Header/>
            <div className="About-Body">
                <div className="top_AboutBody">
                    <div className="left">
                        <div className="aboutUs">
                            <h1>About us</h1>
                            <p>Welcome to TechQuiver Lab Reservation, a project born out of the collaboration and innovation of a group of passionate students.
                            At TechQuiver Lab Reservation, we've created a user-friendly computer lab reservation system designed to simplify the process of
                            managing shared resources in educational institutions and beyond.<br /><br />As students ourselves, we understand the importance of 
                            efficient resource management in academic environments. That's why we've developed a solution that empowers both students and 
                            administrators to seamlessly schedule and utilize computer lab facilities.</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="authors">
                            <h1>Authors</h1>
                            <div className="authorsDetails">
                                <div className='partners'>
                                    <div className="author1">
                                        <img src={author1} />
                                        <h2>Ram David M. Brodett</h2>
                                    </div>
                                    <div className="author2">
                                        <img src={author2}/>
                                        <h2>John Paul Carney</h2>
                                    </div>
                                    <div className="author3">
                                        <img src={author3}/>
                                        <h2>Chantal Sia</h2>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h2>List of npm packages used in this project:</h2>
                    <div className="list">
                        <ul className='lists'>
                            <li>react</li>
                            <li>react-dom</li>
                            <li>react-router-dom</li>
                            <li>@types/react</li>
                            <li>@types/react-dom</li>
                            <li>@vitejs/plugin-react</li>
                            <li>eslint</li>
                            <li>eslint-plugin-react</li>
                            <li>eslint-plugin-react-hooks</li>
                            <li>eslint-plugin-react-refresh</li>
                        </ul>
                        <ul className='lists'>
                            <li>vite</li>
                            <li>bcrypt</li>
                            <li>cookie-parser</li>
                            <li>cors</li>
                            <li>dotenv</li>
                            <li>express</li>
                            <li>jsonwebtoken</li>
                            <li>mongoose</li>
                            <li>@aws-sdk/client-s3</li>
                            <li>@aws-sdk/s3-request-presigner</li>
                        </ul>
                        <ul className="lists">
                            <li>multer</li>
                            <li>nodemon</li>
                            <li>npm-run-all</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )

}