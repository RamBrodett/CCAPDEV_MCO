/* AUthor chantal */
const User = require('../model/User');

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
  const {newemail, newpassword} = req.body;
    try {
        // implement user login credential update like password and email
        const {userID} = req.query;
        const {newpasswaord} = req.body;

    try{
        const updatedUser = await User.findOneAndUpdate({userID}, {
          $set: {
            password: newpassword
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