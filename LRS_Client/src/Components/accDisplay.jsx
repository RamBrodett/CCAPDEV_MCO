import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext.jsx';
import '../Styles/ADStyle.css';

export function AccDisplay() {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (!user || !user.isLoggedIn) {
            setImageUrl('');
            setDisplayName('');
            return;
        }

        const getImageUrl = async () => {
            try {
                const response = await fetch(`https://techquiverlrs.onrender.com/profileIMG/readImage?imgKey=${user.profileKey}`);
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.imageUrl);
                    location.reload();
                } else {
                    console.error('Error fetching image URL:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        getImageUrl();
    }, [user]);

    useEffect(() => {
        if (!user || !user.isLoggedIn) {
            setDisplayName('');
            return;
        }

        setDisplayName(`${user.firstname}`);
    }, [user]); 

    if (!user || !user.isLoggedIn) {
        return null;
    }

    return (
        <div className="accDisp">
            {imageUrl && <img id='AccLogo' src={imageUrl} alt="User Profile" />}
            {displayName && <span id='AccDisplayName'>{displayName}</span>}
        </div>
    );
}
