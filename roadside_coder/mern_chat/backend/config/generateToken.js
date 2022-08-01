const jwt = require('jsonwebtoken')

//function to generate jwt
const generateToken = (id) => {
    //sign new token with particular new id
    return jwt.sign({id},process.env.JWT_SECRET,
        {expiresIn : "30d"})
}

module.exports = generateToken;