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
  const [matchingReservations, setMatchingReservations] = useState([]);

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
        fetchReservations(user);
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

    const fetchReservations = async (userData) =>{
      const userId = userData.userID;
      try{
        const reservations = await fetch(`http://localhost:3000/getUserReservations?userId=${userId}`)
        if(reservations.ok){
          const data = await reservations.json();
          setMatchingReservations(data);
          console.log(matchingReservations);
        }
      }catch(error){
        console.error('Error fetching reservations:', error);
      }
    }

    fetchUser();

  }, [userCred]);

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
                {matchingReservations ? (
                <>
                    <h1>Reservations</h1>
                      <ul>
                      <p>
                        {matchingReservations.map((reservations) =>(
                            <li key={reservations.reservationID} style={ {border: '2px solid gray', marginBottom: '5px'}}>
                              Laboratory: {reservations.labDetails.labID} <br />
                              Seat-ID: {reservations.labDetails.seatID} <br />
                              Day: {reservations.timeSlot.day} | Timeslot: {reservations.timeSlot.timeStart} - {reservations.timeSlot.timeEnd}
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
