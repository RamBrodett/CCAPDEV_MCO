/*
Author: John Paul Carney
*/

import '../components/style.css'
import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'
import { useState, useEffect } from 'react'
import  generateTable from '../components/generateTable';

export function Book(){
    const [selectedDay, setSelectedDay] = useState('Sun');
    const [selectedTime, setSelectedTime] = useState('11:00');
    const [btnColor] = useState('rgb(28, 185, 120)');
    const handleDayChange = (day) => {
        setSelectedDay(day);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleCellClick = (event) => {
        if (event.target.style.backgroundColor === 'rgb(220, 53, 69)') {
            event.target.style.backgroundColor = ''; // Revert to default or set another color
            event.target.style.color = ''; // Revert to default or set another color
        } else {
            event.target.style.backgroundColor = 'rgb(220, 53, 69)';
            event.target.style.color = 'white';
        }
    };

    // Sample tables for specific day-time combinations
    const sampleTables = {
        'Sun-11:00': (
            <table>
                {generateTable('D1T1', handleCellClick)}
            </table>
        ),
        'Mon-11:00': (
            <table>
                {generateTable('D2T1', handleCellClick)}
            </table>
        ),
        'Tue-11:00': (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="booked" value="A01" title="A01"></button>
                        </td>
                        <td>
                            <button className="booked" value="A02" title="A02"></button>
                        </td>
                        <td>
                            <button className="btn" value="A03" title="A03" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A04" title="A04" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A05" title="A05" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A06" title="A06" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A07" title="A07" onClick={handleCellClick}></button>
                        </td>

                        <td>
                            <button className="btn" value="A08" title="A08" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A09" title="A09" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A10" title="A10" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A11" title="A11" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A12" title="A12" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A13" title="A13" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A14" title="A14" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A15" title="A15" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A16" title="A16" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A17" title="A17" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A18" title="A18" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A19" title="A19" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A20" title="A20" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A21" title="A21" onClick={handleCellClick}></button>
                        </td>
                    </tr>
                <tr>
                    <td>
                        <button className="btn" value="B01" title="B01" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B02" title="B02" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B03" title="B03" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B04" title="B04" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B05" title="B05" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B06" title="B06" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B07" title="B07" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B08" title="B08" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B09" title="B09" onClick={handleCellClick}></button>
                    </td>
                        <button className="btn" value="B10" title="B10" onClick={handleCellClick}></button>
                    <td>
                        <button className="btn" value="B11" title="B11" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B12" title="B12" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B13" title="B13" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B14" title="B14" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B15" title="B15" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B16" title="B16" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B17" title="B17" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B18" title="B18" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B19" title="B19" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B20" title="B20" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B21" title="B21" onClick={handleCellClick}></button>
                    </td>
                </tr>
                </tbody>
            </table>
        ),
        'Wed-11:00': (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="booked" value="A01" title="A01"></button>
                        </td>
                        <td>
                            <button className="booked" value="A02" title="A02"></button>
                        </td>
                        <td>
                            <button className="booked" value="A03" title="A03"></button>
                        </td>
                        <td>
                            <button className="btn" value="A04" title="A04" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A05" title="A05" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A06" title="A06" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A07" title="A07" onClick={handleCellClick}></button>
                        </td>

                        <td>
                            <button className="btn" value="A08" title="A08" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A09" title="A09" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A10" title="A10" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A11" title="A11" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A12" title="A12" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A13" title="A13" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A14" title="A14" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A15" title="A15" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A16" title="A16" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A17" title="A17" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A18" title="A18" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A19" title="A19" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A20" title="A20" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A21" title="A21" onClick={handleCellClick}></button>
                        </td>
                    </tr>
                <tr>
                    <td>
                        <button className="btn" value="B01" title="B01" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B02" title="B02" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B03" title="B03" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B04" title="B04" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B05" title="B05" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B06" title="B06" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B07" title="B07" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B08" title="B08" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B09" title="B09" onClick={handleCellClick}></button>
                    </td>
                        <button className="btn" value="B10" title="B10" onClick={handleCellClick}></button>
                    <td>
                        <button className="btn" value="B11" title="B11" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B12" title="B12" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B13" title="B13" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B14" title="B14" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B15" title="B15" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B16" title="B16" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B17" title="B17" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B18" title="B18" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B19" title="B19" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B20" title="B20" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B21" title="B21" onClick={handleCellClick}></button>
                    </td>
                </tr>
                </tbody>
            </table>
        ),
        'Thu-11:00': (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="booked" value="A01" title="A01" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A02" title="A02" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A03" title="A03" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A04" title="A04" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A05" title="A05" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A06" title="A06" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A07" title="A07" onClick={handleCellClick}></button>
                        </td>

                        <td>
                            <button className="btn" value="A08" title="A08" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A09" title="A09" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A10" title="A10" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A11" title="A11" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A12" title="A12" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A13" title="A13" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A14" title="A14" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A15" title="A15" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A16" title="A16" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A17" title="A17" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A18" title="A18" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A19" title="A19" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A20" title="A20" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A21" title="A21" onClick={handleCellClick}></button>
                        </td>
                    </tr>
                <tr>
                    <td>
                        <button className="btn" value="B01" title="B01" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B02" title="B02" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B03" title="B03" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B04" title="B04" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B05" title="B05" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B06" title="B06" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B07" title="B07" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B08" title="B08" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B09" title="B09" onClick={handleCellClick}></button>
                    </td>
                        <button className="btn" value="B10" title="B10" onClick={handleCellClick}></button>
                    <td>
                        <button className="btn" value="B11" title="B11" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B12" title="B12" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B13" title="B13" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B14" title="B14" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B15" title="B15" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B16" title="B16" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B17" title="B17" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B18" title="B18" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B19" title="B19" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B20" title="B20" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B21" title="B21" onClick={handleCellClick}></button>
                    </td>
                </tr>
                </tbody>
            </table>
        ),
        'Fri-11:00': (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="booked" value="A01" title="A01" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A02" title="A02" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A03" title="A03" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A04" title="A04" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A05" title="A05" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A06" title="A06" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A07" title="A07" onClick={handleCellClick}></button>
                        </td>

                        <td>
                            <button className="btn" value="A08" title="A08" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A09" title="A09" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A10" title="A10" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A11" title="A11" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A12" title="A12" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A13" title="A13" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A14" title="A14" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A15" title="A15" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A16" title="A16" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A17" title="A17" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A18" title="A18" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A19" title="A19" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A20" title="A20" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A21" title="A21" onClick={handleCellClick}></button>
                        </td>
                    </tr>
                <tr>
                    <td>
                        <button className="btn" value="B01" title="B01" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B02" title="B02" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B03" title="B03" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B04" title="B04" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B05" title="B05" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B06" title="B06" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B07" title="B07" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B08" title="B08" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B09" title="B09" onClick={handleCellClick}></button>
                    </td>
                        <button className="btn" value="B10" title="B10" onClick={handleCellClick}></button>
                    <td>
                        <button className="btn" value="B11" title="B11" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B12" title="B12" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B13" title="B13" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B14" title="B14" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B15" title="B15" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B16" title="B16" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B17" title="B17" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B18" title="B18" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B19" title="B19" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B20" title="B20" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B21" title="B21" onClick={handleCellClick}></button>
                    </td>
                </tr>
                </tbody>
            </table>
        ),
        'Sat-11:00': (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button className="booked" value="A01" title="A01" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A02" title="A02" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A03" title="A03" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A04" title="A04" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A05" title="A05" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="booked" value="A06" title="A06" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A07" title="A07" onClick={handleCellClick}></button>
                        </td>

                        <td>
                            <button className="btn" value="A08" title="A08" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A09" title="A09" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A10" title="A10" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A11" title="A11" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A12" title="A12" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A13" title="A13" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A14" title="A14" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A15" title="A15" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="blank" disabled></button>
                        </td>
                        <td>
                            <button className="btn" value="A16" title="A16" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A17" title="A17" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A18" title="A18" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A19" title="A19" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A20" title="A20" onClick={handleCellClick}></button>
                        </td>
                        <td>
                            <button className="btn" value="A21" title="A21" onClick={handleCellClick}></button>
                        </td>
                    </tr>
                <tr>
                    <td>
                        <button className="btn" value="B01" title="B01" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B02" title="B02" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B03" title="B03" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B04" title="B04" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B05" title="B05" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B06" title="B06" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B07" title="B07" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B08" title="B08" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B09" title="B09" onClick={handleCellClick}></button>
                    </td>
                        <button className="btn" value="B10" title="B10" onClick={handleCellClick}></button>
                    <td>
                        <button className="btn" value="B11" title="B11" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B12" title="B12" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B13" title="B13" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B14" title="B14" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B15" title="B15" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="blank" disabled></button>
                    </td>
                    <td>
                        <button className="btn" value="B16" title="B16" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B17" title="B17" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B18" title="B18" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B19" title="B19" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B20" title="B20" onClick={handleCellClick}></button>
                    </td>
                    <td>
                        <button className="btn" value="B21" title="B21" onClick={handleCellClick}></button>
                    </td>
                </tr>
                </tbody>
            </table>
        ),
    };
    return(
        <body>
        <div className="Booking">
            <Header />
            <div className="center">
                <div className="tickets">
                    <div className="ticket-selector">
                        <div className="head">
                            <div className="title">Laboratory X</div>
                        </div>
                        <div className="seats">
                            <div className="status">
                                <div className="item">Available</div>
                                <div className="item">Booked</div>
                                <div className="item">Selected</div>
                            </div>
                            <div className='all-seats'>
                                {/* Display selected sample table */}
                                {sampleTables[`${selectedDay}-${selectedTime}`]}
                            </div>
                        </div>
                            <div className="timings">
                                {/* Day selection */}
                                <div className="dates">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <label className={`dates-item ${selectedDay === day ? 'selected' : ''}`} key={day}>
                                            <input
                                                type="radio"
                                                value={day}
                                                checked={selectedDay === day}
                                                onChange={() => handleDayChange(day)}
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                                {/* Time selection */}
                                <div className="times">
                                    {['11:00', '14:30', '18:00', '21:30'].map((time) => (
                                        <label className={`time ${selectedTime === time ? 'selected' : ''}`} key={time}>
                                            <input
                                                type="radio"
                                                value={time}
                                                checked={selectedTime === time}
                                                onChange={() => handleTimeChange(time)}
                                            />
                                            {time}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}