/*
Authors: 
John Paul Carney
Chantal Sia
*/
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import  generateTable from '../Components/generateTable';
import Cross_icon from '../Assets/cross_icon.png'
import '../Styles/booking.css'


export function Book(){
    const [selectedDay, setSelectedDay] = useState('Sun');
    const [selectedTime, setSelectedTime] = useState('9:15AM');
    const selectedLab = localStorage.getItem('selectedLab');
    const timeSlots = ['9:15AM', '11:00AM', '12:45PM', '2:30PM', '4:15PM']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const bookedVL205206 = [
        'A03', 'A04', 'A05', 'A06', 'A08',
        'B08', 'B07', 'B06','C01', 'C02'
      ];

    const bookedLS212 = [
        'A08', 'A09', 'A10'
    ];
    const emptyLS212 = [
        'A01','A02','A03','A04','A05','A06','A07',
        'B05','B06','B07','C05','C06','C07','C08','C09','C10',
        'D05','D06','D07','D08','D09','D10'
    ];  
    const bookedGK306AB = [
        'C01', 'C02'
    ];
    const emptyGK306AB = [
        'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10',
        'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10'
    ];  

    const labMap = {
        'Velasco 205-206': {id: 'VL205', emptyCells: [], numRows: 3, numCols: 8 },
        'LS Hall 212': {id: 'LS212', emptyCells: emptyLS212, numRows: 4, numCols: 10 },
        'LS Hall 229': {id: 'LS229', emptyCells: [], numRows: 5, numCols: 9 },
        'Gokongwei 306AB': {id: 'GK306B', emptyCells: emptyGK306AB, numRows: 4, numCols: 8 },
    };

    const [formData, setFormData] = useState({
        studentID: '',
        labDetails:{
            labID: labMap[selectedLab].id,
            seatID: '',
        },
        date: new Date('2024-03-22'),
        timeSlot:{
            timeStart: '',
            timeEnd: '',
        }
    });

    const handleDayChange = (day) => {
        setSelectedDay(day);    
        removeAllInfoDivs();
    };

    const convertTo24Hour = (time12h) => {
        const [time, period] = time12h.split(/(?=[AP]M)/);
    
        const [hours, minutes] = time.split(':');
    
        let hours24h = parseInt(hours, 10);
        if (period === 'PM' && hours24h !== 12) {
            hours24h += 12;
        } else if (period === 'AM' && hours24h === 12) {
            hours24h = 0;
        }
    
        const hoursStr = String(hours24h).padStart(2, '0');
        const minutesStr = minutes.padStart(2, '0');
    
        return `${hoursStr}:${minutesStr}`;
    }
    function findEndTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
    
        let newHours = hours + 1;
        let newMinutes = minutes + 30;
    
        if (newMinutes >= 60) {
            newHours += 1;
            newMinutes -= 60;
        }
    
        newHours %= 24;
    
        const formattedHours = String(newHours).padStart(2, '0');
        const formattedMinutes = String(newMinutes).padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}`;
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        removeAllInfoDivs();
    };

    const removeAllInfoDivs = () => {
        const selectedSeatsContainer = document.getElementById("selectedSeatsContainer");
        if (selectedSeatsContainer) {
            const infoDivs = selectedSeatsContainer.getElementsByClassName('infoDiv');
            while (infoDivs.length > 0) {
                infoDivs[0].remove();
            }
        }
    };

    // TEMPO FOR TESTING, DISPLAYS FORM DATA IN CONSOLE
    useEffect(() => {
        console.log(formData); // Log formData after it's updated
    }, [formData]);

    const handleCellClick = (event) => {
        const cell = event.target;
    
        // COLOR CHANGE ONCLICK + CREATE/REMOVE DIV
        if (cell.style.backgroundColor === 'rgb(220, 53, 69)') {
            cell.style.backgroundColor = '';
            cell.style.color = '';
            const infoDiv = document.getElementById(`infoDiv-${cell.value}`);
            if (infoDiv) {
                infoDiv.remove();

                setFormData((prevData) => ({
                    ...prevData,
                    labDetails: {
                        ...prevData.labDetails,
                        seatID: '',
                        timeSlot: {
                            timeStart: '',
                            timeEnd: '',
                        }
                    }
                }));
            }
        } else {
            cell.style.backgroundColor = 'rgb(220, 53, 69)';
            cell.style.color = 'white';
            const infoDiv = document.createElement('div');
            infoDiv.id = `infoDiv-${cell.value}`;
            infoDiv.classList.add('infoDiv');
            infoDiv.textContent = cell.value;
    
            // Add cell value to formData
            setFormData((prevData) => ({
                ...prevData,
                labDetails: {
                    ...prevData.labDetails,
                    seatID: cell.value,
                },
                timeSlot: {
                    ...prevData.timeSlot,
                    timeStart: `${selectedDay}-${convertTo24Hour(selectedTime)}`, // Update with your actual start time
                    timeEnd: `${selectedDay}-${findEndTime(convertTo24Hour(selectedTime))}`, // Update with your actual end time
                }
            }));

            // temp, change to proper image icon 
            const closeIcon = document.createElement('span');
            const img = document.createElement('img');
            img.src = Cross_icon;
            img.alt = 'Close';
            closeIcon.appendChild(img);
            closeIcon.classList.add('closeIcon');
            closeIcon.addEventListener('click', () => {
                infoDiv.remove();
                
                setFormData((prevData) => ({
                    ...prevData,
                    labDetails: {
                        ...prevData.labDetails,
                        seatID: '', // Remove the seat ID
                    }
                }));

                // Restore the original background color when the infoDiv is removed
                cell.style.backgroundColor = '';
                cell.style.color = '';
            });
    
            infoDiv.appendChild(closeIcon);
    
            document.getElementById("selectedSeatsContainer").appendChild(infoDiv);
        }
    };

    // Sample tables for specific day-time combinations
    const sampleTables = {
        'Sun-9:15AM': (
            <div key="Sun-9:15AM">
                {generateTable('D1T1', handleCellClick, [], [], 3, 8)}
            </div>
        ),
        'Sun-11:00AM': (
            <div key="Sun-11:00AM">
                {generateTable('D1T2', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sun-12:45PM': (
            <div key="Sun-12:45PM">
                {generateTable('D1T3', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sun-2:30PM': (
            <div key="Sun-2:30PM">
                {generateTable('D1T4', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sun-4:15PM': (
            <div key="Sun-4:15PM">
                {generateTable('D1T5', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Mon-8:00': (
            <div key="Mon-8:00">
                {generateTable('D2T1', handleCellClick, [], emptyLS212, 4, 10)}
            </div>
        ),
        'Mon-8:30': (
            <div key="Mon-8:30">
                {generateTable('D2T2', handleCellClick, bookedLS212, emptyLS212, 4, 10)}
            </div>
        ),
        'Mon-9:00': (
            <div key="Mon-9:00">
                {generateTable('D2T3', handleCellClick, bookedLS212, emptyLS212, 4, 10)}
            </div>
        ),
        'Mon-9:30': (
            <div key="Mon-9:30">
                {generateTable('D2T4', handleCellClick, bookedLS212, emptyLS212, 4, 10)}
            </div>
        ),
        'Mon-10:00': (
            <div key="Mon-10:00">
                {generateTable('D2T5', handleCellClick, bookedLS212, emptyLS212, 4, 10)}
            </div>
        ),
        'Tue-8:00': (
            <div key="Tue-8:00">
                {generateTable('D3T1', handleCellClick, [], [], 5, 9)}
            </div>
        ),
        'Tue-8:30': (
            <div key="Tue-8:30">
                {generateTable('D3T2', handleCellClick, bookedVL205206, [], 5, 9)}
            </div>
        ),
        'Tue-9:00': (
            <div key="Tue-9:00">
                {generateTable('D3T3', handleCellClick, bookedVL205206, [], 5, 9)}
            </div>
        ),
        'Tue-9:30': (
            <div key="Tue-9:30">
                {generateTable('D3T4', handleCellClick, bookedVL205206, [], 5, 9)}
            </div>
        ),
        'Tue-10:00': (
            <div key="Tue-10:00">
                {generateTable('D3T5', handleCellClick, bookedVL205206, [], 5, 9)}
            </div>
        ),
        'Wed-8:00': (
            <div key="Wed-8:00">
                {generateTable('D4T1', handleCellClick, bookedVL205206, [], 2, 8)}
            </div>
        ),
        'Wed-8:30': (
            <div key="Wed-8:30">
                {generateTable('D4T2', handleCellClick, bookedVL205206, [], 2, 8)}
            </div>
        ),
        'Wed-9:00': (
            <div key="Wed-9:00">
                {generateTable('D4T3', handleCellClick, bookedVL205206, [], 2, 8)}
            </div>
        ),
        'Wed-9:30': (
            <div key="Wed-9:30">
                {generateTable('D4T4', handleCellClick, bookedVL205206, [], 2, 8)}
            </div>
        ),
        'Wed-10:00': (
            <div key="Wed-10:00">
                {generateTable('D4T5', handleCellClick, bookedVL205206, [], 2, 8)}
            </div>
        ),
        'Thu-8:00': (
            <div key="Thu-8:00">
                {generateTable('D5T1', handleCellClick, [], emptyGK306AB, 4, 8)}
            </div>
        ),
        'Thu-8:30': (
            <div key="Thu-8:30">
                {generateTable('D5T2', handleCellClick, bookedGK306AB, emptyGK306AB, 4, 8)}
            </div>
        ),
        'Thu-9:00': (
            <div key="Thu-9:00">
                {generateTable('D5T3', handleCellClick, bookedGK306AB, emptyGK306AB, 4, 8)}
            </div>
        ),
        'Thu-9:30': (
            <div key="Thu-9:30">
                {generateTable('D5T4', handleCellClick, bookedGK306AB, emptyGK306AB, 4, 8)}
            </div>
        ),
        'Thu-10:00': (
            <div key="Thu-10:00">
                {generateTable('D5T5', handleCellClick, bookedGK306AB, emptyGK306AB, 4, 8)}
            </div>
        ),
        'Fri-8:00': (
            <div key="Fri-8:00">
                {generateTable('D6T1', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Fri-8:30': (
            <div key="Fri-8:30">
                {generateTable('D6T2', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Fri-9:00': (
            <div key="Fri-9:00">
                {generateTable('D6T3', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Fri-9:30': (
            <div key="Fri-9:30">
                {generateTable('D6T4', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Fri-10:00': (
            <div key="Fri-10:00">
                {generateTable('D6T5', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sat-8:00': (
            <div key="Sat-8:00">
                {generateTable('D7T1', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sat-8:30': (
            <div key="Sat-8:30">
                {generateTable('D7T2', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sat-9:00': (
            <div key="Sat-9:00">
                {generateTable('D7T3', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sat-9:30': (
            <div key="Sat-9:30">
                {generateTable('D7T4', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
        'Sat-10:00': (
            <div key="Sat-10:00">
                {generateTable('D7T5', handleCellClick, bookedVL205206, [], 3, 8)}
            </div>
        ),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Store form data in local storage
            localStorage.setItem('formData', JSON.stringify(formData));
    
            // Make a POST request to create a reservation record
            const response = await fetch('http://localhost:3000/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {

                // Reset form data
                setFormData({
                    studentID: '',
                    labDetails:{
                        labID: labMap[selectedLab].id,
                        seatID: '',
                    },
                    date: new Date('2024-03-22'),
                    timeSlot:{
                        timeStart: '',
                        timeEnd: '',
                    }
                });
                // Redirect to the login page after showing success message
                const result = await response.json();
                setSuccessMessage(result.success);
                setTimeout(() => {
                    window.location.href = "http://localhost:5173/#/login";
                    setSuccessMessage('');
                }, 2500);
            } else {
                // Handle error
                console.error('Error creating reservation:', response.statusText);
                // Show error message if needed
            }
        } catch (error) {
            console.error('Error handling form submission:', error);
            // Show error message if needed
        }
    };

    return(

        <div className="bookBody">
            <Header />
            <div className="Booking">
                <div className="center">
                    <div className="tickets">
                        <div className="ticket-selector">
                            <div className="head">
                                <div className="title">{selectedLab}</div>
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
                                        {['9:15AM', '11:00AM', '12:45PM', '2:30PM', '4:15PM'].map((time) => (
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
                                <Link className="checkout" onClick={handleSubmit}>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    )
}