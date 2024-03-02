import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserProvider';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import tempUserIcon from '../Assets/UserIcon.png';
import '../Styles/settings.css';

export function SettingsProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const dummyUsers = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const user = dummyUsers.find((user) => user.id === parseInt(userId, 10));

    if (user) {
      setUserData(user);
      setEditedUserData(user); 
    } else {
      console.error(`User with userId ${userId} not found`);
    }
  }, [dummyUsers, userId]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setUserData(editedUserData);
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
  };

  return (
    <div id="profile_Container">
      <Header />
      <div id="profile_body">
        {userData ? (
          <div id="UserProfileDetails">
            <h2>{`${userData.Fname} ${userData.Lname}'s Settings`}</h2>
            <hr />
            <div id="topProfileDetails">
              {isEditing ? (
                <>
                  <div id="editableProfileInfo">
                    <div id="profileImageEdit">
                      <label htmlFor="profileImageInput">Change Profile Image:</label>
                      <input
                        type="file"
                        id="profileImageInput"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div id="profileNameTextEdit">
                      <label htmlFor="firstNameInput">First Name:</label>
                      <input
                        type="text"
                        id="firstNameInput"
                        name="Fname"
                        value={editedUserData.Fname}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="lastNameInput">Last Name:</label>
                      <input
                        type="text"
                        id="lastNameInput"
                        name="Lname"
                        value={editedUserData.Lname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div id="contactEdit">
                      <label htmlFor='contactanchor' id='contacts'>Contacts</label>
                      <>
                        <label htmlFor="emailInput" id="contactanchor">Email:</label>
                        <input
                          type="email"
                          id="emailInput"
                          name="email"
                          placeholder='sample@email.com'
                          value={editedUserData.email}
                          onChange={handleInputChange}
                        />
                      </>
                      <>
                        <label htmlFor="numberInput">Number:</label>
                        <input
                          type="tel"
                          id="numberInput"
                          name="number"
                          value={editedUserData.number}
                          onChange={handleInputChange}
                          placeholder='10 digit phone number(omit 0)'
                        />
                      </>
                    </div>
                      <div id="bioEdit">
                        <label htmlFor="bioTextarea">Biography:</label>
                        <textarea
                          id="bioTextarea"
                          name="biography"
                          value={editedUserData.biography || ''}
                          onChange={handleInputChange}
                        />
                    </div>
                  </div>
                </>
                ) : (
                  <div id='topProfileDetails'>
                        <img id="userProfileImage" src={tempUserIcon} alt="User Icon" />
                        <div id="profileDetails" >
                            <div id="profileNameText">
                                <h1>{`${editedUserData.Lname}, ${editedUserData.Fname}`}</h1>
                            </div>
                            <div id="contactdetails">
                                <h1>Contact</h1>
                                <div id="contactInfo">
                                    <h2>{`${editedUserData.email}`}</h2>
                                    {editedUserData.number ? <h2>{`(+63) ${editedUserData.number}`}</h2> : null}
                                </div>
                            </div>
                        </div>
                  </div>
                )}
            </div>
            <div className='botProfileDetails'>
              { !isEditing ? (
                <>
                <div id="bio">
                  <h1>Biography</h1>
                  <p>{editedUserData.biography || 'Nothing yet...'}</p>
                </div>
              </>
              ):(null
              )}

            </div>
            <div id="buttons">
              {isEditing ? (
                <>
                <button id='cancelButt' onClick={handleCancelChanges}>Cancel Editing</button>
                <button id='saveButt' onClick={handleSaveChanges}>Save Changes</button>
                </>
              ) : (
                <>
                  <button onClick={handleEditToggle}>Edit Profile</button>
                  <button id='deleteAccButt'>Delete Account</button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div id="errorProfile"></div>
        )}
      </div>
      <Footer />
    </div>
  );
}