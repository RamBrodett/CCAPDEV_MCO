import './profile.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Profile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5173/profile/${userId}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    return (
        <div id="profile_Container">
            <Header />
            <div id="profile_body">
                {userData ? (
                    <div className='userprofiletop'>
                        <h2>{`${userData.Fname} ${userData.Lname}'s Profile`}</h2>
                        <hr />
                        {/* Display other user-related information */}
                    </div>
                ) : null}
            </div>
            <Footer />
        </div>
    );
}
