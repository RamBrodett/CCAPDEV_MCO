import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/searchPillStyle.css';

export function Search_Field() {
  const [text, setText] = useState('');
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const searchPillContainerRef = useRef();

  const getMatchingUsers = async() => {
    try{
      const response = await fetch(`https://techquiverlrs.onrender.com/search?wordQuery=${text}`);
      if(!response.ok){
        throw new Error('Failed to fetch matching users');
      }
      const data = await response.json();
      setMatchingUsers(data);
      setIsDropdownVisible(!!data.length);
      }catch (error){
      console.error('Error fetching matching users:', error);
    }
  };

  const redirectToProfile = (firstname,lastname,userID) => {
    navigate(`/profile/${firstname}-${lastname}+${userID}`);
    setIsDropdownVisible(false); // Close the dropdown after clicking on a user
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchPillContainerRef.current && !searchPillContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div id="searchPillContainer" ref={searchPillContainerRef}>
      <div id="inputWrapper">
        <input
          type="text"
          placeholder="Search User"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            getMatchingUsers(); // Call getMatchingUsers on each input change
          }}
        />

        {isDropdownVisible && (
          <div className="dropdown">
            <ul>
              {matchingUsers.map((user) => (
                <li
                  key={user.userID}
                  onClick={() => redirectToProfile(user.firstname,user.lastname,user.userID)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.firstname} {user.lastname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
