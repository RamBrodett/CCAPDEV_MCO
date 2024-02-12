
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
                            <div id="gokslabs">
                                <h4>Gokongwei Computer Laboratory</h4>
                                <div id="goksdetails">
                                    <span></span>

                                </div>
                            </div>
                            <div id="stlslabs">
                                <h4>St. La Salle Hall Computer Laboratory</h4>
                                <div id="stlsdetails">
                                    <span></span>

                                </div>
                            </div>
                            <div id="brandrewlabs">
                                <h4>Br. Andrew Gonzales Hall Computer Laboratory</h4>
                                <div id="brandrewdetails">
                                    <span></span>

                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}