const User = require('../model/User');

const getUserProfiles = async (req, res) => {
    const { role } = req.query;
    try {
        const matchingProfiles = await User.find({role: role});
        res.json(matchingProfiles);
    } catch (error) {
        console.error('Error searching profiles: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getUserProfiles }
