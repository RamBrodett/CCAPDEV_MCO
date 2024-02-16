import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserProvider';
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import tempUserIcon from '../assets/UserIcon.png'
import './profile.css'

export function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const dummyUsers = useUser();

  useEffect(() => {
    // Assume dummyUsers is an array of user data

    const user = dummyUsers.find(user => user.id === parseInt(userId, 10));

    if (user) {
      setUserData(user);
    } else {
      console.error(`User with userId ${userId} not found`);
    }
  }, [dummyUsers, userId]);

  return (
    <div id='profile_Container'>
        <Header />
        <div id="profile_body">
        {userData ? (
            <div id='UserProfileDetails'>
                <h2>{`${userData.Fname} ${userData.Lname}'s Profile`}</h2>
                <hr />
                <div id="topProfileDetails">
                    <img id='userProfileImage' src={tempUserIcon}></img>
                    <div id="profileDetails">
                        <div id="profileNameText">
                            <h1 id='SurnamePlaceholder'>{`${userData.Lname}`}</h1>
                            <h1>, </h1>
                            <h1 id='FirstNamePlaceholder'>{`${userData.Fname}`}</h1>
                        </div>
                        <div id="contactdetails">
                            <h1>Contact</h1>
                            <div id="contactInfo">
                                <h2>{`${userData.email}`}</h2>
                                {userData.number ? <h2>{`(+63) ${userData.number}`}</h2> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="botProfileDetails">
                    <div id="biodetails">
                        <h1>Biography</h1>
                        <p>Nothing yet...
                        </p>
                    </div>
                    <div id="reservedSeatsDetails">
                        <h1>Reservations</h1>
                        <p>Nothing yet...
                        </p>
                    </div>
                    
                </div>
            </div>
        ) : (
            <div id="errorProfile">

            </div>
        )}
        </div>
        <Footer />
    </div>
  );
}
