const mongoose = require('mongoose')
const Account = require('../models/accountModel')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
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



// signup a user
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

//check image addition
//update a account



// Remove a friend from the account's friends list
const removeFriend = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(404).json({ error: 'Invalid account or friend ID' });
  }

  try {
    // Find the account by ID
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'No such account' });
    }

    // Check if the friend ID exists in the friends list
    const friendIndex = account.friends.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).json({ error: 'Friend not found in the friends list' });
    }

    // Remove the friend ID from the friends list
    account.friends.splice(friendIndex, 1);

    // Save the updated account
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add a friend to the account's friends list
const addFriend = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(404).json({ error: 'Invalid account or friend ID' });
  }

  try {
    // Find the account by ID
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'No such account' });
    }

    // Check if the friend ID is already in the friends list
    if (account.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend already exists' });
    }

    // Add the friend ID to the friends list
    account.friends.push(friendId);

    // Save the updated account
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  signupAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  //updateAccount,
  loginAccount,
  addFriend,
  removeFriend
  
}