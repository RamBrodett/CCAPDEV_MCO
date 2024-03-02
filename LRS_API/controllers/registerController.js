const User = require('../model/User');
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {email, password, firstname, lastname} = req.body;

    if(!email || !password || !firstname || !lastname ) return res.status(400).json({'message': 'All credentials are required'});

    //find email duplicates
    const userDuplicate = await User.findOne({email: email}).exec();

    if(userDuplicate) return res.status(409); // conflict 

    try{
        // get last userId for assignment
        const lastId = await User.findOne({},{},{sort: {'userID': -1}}).exec();
        var newUserID = 1;

        if (lastId){
            newUserID = lastId.userID + 1;
        }

        const hashedPass = await bcrypt.hash(password,10);

        const result = await User.create({
            userID: newUserID,
            email: email,
            password: hashedPass,
            firstname: firstname,
            lastname: lastname
        });
        //checker if it was registered
        console.log(result);

        res.status(201).json({ 'success' : `New user ${firstname} created!`});

    } catch( error){
        res.status(500).json({'message': error.message});
    }

}

module.exports = { handleNewUser };
