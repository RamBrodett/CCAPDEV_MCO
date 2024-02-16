/*
Author: John Paul Carney
*/

import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'
import { useState} from 'react'
import { Link } from 'react-router-dom';
import  generateTable from '../components/generateTable';
import Cross_icon from '../assets/cross_icon.png'
export function Book(){
    const [selectedDay, setSelectedDay] = useState('Sun');
    const [selectedTime, setSelectedTime] = useState('8:00');

    const handleDayChange = (day) => {
        setSelectedDay(day);    
        removeAllInfoDivs();
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        removeAllInfoDivs();
    };

    const removeAllInfoDivs = () => {
        const selectedSeatsContainer = document.getElementById("selectedSeatsContainer");
        if (selectedSeatsContainer) {
            const infoDivs = selectedSeatsContainer.getElementsByClassName('infoDiv');;
            while (infoDivs.length > 0) {
                infoDivs[0].remove();
            }
        }
    };

    const handleCellClick = (event) => {
        // Retrieve the cell element
        const cell = event.target;
        
        // COLOR CHANGE ONCLICK + CREATE/REMOVE DIV
        if (cell.style.backgroundColor === 'rgb(220, 53, 69)') {
            cell.style.backgroundColor = '';
            cell.style.color = '';
            const infoDiv = document.getElementById(`infoDiv-${cell.value}`);
            if (infoDiv) {
                infoDiv.remove();
            }
        } else {
            cell.style.backgroundColor = 'rgb(220, 53, 69)';
            cell.style.color = 'white';
            const infoDiv = document.createElement('div');
            infoDiv.id = `infoDiv-${cell.value}`;
            infoDiv.classList.add('infoDiv');
            infoDiv.textContent = cell.value;
    
            // temp, change to proper image icon 
            const closeIcon = document.createElement('span');
            const img = document.createElement('img');
            img.src = Cross_icon;
            img.alt = 'Close';
            closeIcon.appendChild(img);
            closeIcon.classList.add('closeIcon');
            closeIcon.addEventListener('click', () => {
                infoDiv.remove();
                // Restore the original background color when the infoDiv is removed
                cell.style.backgroundColor = '';
                cell.style.color = '';
            });
    
            infoDiv.appendChild(closeIcon);
    
            document.getElementById("selectedSeatsContainer").appendChild(infoDiv);
        }
    };

    // sample booked seats
    const bookedSeats = [
        'A03', 'A04', 'A05', 'A06', 'A08',
        'B08', 'B07', 'B06','C01', 'C02'
      ];


    // Sample tables for specific day-time combinations
    const sampleTables = {
        'Sun-8:00': (
            <div key="Sun-8:00">
                {generateTable('D1T1', handleCellClick, [], [], 3, 8)}
            </div>
        ),
        'Sun-8:30': (
            <div key="Sun-8:00">
                {generateTable('D1T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sun-9:00': (
            <div key="Sun-8:00">
                {generateTable('D1T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sun-9:30': (
            <div key="Sun-8:00">
                {generateTable('D1T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sun-10:00': (
            <div key="Sun-8:00">
                {generateTable('D1T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Mon-8:00': (
            <div key="Mon-8:00">
                {generateTable('D2T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Mon-8:30': (
            <div key="Mon-8:30">
                {generateTable('D2T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Mon-9:00': (
            <div key="Mon-9:00">
                {generateTable('D2T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Mon-9:30': (
            <div key="Mon-9:30">
                {generateTable('D2T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Mon-10:00': (
            <div key="Mon-10:00">
                {generateTable('D2T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Tue-8:00': (
            <div key="Tue-8:00">
                {generateTable('D3T1', handleCellClick, [], [], 3, 8)}
            </div>
        ),
        'Tue-8:30': (
            <div key="Tue-8:30">
                {generateTable('D3T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Tue-9:00': (
            <div key="Tue-9:00">
                {generateTable('D3T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Tue-9:30': (
            <div key="Tue-9:30">
                {generateTable('D3T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Tue-10:00': (
            <div key="Tue-10:00">
                {generateTable('D3T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Wed-8:00': (
            <div key="Wed-8:00">
                {generateTable('D4T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Wed-8:30': (
            <div key="Wed-8:30">
                {generateTable('D4T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Wed-9:00': (
            <div key="Wed-9:00">
                {generateTable('D4T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Wed-9:30': (
            <div key="Wed-9:30">
                {generateTable('D4T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Wed-10:00': (
            <div key="Wed-10:00">
                {generateTable('D4T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Thu-8:00': (
            <div key="Thu-8:00">
                {generateTable('D5T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Thu-8:30': (
            <div key="Thu-8:30">
                {generateTable('D5T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Thu-9:00': (
            <div key="Thu-9:00">
                {generateTable('D5T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Thu-9:30': (
            <div key="Thu-9:30">
                {generateTable('D5T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Thu-10:00': (
            <div key="Thu-10:00">
                {generateTable('D5T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-8:00': (
            <div key="Fri-8:00">
                {generateTable('D6T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-8:30': (
            <div key="Fri-8:30">
                {generateTable('D6T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-9:00': (
            <div key="Fri-9:00">
                {generateTable('D6T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-9:30': (
            <div key="Fri-9:30">
                {generateTable('D6T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-10:00': (
            <div key="Fri-10:00">
                {generateTable('D6T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-8:00': (
            <div key="Sat-8:00">
                {generateTable('D7T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-8:30': (
            <div key="Sat-8:30">
                {generateTable('D7T2', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-9:00': (
            <div key="Sat-9:00">
                {generateTable('D7T3', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-9:30': (
            <div key="Sat-9:30">
                {generateTable('D7T4', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-10:00': (
            <div key="Sat-10:00">
                {generateTable('D7T5', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
    };
    
    return(
        <div className="bookBody">
            <Header />
            <div className="Booking">
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
                                <div className="selectedSeats" id="selectedSeatsContainer"> </div>
                                <div className="timings">
                                    {/* Day selection */}
                                    <div className="dates">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                            <label className={`dates-item ${selectedDay === day ? 'selected' : ''}`} key={day}>
                                                <input className='radioInput'
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
                                        {['8:00', '8:30', '9:00', '9:30', '10:00'].map((time) => (
                                            <label className={`time ${selectedTime === time ? 'selected' : ''}`} key={time}>
                                                <input className='radioInput'
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
                                <Link to="/checkout" className="checkout">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    )
}