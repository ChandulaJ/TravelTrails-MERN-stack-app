const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const accountSchema = new Schema({
 

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

     email:{
        type:String,
        required:false
     },
     address:{
        type:String,
        required:false
    },
    occupation:{
       type:String,
       required:false
    },
    dateofbith:{
       type:Date,
       required:false
    }
},
{timestamps:true})

module.exports = mongoose.model('account',accountSchema)