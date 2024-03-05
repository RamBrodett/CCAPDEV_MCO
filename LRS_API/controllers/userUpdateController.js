const User = require('../model/User');

const handleUserUpdate = async(req, res) => {
    try {
        // implement user profile update like name, contact number, bio
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const handleUserLoginUpdate = async(req, res) =>{
    try {
        // implement user login credential update like password and email
      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

/*note

@AisuChantal

the ui for update is not yet suitable for changing login credentials only for profile update.
ill adjust the handle userlogin Update and adjust the ui for that. just do the handleUserUpdate functionality for now.
*/
    

module.exports = { handleUserUpdate, handleUserLoginUpdate};