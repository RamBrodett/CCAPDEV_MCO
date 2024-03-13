const User = require('../model/User');

const userProfile = async (req, res) =>{
    const {firstname,lastname,userID} = req.query;
    try{
        const user = await User.findOne({userID,firstname,lastname});
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {userProfile}