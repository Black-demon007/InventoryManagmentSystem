const jwt = require('jsonwebtoken');


const isFileTypeSupported=async(fileType, supportedTypes)=> {
    return supportedTypes.includes(fileType);
}

const verifyToken=(token,securityKey)=>{
    try {
        const decodedToken=jwt.verify(token,securityKey)
        return decodedToken;
    } catch (error) {
        console.error("Something went wrong in token verification:", error);
        throw error;
    }
}

const createToken=(payload, secretKey, expiresIn)=> {
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
    } catch (error) {
        console.error("Something went wrong in token creation:", error);
        return null
    }
}

module.exports={
    isFileTypeSupported,createToken,verifyToken
}