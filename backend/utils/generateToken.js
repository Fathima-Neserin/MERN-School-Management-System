const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign({userId}, process.env.USER_JWT_SECRET,{
        expiresIn: "1d"
    })
    res.cookie("jwt", token,{
        maxAge: 1 * 24 * 60 * 60 * 1000 ,
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "strict"
    })
    return token;
}

module.exports = generateTokenAndSetCookie;