import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/searchPillStyle.css';
import { useUser } from '../UserProvider';

export function Search_Field() {
  const [text, setText] = useState('');
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const searchPillContainerRef = useRef();
  const dummyUsers = useUser();

  const getMatchingUsers = () => {

    const searchWords = text.toLowerCase().split(/\s+/);
    const filteredUsers = dummyUsers.filter(user =>
      searchWords.every(word => user.Fname.toLowerCase().includes(word))
    );

    setMatchingUsers(filteredUsers);
    setIsDropdownVisible(!!filteredUsers.length); // Show dropdown only if there are matching users
  };

  const redirectToProfile = (userId) => {
    console.log(userId);
    // You can replace this with the actual route/path to the profile page
    navigate(`/profile/${userId}`);
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
                  key={user.id}
                  onClick={() => redirectToProfile(user.id)}
                  style={{ cursor: 'pointer' }} // Ensure the cursor is a pointer
                >
                  {user.Fname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
