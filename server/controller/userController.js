const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services/index');

const userService = new UserService();

const signup = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            confirmPassword,
        } = req.body

        const response = await userService.createUser({
            userName: userName,
            email: email,
            password: password,
            confirmPassword:confirmPassword
        });
        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            success: true,
            data: response
        });
    } catch (error) {

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
        else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.signIn({
            email: email,
            password: password
        });
        console.log('response in controller:', response);
        const options = {
            expires: new Date(Date.now() + 20 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        };

        if (response.success) {
            return res.cookie("token", response.token.toString(), options).status(200).json({
                success: true,
                token: response.token,
                message: `Employee Login Success`,
                user: email,
                userId: response.id
            });
        } else {
            return res.status(401).json({
                success: false,
                message: response.message
            });
        }
    } catch (error) {
        console.log("Something went wrong in the controller");
        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
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


module.exports = { signup, signin, } 