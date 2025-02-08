const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        enum : ['user', 'admin','coach','superadmin'],
        default : 'user'
    },
    timestamp:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userSchema)