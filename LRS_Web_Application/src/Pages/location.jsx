
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
                                                <td className="RoomNo"></td>
                                                <td className="FloorLoc"></td>
                                            </tr>
                                            <tr>
                                                <td className="RoomNo"></td>
                                                <td className="FloorLoc"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div id="brandrewlabs">
                                <h4>Br. Andrew Gonzales Hall Computer Laboratory</h4>
                                <div id="brandrewdetails">
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
                                                <td className="RoomNo"></td>
                                                <td className="FloorLoc"></td>
                                            </tr>
                                            <tr>
                                                <td className="RoomNo"></td>
                                                <td className="FloorLoc"></td>
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