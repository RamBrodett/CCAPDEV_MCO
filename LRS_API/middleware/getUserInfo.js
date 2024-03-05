
const getUserName = (req, res) =>{
    const user = req.user;
    res.status(200).json({userData: user.fname});
}

module.exports = {getUserName}