import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
//import { Link } from 'react-router-dom'

export function Location(){

    return(
        <>
        <Header/>
            <div id="locationContent">
                <div id="campusmap">
                    <span id="campusmap"></span>
                </div>
                <div id="labsmap">
                    <div id="gokslabs"></div>
                    <div id="stlslabs"></div>
                    <div id="brandrewlabs"></div>
                </div>
            </div>
        <Footer/>
        </>
    )
}