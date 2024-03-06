const jwt = require('jsonwebtoken');
const User = require('../model/User');
const secretKey = process.env.JWT_SECRET_KEY;

const generateCredentialToken = (user,isRememberMeToggled) =>{
    try{
        const payload = {
            userId: user.userID,
            email: user.email,
            firstname: user.firstname,
        }
        const refreshPayload = {
            userId: user.userID,
        }
        
        //const accesTokenOptions = { expiresIn: '30m'};
        const accesTokenOptions = { expiresIn: '30s'};
        const refreshTokenOptions = { expiresIn: isRememberMeToggled ? '3w' : '1d'};
        const accessToken = jwt.sign(payload, secretKey, accesTokenOptions);
        
        const refreshToken = jwt.sign(refreshPayload, secretKey, refreshTokenOptions);
        return {accessToken, refreshToken};
    }catch(error){
        console.log(error)
    }

};

const generateNewToken = (user) => {
    const payload = {
        userId: user.userID,
        email: user.email,
        firstname: user.firstname,
    }
    //const accesTokenOptions = { expiresIn: '30m'};
    const accesTokenOptions = { expiresIn: '30s'};
    const accessToken = jwt.sign(payload, secretKey, accesTokenOptions);
    return accessToken;

};

const verifyJWT = (token) => {
    try{
        const decodedToken = jwt.verify(token,secretKey);
        return decodedToken;
    }catch(error){
        return null
    }

};

const getUserFromToken = async (decodedToken) => {
    if (decodedToken && decodedToken.userId) {
        const userId = decodedToken.userId;
        try {
            const user = await User.findOne({userID: userId});
            return user;
        } catch (error) {
            console.error('Error fetching user from data store:', error);
            return null;
        }
    }

    return null;

}

const authenticateJWT = async (req, res, next) =>{

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken){
        return res.status(401).json({message: 'Unauthorized'});
    }

    let decodedUserToken;

    if(accessToken){
        decodedUserToken = verifyJWT(accessToken);
    } 

    if(!decodedUserToken){
        decodedUserToken = verifyJWT(refreshToken);
        if(decodedUserToken){
            const user = await getUserFromToken(decodedUserToken);
            const newAccessToken = generateNewToken(user);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: false,
                //expires: new Date(Date.now() +  1800000),
                expires: new Date(Date.now() +  30000),
            });
            req.user = user;
            
            return next();
        }
    }else {
        req.user = decodedUserToken;
        return next();
    }

    return res.status(403).json({ message: 'Invalid token' });

};

module.exports = {
    generateCredentialToken,
    authenticateJWT
};