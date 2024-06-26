import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import '../Styles/profile.css'

export function Profile() {
  const { userCred } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [matchingUserReservations, setMatchingUserReservations] = useState([]);
  const [matchingReservations, setMatchingReservations] = useState([]);
  const [editingReservationID, setEditingReservationID] = useState(null);
  const [EditingLabID, setEditingLabID] = useState('');

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
        const response = await fetch(`https://techquiverlrs.onrender.com/getProfile?firstname=${firstname}&lastname=${lastname}&userID=${userID}`);
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
        const response = await fetch(`https://techquiverlrs.onrender.com/profileIMG/readImage?imgKey=${imageKey}`);
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
      const userId = userData.userID;
      try{
        const reservations = await fetch(`https://techquiverlrs.onrender.com/getUserReservations?userId=${userId}`)
        if(reservations.ok){
          const data = await reservations.json();
          setMatchingUserReservations(data);
          console.log(matchingUserReservations);
        }
      }catch(error){
        console.error('Error fetching reservations:', error);
      }
    }

    fetchUser();

  }, [userCred]);

  const handleEditClick = (reservation) => {
    setEditingReservationID(reservation.reservationID);
    setEditingLabID(reservation.labDetails.labID);
    setEditingSeatID(reservation.labDetails.seatID);
    setEditingDay(reservation.labDetails.day);
    setEditingTimeStart(reservation.labDetails.timeStart);
    setEditingTimeEnd(reservation.labDetails.timeEnd);
    setEditingTime(reservation.labDetails.timeStart - reservation.labDetails.timeEnd);

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
            console.log("yabababadoo " + EditingLabID);
          const reservations = await fetch(`https://techquiverlrs.onrender.com/getReservations?labID=${EditingLabID}&day=${selectedDay}&timeStart=${convertTo24Hour(selectedTime)}`)
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
  }, [EditingLabID, selectedDay, selectedTime]);

    return (
      <div id='profile_Container'>
        <Header />
        <div id="profile_body">
          {loading ? (
            <div>Loading...</div>
          ) : userData ? (
            <div id='UserProfileDetails'>
              <h2>{`${userData.role}'s Profile`}</h2>
              <hr />
              <div id="topProfileDetails">
                <img id='userProfileImage' src={imageUrl} alt="User Profile"></img>
                <div id="profileDetails">
                  <div id="profileNameText">
                    <h1 id='SurnamePlaceholder'>{`${userData.lastname}`}</h1>
                    <h1>, </h1>
                    <h1 id='FirstNamePlaceholder'>{`${userData.firstname}`}</h1>
                  </div>
                  <div id="contactdetails">
                    <h1>Contact</h1>
                    <div id="contactInfo">
                      <h2>{`${userData.email}`}</h2>
                      {userData.contactnum ? <h2>{`(+63) ${userData.contactnum}`}</h2> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div id="botProfileDetails">
                <div id="biodetails">
                  {userData.profile_info.bio !== null ? (
                    <>
                      <h1>Biography</h1>
                      <p>{userData.profile_info.bio}</p>
                    </>
                  ) : (
                    <>
                      <h1>Biography</h1>
                      <p>Nothing yet...</p>
                    </>
                  )}
                </div>
                <div id="reservedSeatsDetails">
                  {matchingUserReservations ? (
                    <>
                      <h1>Reservations</h1>
                      <ul>
                        <p>
                        {matchingUserReservations.map((reservation) => (
                          // Check if reservation is not anonymous
                          !reservation.anonymous && (
                            <li key={reservation.reservationID} id="reservationContainer">
                              <>
                                Laboratory: {reservation.labDetails.labID} <br />
                                Seat-ID: {reservation.labDetails.seatID} <br />
                                Day: {reservation.timeSlot.day} | Timeslot: {reservation.timeSlot.timeStart} - {reservation.timeSlot.timeEnd}
                              </>
                            </li>
                          )
                        ))}
                        </p>
                      </ul>
                    </>
                  ) : (
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
