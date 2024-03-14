/* 
 Author: Ram David Brodett
*/
const User = require('../model/User');

const handleUserDelete = async(req, res) => {
    const {email} = req.body;

    try{

        const userdelete = await User.findOneAndDelete({email});

        if (userdelete){
            return res.status(200).json({ message : 'User deleted successfuly'});
        } else{
            return res.status(404).json({ message : 'User not found'});
        }

    }catch(error){
        return res.status(500).json({ message : 'Internal server error occured', error : error.message})
    }

}

module.exports = { handleUserDelete };