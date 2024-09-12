const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT,
    JWT_KEY:process.env.JWT_KEY,
    Mongo_URL:process.env.Mongo_URL,


}