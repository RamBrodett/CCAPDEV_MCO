/*
Author: John Paul Carney
*/

import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'
import { useState, useEffect } from 'react'
import  generateTable from '../components/generateTable';
import { useParams } from 'react-router-dom';
export function Book(){
    const { selectRow, selectCol } = useParams();
    const [selectedDay, setSelectedDay] = useState('Sun');
    const [selectedTime, setSelectedTime] = useState('11:00');

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
        // COLOR CHANGE ONCLICK + CREATE/REMOVE DIV
        if (event.target.style.backgroundColor === 'rgb(220, 53, 69)') {
            event.target.style.backgroundColor = '';
            event.target.style.color = '';
            const infoDiv = document.getElementById(`infoDiv-${event.target.value}`);
            if (infoDiv) {
                infoDiv.remove();
            }
        } else {
            event.target.style.backgroundColor = 'rgb(220, 53, 69)';
            event.target.style.color = 'white';
            const infoDiv = document.createElement('div');
            infoDiv.id = `infoDiv-${event.target.value}`;
            infoDiv.classList.add('infoDiv');
            infoDiv.textContent = event.target.value;
    
            // temp, change to proper image icon 
            const closeIcon = document.createElement('span');
            closeIcon.textContent = '  x';
            closeIcon.classList.add('closeIcon');
            closeIcon.addEventListener('click', () => {
                infoDiv.remove();
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
        'Sun-11:00': (
            <div key="Sun-11:00">
                {generateTable('D1T1', handleCellClick, [], [], {selectRow}, {selectCol})}
            </div>
        ),
        'Mon-11:00': (
            <div key="Mon-11:00">
                {generateTable('D2T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Tue-11:00': (
            <div key="Tue-11:00">
                {generateTable('D3T1', handleCellClick, [], [], 3, 8)}
            </div>
        ),
        'Wed-11:00': (
            <div key="Wed-11:00">
                {generateTable('D4T1', handleCellClick, [], [], 3, 8)}
            </div>
        ),
        'Thu-11:00': (
            <div key="Thu-11:00">
                {generateTable('D5T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Fri-11:00': (
            <div key="Fri-11:00">
                {generateTable('D6T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
        'Sat-11:00': (
            <div key="Sat-11:00">
                {generateTable('D7T1', handleCellClick, bookedSeats, [], 3, 8)}
            </div>
        ),
    };
    
    return(
        <div className="bookBody">
            <Header />
            <p>{selectRow}, {selectCol}</p>
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
                                        {['11:00', '14:30', '18:00', '21:30'].map((time) => (
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
                                <div className="checkout">Checkout</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    )
}