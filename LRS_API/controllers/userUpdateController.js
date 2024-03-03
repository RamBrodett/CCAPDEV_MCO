const User = require('../model/User');

const handleUserUpdate = async(req, res) => {
    try {
        // implementation of user profile update like name, contact number, bio
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const handleUserLoginUpdate = async(req, res) =>{
    try {
        // implementation of user login credential update like password and email
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}
    

module.exports = { handleUserUpdate, handleUserLoginUpdate};