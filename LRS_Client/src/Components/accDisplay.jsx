import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext.jsx';
import '../Styles/ADStyle.css';

export function AccDisplay() {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profileIMG/readImage?imgKey=${user.profileKey}`);
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.imageUrl);
                } else {
                    console.error('Error fetching image URL:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        getImageUrl();
    }, [user.profileKey]); // Add user.firstname as a dependency

    useEffect(() => {
        setDisplayName(`${user.firstname}`);
    }, [user.firstname, user.lastname]); // Update displayName when firstname or lastname changes

    if (!user.isLoggedIn) {
        return null;
    }

    return (
        <div className="accDisp">
            <img id='AccLogo' src={imageUrl} alt="User Profile" />
            <span id='AccDisplayName'>{displayName}</span>
        </div>
    );
}
