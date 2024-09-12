const mongoose=require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://omkarraj281001:v6ts0oSZ1YcSVAKY@cluster0.o8tpp.mongodb.net/');
        console.log('db connection successful');
    } catch (error) {
        console.error('Unable to connect with DB:', error);
    }
};

module.exports={connect}