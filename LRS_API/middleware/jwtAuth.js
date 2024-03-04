const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const generateCredentialToken = (user,isRememberMeToggled) =>{
    const payload = {
        userId: user.userID,
        email: user.email,
    }

    const accesTokenOptions = { expiresIn: '8h'};

    const accessToken = jwt.sign(payload, secretKey, accesTokenOptions);
    if(isRememberMeToggled){
        const refreshPayload = {
            userId: user.userID,
        }
        const refreshAccessTokenOptions = { expiresIn: '3w'};
        const refreshAccessToken = jwt.sign(refreshPayload, secretKey, refreshAccessTokenOptions);

        return {accessToken, refreshAccessToken};
    }

    return accessToken;

};

const verifyJWT = (token) =>{
    try{
        const decodedToken = jwt.verify(token,secretKey);
        return decodedToken;
    }catch(error){
        return null
    }

};

const authenticateJWT = (req, res, next) =>{

    const UserToken = req.headers.authorization;

    if (!UserToken){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const decodedUserToken = verifyJWT(UserToken);

    if(!decodedUserToken){
        return res.status(403).json({message: 'Invalid token'});
    }

    req.user = decodedUserToken;
    next();

};

module.exports = {
    generateCredentialToken,
    verifyJWT,
    authenticateJWT
};