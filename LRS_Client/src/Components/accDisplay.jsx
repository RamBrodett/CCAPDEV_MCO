/*
Author: Ram David Brodett
*/
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { useAuth } from '../AuthContext.jsx';
import '../Styles/ADStyle.css'

export function AccDisplay() {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');

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
    }, [user.profileKey]);

    if (!user.isLoggedIn) {
        return null;
    }

    return (
        <div className="accDisp">
            <img id='AccLogo' src={imageUrl} />
            <span id='AccDisplayName'>{user.firstname}</span>
        </div>
    );
}
