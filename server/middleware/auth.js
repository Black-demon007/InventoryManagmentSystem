const { verifyToken } = require("../utils/fileAndTokens");
const { UserRepository } = require('../repo/main')
const { JWT_KEY } = require('../config/envConfig')

const isAuthenticatedMid = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        console.log('token in isAuth middleware:', req.cookies.token);

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            const decodedToken = verifyToken(token, JWT_KEY);
            if (!decodedToken) {
                throw new ServiceError(
                    'Invalid Token',
                    'The provided token is invalid.',
                    StatusCodes.BAD_REQUEST
                );
            }
            req.employee = { ...decodedToken };
        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        next();

    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: error.message,
                success: false,
                error: "jwt is not valid or provided",
                data: {}
            });
        } else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}




module.exports = { isAuthenticatedMid }