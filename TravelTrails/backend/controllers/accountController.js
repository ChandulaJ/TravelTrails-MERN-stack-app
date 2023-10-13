const mongoose = require('mongoose')
const Account = require('../models/accountModel')
const jwt = require('jsonwebtoken')

const createToken=(_id)=>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

//get all accounts
const getAccounts = async(req,res)=>{
    const accounts=await Account.find({}).sort({createdAt:-1})
    res.status(200).json(accounts)
}


//get a single account
const getAccount = async(req,res)=>{
    const {id} =req.params
    const account = await Account.findById(id)

    if(!account){
        return res.status(404).json({error:'No such account'})
    }
    res.status(200).json(account);
}


// Signup a new account

const signupAccount = async(req,res)=>{
    const {username,password,email,address,occupation,dateofbirth} = req.body

    try {
        const account = await Account.signup(username,password,email,address,occupation,dateofbirth)

        //create a token
        const token = createToken(account._id)

        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
        console.log(error.message)
    }
}

  
 /*
  const signupAccount = async(req,res)=>{
    const{username,password} = req.body


    try {
        const account = await Account.signup(username,password)

        //create a token
        const token = createToken(account._id)

        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}
*/
  

//delete a account
const deleteAccount = async(req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Account'})
    }
   const account = await Account.findOneAndDelete({_id:id})

   if(!account){
    return res.status(400).json({error:'No such Account'})
}
res.status(200).json(account)

}

//update a account
const updateAccount = async(req,res)=>{
    const {id} =req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error:'No such Account'})
     }
     const account = await Account.findOneAndUpdate({_id:id},{
         ...req.body
     })
 
    if(!account){
     return res.status(400).json({error:'No such Account'})
 }
 res.status(200).json(account)
 }

//login account

const loginAccount = async(req,res)=>{
    const{username,password} = req.body


    try {
        const account = await Account.login(username,password)

        //create a token
        const token = createToken(account._id)

        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    signupAccount,
    getAccount,
    getAccounts,
    deleteAccount,
    updateAccount,
    loginAccount
    
}
