const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'Name is required Omkar'],

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    password: {
        type: String,
        required: true,
        
    },
   
})

module.exports=mongoose.model('User',userSchema)