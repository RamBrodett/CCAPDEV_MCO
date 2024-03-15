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

    const [matchingReservations, setMatchingReservations] = useState([]);

    const emptyLS212 = [
        'A01','A02','A03','A04','A05','A06','A07',
        'B05','B06','B07','C05','C06','C07','C08','C09','C10',
        'D05','D06','D07','D08','D09','D10'
    ];  
    const emptyGK306AB = [
        'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10',
        'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10'
    ];  

    const labMap = {
        'Velasco 205': {id: 'VL205', emptyCells: [], numRows: 3, numCols: 8 },
        'Velasco 206': {id: 'VL206', emptyCells: [], numRows: 3, numCols: 8 },
        'LS Hall 212': {id: 'LS212', emptyCells: emptyLS212, numRows: 4, numCols: 10 },
        'LS Hall 229': {id: 'LS229', emptyCells: [], numRows: 5, numCols: 9 },
        'Gokongwei 306A': {id: 'GK306A', emptyCells: emptyGK306AB, numRows: 4, numCols: 8 },
        'Gokongwei 306B': {id: 'GK306B', emptyCells: emptyGK306AB, numRows: 4, numCols: 8 },
    };

    const [formData, setFormData] = useState({
        studentID: 0,
        labDetails:{
            labID: labMap[selectedLab].id,
            seatID: '',
        },
        date: new Date('2024-03-22'),
        timeSlot:{
            day: '',
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
                            day: '',
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
                    day: `${selectedDay}`,
                    timeStart: `${convertTo24Hour(selectedTime)}`,
                    timeEnd: `${findEndTime(convertTo24Hour(selectedTime))}`,
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

    useEffect(() => {  
        const fetchReservations = async () =>{
            try{
                console.log(labMap[selectedLab].id);
              const reservations = await fetch(`http://localhost:3000/getReservations?labID=${labMap[selectedLab].id}&day=${selectedDay}&timeStart=${convertTo24Hour(selectedTime)}`)
              if(reservations.ok){
                const data = await reservations.json();
                setMatchingReservations(data);
                console.log(data);
              }
            }catch(error){
              console.error('Error fetching reservations:', error);
            }
          }
          fetchReservations();
    }, [selectedLab, selectedDay, selectedTime]);

    const sampleTables = {};

    // Loop over each day and time slot
    days.forEach(day => {
        timeSlots.forEach((timeSlot, index) => {
            const key = `${day}-${timeSlot}`;
            const reservationKey = `D${days.indexOf(day)}T${index + 1}`;
            const table = (
                <div key={key}>
                    {generateTable(
                        reservationKey,
                        handleCellClick,
                        matchingReservations.map(reservation => reservation.labDetails.seatID),
                        labMap[selectedLab].emptyCells,
                        labMap[selectedLab].numRows,
                        labMap[selectedLab].numCols
                    )}
                </div>
            );
            sampleTables[key] = table;
        });
    });

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
                        day: '',
                        timeStart: '',
                        timeEnd: '',
                    }
                });                
                window.location.href = "http://localhost:5173/#";
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