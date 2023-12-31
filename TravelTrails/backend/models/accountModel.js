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
    dateofbirth:{
       type:Date,
       required:false
    },
    friends:{
        type:Array,
        required:false
    }
},
{timestamps:true})

//static signup method
accountSchema.statics.signup= async function(username,password,email,address,occupation,dateofbirth,friends){
    //validation
    if(!username||!password){
        throw Error('Missing username or password')
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


    const account = await this.create({username,password:hash,email,address,occupation,dateofbirth,friends})
    return account
}

/*
//static update account method
accountSchema.statics.updateAccount = async function(username,password,email,address,occupation,dateofbirth){
    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const account = await this.create({username,password:hash,email,address,occupation,dateofbirth})
    return account
}
*/
//static login method

accountSchema.statics.login = async function(username,password){
    if(!username || !password){
        throw Error('Missing username or password')
    }
    const account = await this.findOne({username})
    if(!account){
        throw Error('Incorrect username')
    }
    const match = await bcrypt.compare(password,account.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return account
}

module.exports = mongoose.model('Account',accountSchema)