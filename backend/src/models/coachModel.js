const mongoose = require('mongoose')

const coachScheme = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
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
        default : 'coach'
    },
    certificateURL :{
        type : String,
        required : true
    },
    timestamp:{
        type : Date,
        default : Date.now
    },
    isApproved:{
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Coach', coachScheme)   