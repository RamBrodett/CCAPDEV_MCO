/* Author: Chantal,
revised: Ram */
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUserUpdate = async(req, res) => {
    const {newfn, newln, newcontact, newbio, newpicture} = req.body;
    const {userID} = req.query;

    try{
        const updatedUser = await User.findOneAndUpdate({userID}, {
          $set: {
            firstname: newfn,
            lastname: newln,
            contact: newcontact,
            'profile_info_bio': newbio,
            'profile_info.profile_picture_url': newpicture
          }
        }, {new: true}
        );
        
        if (!updatedUser) { //didnt find user
          return res.status(404).json({ message: 'User not found' });
        }
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
    
    res.status(200).json({User: updatedUser})
  }catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}
    
module.exports = { handleUserUpdate, handleUserLoginUpdate};