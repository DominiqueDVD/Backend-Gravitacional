const jwt = require("jsonwebtoken");
require("dotenv").config();

function sign(payload, isAccesToken){
    console.log("payload", payload);
    return jwt.sign(
        payload, 
        isAccesToken
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: 3600,
            algorithm: "HS256",
           
        }
    );
}

function generateAccessToken(user){

    return sign({user}, true);
}

function genereteRefreshToken(user){
    return sign({user}, false);
}

module.exports = {generateAccessToken, genereteRefreshToken}