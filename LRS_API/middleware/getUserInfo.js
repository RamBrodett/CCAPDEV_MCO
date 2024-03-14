/* 
 Author: Ram David Brodett
*/
const getUser = (req, res) => {
    const user = req.user;
    res.status(200).json({userData: user});
}

module.exports = {getUser}