const {User} = require('../models/index');
const { AppError } = require('../utils/err/index');
const { StatusCodes } = require('http-status-codes');


class UserRepo {

    async createUser(userData) {
        try {

            const user = await User.create({...userData})
            return user;
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw new AppError(
                'CreateUserError',
                'Error occurred while creating user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }


    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    


}

module.exports = UserRepo;