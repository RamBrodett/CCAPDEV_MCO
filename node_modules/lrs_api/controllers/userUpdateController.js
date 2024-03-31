/* Author: Chantal,
revised: Ram */
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUserUpdate = async(req, res) => {
  const { userID, editedUserData }= req.body;

    const contactnum = editedUserData.contactnum === "null" ? null : editedUserData.contactnum;
    const bio = editedUserData.biography === "" ? null : editedUserData.biography;
    
    try{
        const updatedUser = await User.findOneAndUpdate({userID}, {
          $set: {
            firstname: editedUserData.firstname,
            lastname: editedUserData.lastname,
            email: editedUserData.email,
            contactnum: contactnum,
            "profile_info.bio" : bio,
          }
        }, {new: true}
        );
        
        if (!updatedUser) { //didnt find user
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({user:updatedUser});
    }catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const handleUserLoginUpdate = async(req, res) =>{
  const {email, newPass} = req.body;
  const hashedPass =await bcrypt.hash(newPass,10);
  try{
    const updatedUser = await User.findOneAndUpdate({email}, {
      $set: {
        password: hashedPass,
      }
    }, {new: true});

    if (!updatedUser) { //didnt find user
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({updatedUser})
  }catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}
    
module.exports = { handleUserUpdate, handleUserLoginUpdate};