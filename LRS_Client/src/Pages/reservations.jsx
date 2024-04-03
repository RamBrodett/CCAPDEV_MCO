import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import '../Styles/profile.css'

export function Reservations() {
  const { userCred } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [matchingUserReservations, setMatchingUserReservations] = useState([]);
  const [matchingReservations, setMatchingReservations] = useState([]);
  const [editingReservationID, setEditingReservationID] = useState(null);
  const [editingLabID, setEditingLabID] = useState('');
  const [editingSeatID, setEditingSeatID] = useState('');
  const [editingDay, setEditingDay] = useState('');
  const [editingTimeStart, setEditingTimeStart] = useState('');
  const [editingTimeEnd, setEditingTimeEnd] = useState('');
  const [editingTime, setEditingTime] = useState('');

  const [selectedDay, setSelectedDay] = useState('Sun');
  const [selectedTime, setSelectedTime] = useState('9:00');
  const [selectedLab, setSelectedLab] = useState([]);
  const timeSlots = ['9:00', '9:45', '10:30', '11:15', '12:00'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [usernames, setUsernames] = useState([]);


  const [formData, setFormData] = useState({
        reservationID: '',
        studentID: '',
        labDetails:{
            labID: '',
            seatID: '',
        },
        date: new Date('2024-03-22'),
        timeSlot:{
            day: '',
            timeStart: '',
            timeEnd: '',
        }
    });

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

  useEffect(() => {
    const fetchUser = async () => {
      const [firstname, lastnameNID] = userCred.split('-');
      const [lastname, userID] = lastnameNID.split('+');
      try {
        const response = await fetch(`http://localhost:3000/getProfile?firstname=${firstname}&lastname=${lastname}&userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const user = await response.json();
        setUserData(user);
        fetchUserReservations(user);
        fetchProfilePic(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    const fetchProfilePic = async (userData) => {
      const imageKey = userData.profile_info.profile_picture_url.split('.com/')[1];
      try {
        const response = await fetch(`http://localhost:3000/profileIMG/readImage?imgKey=${imageKey}`);
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl);
        } else {
          console.error('Error fetching image URL:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserReservations = async (userData) =>{
        if (userData.role === 'Student') {
            const userId = userData.userID;
            try{
                const reservations = await fetch(`http://localhost:3000/getUserReservations?userId=${userId}`)
                if(reservations.ok){
                const data = await reservations.json();
                setMatchingUserReservations(data);
                }
            }catch(error){
                console.error('Error fetching reservations:', error);
            } 
        } else if (userData.role === 'Admin') {
            const fetchAllReservations = async () =>{
                try{
                const reservations = await fetch(`http://localhost:3000/getReservations/all`)
                if(reservations.ok){
                    const data = await reservations.json();
                    setMatchingUserReservations(data);
                }
                }catch(error){
                console.error('Error fetching reservations:', error);
                }
            }
            fetchAllReservations();
        }
    }
    fetchUser();
  }, [userCred]);

  
  const fetchUserByID = async (userID) => {
    try {
      const response = await fetch(`http://localhost:3000/search/findOne?userID=${userID}`);
      if (response.ok) {
        const data = await response.json();
        return { 
          firstname: data.firstname, 
          lastname: data.lastname
        };
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const handleEditClick = (reservation) => {
    setEditingReservationID(reservation.reservationID);
    setEditingLabID(reservation.labDetails.labID);
    setEditingSeatID(reservation.labDetails.seatID);
    setEditingDay(reservation.timeSlot.day);
    setEditingTimeStart(reservation.timeSlot.timeStart);
    setEditingTimeEnd(reservation.timeSlot.timeEnd);
    setEditingTime(reservation.timeSlot.timeStart + " - " + reservation.timeSlot.timeEnd);

    const fullRoomName = Object.keys(labMap).find(roomName => labMap[roomName].id === reservation.labDetails.labID);

    setSelectedLab(fullRoomName);
  };

  const handleCancel = () => {
    setEditingReservationID(null);
  };

  function generateSeatArray(rows, cols) {
    const seatArray = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    for (let i = 0; i < rows; i++) {
      for (let j = 1; j <= cols; j++) {
        const rowLetter = alphabet[i];
        const seatID = rowLetter + (j < 10 ? '0' + j : j);
        seatArray.push(seatID);
      }
    }
    return seatArray;
  }
  
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

  useEffect(() => {  
        const fetchReservations = async () =>{
            try{
            const reservations = await fetch(`http://localhost:3000/getReservations?labID=${editingLabID}&day=${selectedDay}&timeStart=${convertTo24Hour(selectedTime)}`)
            if(reservations.ok){
                const data = await reservations.json();
                setMatchingReservations(data);
            }
            }catch(error){
            console.error('Error fetching reservations:', error);
            }
        }
        fetchReservations();
  }, [editingLabID, selectedDay, selectedTime]);

  const handleConfirm = async (reservations, editingLabID, editingSeatID, editingDay, editingTimeStart, editingTimeEnd) => {
    setFormData({
        reservationID: reservations.reservationID,
        studentID: reservations.studentID,
        labDetails: {
            labID: editingLabID,
            seatID: editingSeatID,
        },
        date: new Date('2024-03-22'),
        timeSlot: {
            day: editingDay,
            timeStart: editingTimeStart,
            timeEnd: editingTimeEnd,
        }
    });

    try {
        const response = await fetch('http://localhost:3000/reserve/updateReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            console.error('Error updating reservation: ', response.statusText);
        }
        else {
            setFormData({
                reservationID: '',
                studentID: '',
                labDetails: {
                    labID: '',
                    seatID: '',
                },
                date: new Date('2024-03-22'),
                timeSlot: {
                    day: '',
                    timeStart: '',
                    timeEnd: '',
                }
            });

            window.location.href = "http://localhost:5173/reservations/";
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
  };

  const handleDelete = async (reservationID) => {

    try {
        const response = await fetch('http://localhost:3000/reserve/deleteReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationID: reservationID }),
        });
        if (!response.ok) {
            console.error('Error deleting reservation: ', response.statusText);
        }
        else {
            window.location.reload();
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const fetchedUsernames = await Promise.all(matchingUserReservations.map(async (reservation) => {
          const userData = await fetchUserByID(reservation.studentID);

          return {
            reservationID: reservation.reservationID,
            userID: reservation.studentID,
            firstname: userData.firstname,
            lastname: userData.lastname
          };
        }));
        setUsernames(fetchedUsernames.filter(user => user !== null));
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchUsernames();
  }, [matchingUserReservations]);

    return (
      <div id='profile_Container'>
        <Header />
        <div id="profile_body">
          {loading ? (
            <div>Loading...</div>
          ) : userData ? (
            <div id='UserProfileDetails'>
              <div id="botProfileDetails">
                <div id="reservedSeatsDetails">
                  {matchingUserReservations ? (
                  <>
                      <h1>Reservations</h1>
                        <ul>
                        <p>
                          {matchingUserReservations.map((reservations) =>(
                            <li key={reservations.reservationID} id="reservationContainer">
                            {/* Display user details here */}
                              {editingReservationID === reservations.reservationID ? (
                              <>
                              {userData.role === "Admin" && (
                              <>                            
                              {usernames.map(user => (
                              user.reservationID === reservations.reservationID && (
                                <div key={user.reservationID}>
                                  Student: {user.firstname} {user.lastname}<br />
                                </div>
                              )
                            ))}</>)}
                              <label htmlFor="labs-dropdown">Laboratory:</label>
                              <select name="labs" id="labs-dropdown" onChange={(e) => setEditingLabID(e.target.value)} defaultValue={editingLabID}>
                                {Object.values(labMap).map((lab) => (
                                  <option key={lab.id} value={lab.id}>
                                    {lab.id}  
                                  </option>
                                ))}
                              </select>
                              <br />
                              <label htmlFor="seat-dropdown">Seat-ID:</label>
                              <select id="seat-dropdown" onChange={(e) => setEditingSeatID(e.target.value)} defaultValue={editingSeatID}>
                                {labMap[selectedLab] && generateSeatArray(labMap[selectedLab].numRows, labMap[selectedLab].numCols)
                                .filter(seat => !labMap[selectedLab].emptyCells.includes(seat))
                                .filter(seat => seat === editingSeatID || !matchingReservations.some(reservation => reservation.labDetails.seatID === seat))
                                .map((seatID, index) => (
                                  <option key={index} value={seatID}>
                                    {seatID}
                                  </option>
                                ))}
                              </select>
                                <br></br>
                                <label htmlFor="day-dropdown">Day:</label>
                                <select onChange={(e) => setEditingDay(e.target.value)} defaultValue={editingDay}>
                                  {days.map((day, index) => (
                                    <option key={index} value={day}>
                                      {day}
                                    </option>
                                  ))}
                                </select>| 
                                <label htmlFor="timeSlot-dropdown">Time Slot:</label>
                                <select onChange={(e) => setEditingTime(e.target.value)} defaultValue={editingTime} >
                                  {timeSlots.map((timeStart, index) => {
                                    const timeEnd = findEndTime(timeStart);
                                    const timeSlotLabel = `${timeStart} - ${timeEnd}`;
                                    return (
                                      <option key={index} value={timeSlotLabel}>
                                        {timeSlotLabel}
                                      </option>
                                    );
                                  })}
                                </select>
                                <button id="topRightReservationButton1" onClick={() => handleCancel(reservations.reservationID)}>CANCEL</button>
                                <button id="topRightReservationButton2" onClick={() => handleConfirm(reservations, editingLabID, editingSeatID, editingDay, editingTimeStart, editingTimeEnd)}>CONFIRM</button>
                              </>
                              ) : (
                                <> 
                                  {userData.role === "Admin" && (<>
                                    {usernames.map(user => (
                                    user.reservationID === reservations.reservationID && (
                                      <div key={user.reservationID}>
                                        Student: {user.firstname} {user.lastname}<br />
                                      </div>
                                    )
                                  ))}
                                  </>)}
                                  Laboratory: {reservations.labDetails.labID} <br />
                                  Seat ID: {reservations.labDetails.seatID} <br />
                                  Day: {reservations.timeSlot.day} | Timeslot: {reservations.timeSlot.timeStart} - {reservations.timeSlot.timeEnd}
                                  <button id="topRightReservationButton1" onClick={() => handleDelete(reservations.reservationID)}>REMOVE</button>
                                  <button id="topRightReservationButton2" onClick={() => handleEditClick(reservations)}>EDIT</button>
                                </>)}
                              </li>
                            ))}
                          </p>
                        </ul>
                  </>
                  ):(
                    <>
                      <h1>Reservations</h1>
                      <p>Nothing yet...</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div id="errorProfile">User not found</div>
          )}
        </div>
        <Footer />
      </div>
    );
}
