const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const socialPostSchema = new Schema({
 

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
     },
        username_id:{
            type:String,
            required:false
        },
        user_address:{
            type:String,
            required:false
        }

},
{timestamps:true})

module.exports = mongoose.model('socialPost',socialPostSchema)