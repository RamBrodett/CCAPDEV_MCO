const validEmailExpression =  (email) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email);
}

const emailValidatorMiddleWare = (req, res, next) =>{

    const {email} = req.body;

    if(!validEmailExpression(email)){
        return res.status(400).json({ message: 'Invalid email address', problem : 'email'});

    }

    next();

}

module.exports = {emailValidatorMiddleWare}

