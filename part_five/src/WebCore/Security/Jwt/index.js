const jwt = require('jsonwebtoken');

const ServerError = require('../../../WebApp/Models/ServerError.js');

const options = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE
};

const generateTokenAsync = async (payload) => {
    // TODO
    // HINT: folositi functia "sign" din biblioteca jsonwebtoken
    // HINT2: seamana cu functia verify folosita mai jos ;)
    /*
     payload este JwtPayloadDto
    */
   try {
       const token =  jwt.sign({payload}, process.env.JWT_SECRET_KEY, options); 
       return token;
   } catch (error) {
       console.trace(error);
       throw new ServerError("Eroare la generarea tokenului!", 401);
   }
};

const verifyAndDecodeDataAsync = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la decriptarea tokenului!", 401);
    }
};

module.exports = {
    generateTokenAsync,
    verifyAndDecodeDataAsync
};