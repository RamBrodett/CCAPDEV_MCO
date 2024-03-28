import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import '../Styles/settings.css';

export function SettingsProfile() {
  const { userCred } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswdEditing, setIsPasswdEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      console.log( userCred)
      const [firstname, lastnameNID] = userCred.split('-');
      const [lastname, userID] = lastnameNID.split('+');
      try {
        const response = await fetch(`http://localhost:3000/getProfile?firstname=${firstname}&lastname=${lastname}&userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const user = await response.json();
        setUserData(user);
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
    fetchUser();

  },[userCred]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditedUserData({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      contactnum: userData.contactnum,
      biography: userData.profile_info.bio
    })

  };

  const handlePasswordChangeToggle = () => {
    setIsPasswdEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };
  const handleSavePassChanges = () => {
    setIsPasswdEditing(false);
  };
  const handleCancelPassChanges = () => {
    setIsPasswdEditing(false);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
  };

  return (
    <div id="profile_Container">
      <Header />
      <div id="profile_body">
        {loading ? (
          <div>Loading...</div>
        ) : userData ? (
          <div id="UserProfileDetails">
           <h2>{`${userData.role}'s Profile`}</h2>
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
                        value={editedUserData.firstname}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="lastNameInput">Last Name:</label>
                      <input
                        type="text"
                        id="lastNameInput"
                        name="Lname"
                        value={editedUserData.lastname}
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
                          value={editedUserData.contactnum}
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
                ) : ( isPasswdEditing ? (
                  <>
                    <div id='PasswordChangeForm'>
                      <label htmlFor="passwordInput">Current Password:</label>
                      <input
                        type="password"
                        id="passwordInput"
                        name="passwordInputname"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="newpasswordInput">New Password:</label>
                      <input
                        type="password"
                        id="newpasswordInput"
                        name="newpasswordInputname"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="confirmpasswordInput">Confirm Password:</label>
                      <input
                        type="password"
                        id="confirmpasswordInput"
                        name="confirmpasswordInputname"
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ):(
                  <>
                    <div id='topProfileDetails'>
                      <img id='userProfileImage' src={imageUrl} alt="User Profile"></img>
                      <div id="profileDetails" >
                          <div id="profileNameText">
                              <h1>{`${userData.lastname},${userData.firstname}`}</h1>
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
                  </>)
                )}
            </div>
            <div className='botProfileDetails'>
              { (!isEditing && !isPasswdEditing) ? (userData.profile_info.bio !== null ? (
                  <div id='bio'>
                    <h1>Biography</h1>
                    <p>{userData.profile_info.bio}</p>
                  </div>
                ) : (
                  <div id='bio'>
                    <h1>Biography</h1>
                    <p>Nothing yet...</p>
                  </div>
                )
              ):(null)}

            </div>
            <div id="buttons">
              {isEditing ? (
                <>
                <button id='cancelButt' onClick={handleCancelChanges}>Cancel Editing</button>
                <button id='saveButt' onClick={handleSaveChanges}>Save Changes</button>
                </>
              ) : ( isPasswdEditing ? (
                <>
                <button id='cancelButt' onClick={handleCancelPassChanges}>Cancel Editing</button>
                <button id='saveButt' onClick={handleSavePassChanges}>Save Changes</button>
                </>) : (
                <>
                  <button onClick={handleEditToggle}>Edit Profile</button>
                  <button onClick={handlePasswordChangeToggle} id='passwordAccButt'>Change Password</button>
                  <button id='deleteAccButt'>Delete Account</button>
                </>
              )
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
