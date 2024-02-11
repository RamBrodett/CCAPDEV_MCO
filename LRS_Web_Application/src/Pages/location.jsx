
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
//import { Link } from 'react-router-dom'

export function Location(){
    return(
        <>
            <div className="LocationContainer">
                <Header/>
                    <div id="locationContent">
                        <div id="campusmap">
                            <h1>Manila - Campus Map</h1>
                            <span id="campusmapimg"></span>
                        </div>
                        <div id="labsmap">
                            <h1>Lab Locations</h1>
                            <div id="gokslabs"></div>
                            <div id="stlslabs"></div>
                            <div id="brandrewlabs"></div>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}