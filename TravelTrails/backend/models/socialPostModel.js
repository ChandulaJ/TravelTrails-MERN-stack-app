const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const socialPostSchema = new Schema({
 

    author:{
        type:String,
        required:true
    },

    contentText:{
        type:String,
        required:true
    },

     photos:{
        type:String,
        required:false
     },
     videos:{
        type:String,
        required:false
     },
     user_id:{
            type:String,
            required:true
     }
},
{timestamps:true})

module.exports = mongoose.model('socialPost',socialPostSchema)