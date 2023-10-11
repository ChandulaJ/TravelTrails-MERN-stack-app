const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
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
    //validation
    if(!username || !password || !email){
        throw Error('Missing username or password or email')
    }
    if(!validator.isEmail(email)){
        throw Error('Invalid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error ('Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol')
    }

    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const account = await this.create({username,password:hash,email,address,occupation,dateofbith})
    return account
}


//static update account method
accountSchema.statics.updateAccount = async function(username,password,email,address,occupation,dateofbith){
    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const account = await this.create({username,password:hash,email,address,occupation,dateofbith})
    return account
}

//static login method

accountSchema .statics.login = async function(username,password){
    if(!username || !password){
        throw Error('Missing username or password')
    }
    const user = await this.findOne({username})
    if(!user){
        throw Error('Incorrect username')
    }
    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('account',accountSchema)