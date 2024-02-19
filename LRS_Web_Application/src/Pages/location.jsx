/*
Author: Ram David Brodett
*/

import { Header } from "../Components/Header"
import { Footer } from "../Components/Footer"
//import { Link } from 'react-router-dom'
import '../Styles/location.css'

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
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="RoomNo">Room No.</th>
                                                <th className="FloorLoc">Floor Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="RoomNo">306A</td>
                                                <td className="FloorLoc" rowSpan={2}>Third Floor Gokongwei Hall</td>
                                            </tr>
                                            <tr>
                                                <td className="RoomNo" >306B</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div id="stlslabs">
                                <h4>St. La Salle Hall Computer Laboratory</h4>
                                <div id="stlsdetails">
                                    <span></span>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="RoomNo">Room No.</th>
                                                <th className="FloorLoc">Floor Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="RoomNo">212</td>
                                                <td className="FloorLoc" rowSpan={2}>Second Floor St. La Salle Hall</td>
                                            </tr>
                                            <tr>
                                                <td className="RoomNo">229</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div id="velascolabs">
                                <h4>Velasco Hall Computer Laboratory</h4>
                                <div id="velascodetails">
                                    <span></span>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="RoomNo">Room No.</th>
                                                <th className="FloorLoc">Floor Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="RoomNo">205</td>
                                                <td className="FloorLoc" rowSpan={2}>Second Floor Velasco Hall</td>
                                            </tr>
                                            <tr>
                                                <td className="RoomNo">206</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}