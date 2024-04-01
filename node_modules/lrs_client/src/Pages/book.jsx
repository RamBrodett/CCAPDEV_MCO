/*
Authors: 
John Paul Carney
Chantal Sia
*/
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import  generateTable from '../Components/generateTable';
import Cross_icon from '../Assets/cross_icon.png'
import '../Styles/booking.css'


export function Book(){
    const [selectedDay, setSelectedDay] = useState('Sun');
    const [selectedTime, setSelectedTime] = useState('9:00');
    const selectedLab = localStorage.getItem('selectedLab');
    const timeSlots = ['9:00', '9:45', '10:30', '11:15', '12:00']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [forms, setForms] = useState([]);
    const [matchingReservations, setMatchingReservations] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentID, setSelectedStudentID] = useState('');


    const { user } = useAuth();
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
        studentID: user.userID,
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
        let newMinutes = minutes + 30;
        let newHours = hours;
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
        const seatID = cell.value;
    
        // COLOR CHANGE ONCLICK + CREATE/REMOVE DIV
        if (cell.style.backgroundColor === 'rgb(220, 53, 69)') {
            const existingFormIndex = forms.findIndex(form => form.seatID === seatID);
            if (existingFormIndex !== -1) {
                const updatedForms = [...forms];
                updatedForms.splice(existingFormIndex, 1);
                setForms(updatedForms);
            }
            cell.style.backgroundColor = '';
            cell.style.color = '';
            const infoDiv = document.getElementById(`infoDiv-${cell.value}`);
            if (infoDiv) {
                infoDiv.remove();

                setForms(prevForms => prevForms.filter(form => form.seatID !== seatID));
            }
        } else {
            cell.style.backgroundColor = 'rgb(220, 53, 69)';
            cell.style.color = 'white';
            const infoDiv = document.createElement('div');
            infoDiv.id = `infoDiv-${cell.value}`;
            infoDiv.classList.add('infoDiv');
            infoDiv.textContent = cell.value;
    
            // Add cell value to formData
            const newForm = {
                studentID: user.userID,
                labDetails:{
                    labID: labMap[selectedLab].id,
                    seatID: seatID
                },
                date: new Date('2024-03-22'),
                timeSlot:{
                    day:  `${selectedDay}`,
                    timeStart: `${convertTo24Hour(selectedTime)}`,
                    timeEnd: `${findEndTime(convertTo24Hour(selectedTime))}`
                }
            };
            setForms(prevForms => [...prevForms, newForm]);
            const closeIcon = document.createElement('span');
            const img = document.createElement('img');
            img.src = Cross_icon;
            img.alt = 'Close';
            closeIcon.appendChild(img);
            closeIcon.classList.add('closeIcon');
            closeIcon.addEventListener('click', () => {
                infoDiv.remove();
                setForms(prevForms => prevForms.filter(form => form.seatID !== seatID));

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

    useEffect(() => {  
        const fetchListStudents = async () =>{
            try{
              const students = await fetch(`http://localhost:3000/getUserProfiles?role=Student`)
              if(students.ok){
                const data = await students.json();
                setStudents(data);
                console.log(data);
              }
            }catch(error){
              console.error('Error fetching list of students:', error);
            }
          }
          fetchListStudents();
    }, [selectedLab]);

    const handleStudentSelect = (event) => {
        const selectedID = event.target.value;
        console.log('Selected Student ID:', selectedID);
        setSelectedStudentID(selectedID);
    };

    const handleSubmit = async (e) => {
        console.log(user.userID);
        const reserveAnonCheckbox = document.getElementById('reserve-anon');
        e.preventDefault();
        if (user.role == 'Student'){
            if (reserveAnonCheckbox && reserveAnonCheckbox.checked) {
                const updatedForms = forms.map(form => ({
                    ...form,
                    studentID: 0
                }));
                setForms(updatedForms);
                try {
                    const promises = updatedForms.map(async (form, index) => {
                        const delay = index * 1000; // Adjust the delay time as needed
                        await new Promise(resolve => setTimeout(resolve, delay));
                        const response = await fetch('http://localhost:3000/reserve', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(form),
                        });
                        if (!response.ok) {
                            console.error('Error creating reservation:', response.statusText);
                        }
                        return response;
                    });
                    const responses = await Promise.all(promises);
    
                    const allRequestsSuccessful = responses.every(response => response.ok);
    
                    if (allRequestsSuccessful) {
                        setForms([]);
    
                        setFormData({
                            studentID: '',
                            labDetails: {
                                labID: labMap[selectedLab].id,
                                seatID: '',
                            },
                            date: new Date('2024-03-22'),
                            timeSlot: {
                                day: '',
                                timeStart: '',
                                timeEnd: '',
                            }
                        });
    
                        window.location.href = "http://localhost:5173/#";
                    } else {
                        console.error('Some reservation requests failed');
                    }
                } catch (error) {
                    console.error('Error handling form submission:', error);
                }
            } else {
                const updatedForms = forms.map(form => ({
                    ...form,
                    studentID: user.userID
                }));
                setForms(updatedForms);
                try {
                    const promises = updatedForms.map(async (form, index) => {
                        const delay = index * 1000; // Adjust the delay time as needed
                        await new Promise(resolve => setTimeout(resolve, delay));
                        const response = await fetch('http://localhost:3000/reserve', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(form),
                        });
                        if (!response.ok) {
                            console.error('Error creating reservation:', response.statusText);
                        }
                        return response;
                    });
                    const responses = await Promise.all(promises);
    
                    const allRequestsSuccessful = responses.every(response => response.ok);
    
                    if (allRequestsSuccessful) {
                        setForms([]);
    
                        setFormData({
                            studentID: '',
                            labDetails: {
                                labID: labMap[selectedLab].id,
                                seatID: '',
                            },
                            date: new Date('2024-03-22'),
                            timeSlot: {
                                day: '',
                                timeStart: '',
                                timeEnd: '',
                            }
                        });
    
                        window.location.href = "http://localhost:5173/#";
                    } else {
                        console.error('Some reservation requests failed');
                    }
                } catch (error) {
                    console.error('Error handling form submission:', error);
                }
            }
        } else {
            const updatedForms = forms.map(form => ({
                ...form,
                studentID: selectedStudentID
            }));
                setForms(updatedForms);
                try {
                    const promises = updatedForms.map(async (form, index) => {
                        const delay = index * 1000; // Adjust the delay time as needed
                        await new Promise(resolve => setTimeout(resolve, delay));
                        const response = await fetch('http://localhost:3000/reserve', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(form),
                        });
                        if (!response.ok) {
                            console.error('Error creating reservation:', response.statusText);
                        }
                        return response;
                    });
                    const responses = await Promise.all(promises);
    
                    const allRequestsSuccessful = responses.every(response => response.ok);
    
                    if (allRequestsSuccessful) {
                        setForms([]);
    
                        setFormData({
                            studentID: '',
                            labDetails: {
                                labID: labMap[selectedLab].id,
                                seatID: '',
                            },
                            date: new Date('2024-03-22'),
                            timeSlot: {
                                day: '',
                                timeStart: '',
                                timeEnd: '',
                            }
                        });
    
                        window.location.href = "http://localhost:5173/#";
                    } else {
                        console.error('Some reservation requests failed');
                    }
                } catch (error) {
                    console.error('Error handling form submission:', error);
                }
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
                                        {['9:00', '9:45', '10:30', '11:15', '12:00'].map((time) => (
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
                                <div className="checkoutContainer">
                                    {user.role == 'Admin' && (
                                        <div className="reserveforother" id="reserveforother">
                                            <label>Reserve for: </label>
                                            <select name="students" onChange={handleStudentSelect}>
                                                <option value={user.userID}>Myself</option>
                                                {students.map(student => (
                                                    <option key={student.userID} value={student.userID}>
                                                        {student.firstname} {student.lastname}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {user.role == 'Student' && (
                                        <div className="reserveforother" id="reserveanon">
                                            <label>Reserve Anonymously  </label>
                                            <input type="checkbox" id="reserve-anon"></input>
                                        </div>
                                    )}
                                    <Link className="checkout" onClick={handleSubmit}>Checkout</Link>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    )
}