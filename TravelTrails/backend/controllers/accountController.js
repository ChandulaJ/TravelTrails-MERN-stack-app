const mongoose = require('mongoose')
const Account = require('../models/accountModel')

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


//create a new account
const createAccount = async(req,res)=>{
    const {username,password,email,address,occupation,dateofbith} = req.body

    try {
        const account = await Account.create({username,password,email,address,occupation,dateofbith})
        res.status(200).json(account)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


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
 res.status(200)
 }
module.exports = {
    createAccount,
    getAccount,
    getAccounts,
    deleteAccount,
    updateAccount
    
}
