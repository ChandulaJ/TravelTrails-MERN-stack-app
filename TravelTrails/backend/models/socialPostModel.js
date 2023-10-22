const mongoose = require('mongoose')
const Schema = mongoose.Schema

const socialPostSchema = new Schema({
 
  contentText:{
    type:String,
    required:true
},

 photo:{
    type:String,
    required:false
 },

 user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'accountModel',
    
  },
    username_id:{
        type:String,
        required:false
    },
    user_address:{
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'accountModel',
                required: false
            }
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('socialPost',socialPostSchema)