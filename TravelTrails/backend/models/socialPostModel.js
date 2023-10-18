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
        },
        photoPath:{
            type:String,
            required:false
        },
        comments: [
            {
                comment_text: {
                    type: String,
                    required: false
                },
                comment_accountId: {
                    type: String,
                    required: false
                }
            }
        ]
    

},
{timestamps:true})

module.exports = mongoose.model('socialPost',socialPostSchema)