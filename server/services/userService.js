const bcrypt = require('bcryptjs');
const { EmployeeRepository, } = require('../repo/main');
const { ServiceError, } = require('../utils/err/index');
const { JWT_KEY } = require('../config/envConfig');
const { StatusCodes } = require('http-status-codes');
const validator = require("email-validator");
const { verifyToken, createToken } = require('../utils/fileAndTokens');
const UserRepository = require('../repo/userRepo');

const userRepository = new UserRepository();


class UserService {
    async createUser(data) {
        try {
            const {
                userName,
                email,
                password,
                confirmPassword,
            } = data
            const validEmail = validator.validate(email);
            console.log(validEmail)
            if (!validEmail) {
                throw new ServiceError(
                    'Invalid Email',
                    'You are attempting to login with invalid email',
                    StatusCodes.NOT_FOUND);
            }

            if (password !== confirmPassword) {
               throw new ServiceError(
                'Password and Confirm Password not matching',
                'Please provide same password and confirm password',
                StatusCodes.BAD_REQUEST
               )
            }

            const userExists = await userRepository.getUserByEmail(email);
            if (userExists) {
                throw new ServiceError(
                    'Email Already Registered',
                    'An Account is already associated with this email. Please use a different email.',
                    StatusCodes.BAD_REQUEST
                );
            }

            console.log('before hashing password')
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);


            const user = await userRepository.createUser({userName,email,password:hashedPassword});
            return user;
        } catch (error) {
            console.error("Something went wrong in the service layer:", error);
            throw error
        }
    }

    async signIn(data) {
        try {
            const userDetails = await userRepository.getUserByEmail(data.email);

            if (!userDetails) {
                throw new ServiceError(
                    'Invalid Credentials',
                    'Email is not registered.',
                    StatusCodes.UNAUTHORIZED
                );
            }


            const passwordcheck = await bcrypt.compare(data.password, userDetails.password);
            if (!passwordcheck) {
                throw new ServiceError(
                    'Invalid credentials',
                    'Invalid credentials .',
                    StatusCodes.UNAUTHORIZED
                );
            }

            console.log('password check successful');
            

            const payload = {
                email: userDetails.email,
                id: userDetails._id,
            };
            console.log('jwt key:',JWT_KEY);
            
            const token = await createToken(payload, JWT_KEY, '24h');
            return { success: true, token: token, id: userDetails._id };
        } catch (error) {
            console.error("Something went wrong in the sign-in process:", error);
            return { success: false, message: error.message };
        }
    }
}

module.exports = UserService;