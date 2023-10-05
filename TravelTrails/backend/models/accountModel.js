const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema  = mongoose.Schema

const accountSchema = new Schema({
 

    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

     email:{
        type:String,
        required:true
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

//static create account method
accountSchema.statics.createAccount = async function(username,password,email,address,occupation,dateofbith){
    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const account = await this.create({username,password:hash,email,address,occupation,dateofbith})
    return account
}

module.exports = mongoose.model('account',accountSchema)