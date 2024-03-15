const User = require('../model/User');

const handleUserUpdate = async(req, res) => {
  const FindUser = async(req, res) => {
    const {firstname, lastname, userID} = req.query;
  
    try {
        const user = await User.findOne({userID,firstname,lastname});
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }catch (error) {
            console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

    const {newfn, newln, newcontact, newbio, newpicture} = req.body;
    try {
      if (newfn =!null){ //something
        User.firstname = newfn;
      }
      if (newln =!null){
        User.lastname = newln;
      }

      if (newcontact =!null){
        User.contact = newcontact;
      }

      if (newbio =!null){
        User.profile_info.bio = newbio;
      }

      if (newpicture =!null){
        User.profile_info.profile_picture_url = newpicture;
      }

      } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const handleUserLoginUpdate = async(req, res) =>{
  const {newemail, newpassword} = req.body;
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