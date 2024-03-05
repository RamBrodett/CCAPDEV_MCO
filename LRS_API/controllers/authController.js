//login controller 

const User = require('../model/User');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/jwtAuth');


const handleUserLogin = async (req, res) => {
    const {email, password, rememberMe} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'});
    }

    try{
        const user = await User.findOne({email});
        
        if (!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid email or password'})
        }
       

        //it made it here, thus passwords are equal. Generate tokens 
        const {accessToken,refreshToken} = authMiddleware.generateCredentialToken(user,rememberMe); // error here
        
        
        res.cookie('accessToken', accessToken,{
            httpOnly: true,
            secure: false, //change to true later before deployment
            //expires: new Date(Date.now() +  1800000), 
            // + (min in milliseconds) to get the min value
            expires: new Date(Date.now() +  30000),
            path: '/'
        })
        

        if(rememberMe){
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, //change to true later before deployment
                expires: new Date(Date.now() + 3 * 7 * 24 * 3600000), 
                // + (number of weeks we want) * (days in a week) * 
                // (hours in a day) * (min in milliseconds) to get the week value
                path: '/'
            });
        } else{
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, //change to true later before deployment
                expires: new Date(Date.now() +  24 * 3600000), 
                // + (hours in a day) * (min in milliseconds) to get the day value
                path: '/'
            });

        }
        

        res.status(200).json({success: 'Login successful', userData : user.firstname});

    }catch (error){

        res.status(500).json({message : error.message});

    }
    
}
/*
const handleUserLogout = (req, res) =>{
    deleteCookies(res);
    res.status(200).json({success: 'Logout successful'})
}

function deleteCookies(res) {
    var cookies = res.getHeader('Set-Cookie');
    if (cookies) {
        cookies = Array.isArray(cookies) ? cookies : [cookies];
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split(';')[0];
            res.setHeader('Set-Cookie', cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
        }
    }
}
*/

module.exports = {handleUserLogin}//, handleUserLogout};