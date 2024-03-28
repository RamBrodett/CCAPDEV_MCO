/* 
 Author: Ram David Brodett
*/
const User = require('../model/User');

const userSearch = async(req, res) =>{
    const {wordQuery} = req.query;
    try{
        const regexString = wordQuery.split('').map(char => `(?=.*${char})`).join('');
        const regex = new RegExp(regexString, 'i');

        const matchingUsers = await User.find({
            $or: [
                { firstname: { $regex: regex } }, // Match users whose first name contains the search query in the same order
                { lastname: { $regex: regex } },  // Match users whose last name contains the search query in the same order
            ]
        });
        res.json(matchingUsers);
    }catch(error){
        console.error('Error searching users: ', error);
        res.status(500).json({message: 'Internal server error'});

    }
}

module.exports = {userSearch}