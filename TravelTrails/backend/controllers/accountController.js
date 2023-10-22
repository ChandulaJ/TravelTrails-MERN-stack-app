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


// Signup a new account

const signupAccount = async (req, res) => {
    const { username, password, email, address, occupation, dateofbirth, friends } = req.body;
  
    try {
      let profilePicPath = '';
  
      if (req.file) {
        
        const username = req.body.username; // Use the username from the request
        const profilePicFileName = `${username}_${Date.now()}.png`;
  
        // Rest of the code to save the profile picture remains the same
        const profilePicData = req.file.buffer;
        const frontendPublicPath = path.join(__dirname, '..', '..', 'frontend', 'public');
        const profilePicPathOr = path.join(frontendPublicPath, profilePicFileName);
        console.log('Saving profile picture to:', profilePicPathOr); 
        fs.writeFileSync(profilePicPathOr, profilePicData);
        profilePicPath = profilePicFileName;
      }
  
      const account = await Account.signup(
        username,
        password,
        email,
        address,
        occupation,
        dateofbirth,
        friends,
        profilePicPath
      );
  
      // Create a token
      const token = createToken(account._id);
      const acc_id = account._id;
  
      res.status(200).json({ acc_id, username, token, email, address, occupation, dateofbirth, friends });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
/*
const signupAccount = async(req,res)=>{
    const {username,password,email,address,occupation,dateofbirth,friends} = req.body

    try {
        const account = await Account.signup(username,password,email,address,occupation,dateofbirth,friends)

        //create a token
        const token = createToken(account._id)
        const acc_id = account._id

        res.status(200).json({acc_id,username,token,email,address,occupation,dateofbirth,friends})
    } catch (error) {
        res.status(400).json({error:error.message})
        console.log(error.message)
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
const updateAccount = async (req, res) => {
    const { id } = req.params;
    let {
      username,
      email,
      address,
      occupation,
      dateofbirth,
    } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such Account' });
    }
  
    try {
      let profilePicPath = '';
  
      if (req.file) {
        // If a profilePic file was uploaded, save it and update the profilePicPath
        const profilePicData = req.file.buffer;
        const profilePicFileName = `${Date.now()}_${new mongoose.Types.ObjectId()}.png`;
  
        const frontendPublicPath = path.join(__dirname, '..', '..', 'frontend', 'public');
        const profilePicPathOr = path.join(frontendPublicPath, profilePicFileName);
  
        fs.writeFileSync(profilePicPathOr, profilePicData);
        profilePicPath = profilePicFileName;
      }
  
      const account = await Account.updateAccount(
        id,
        username,
        email,
        address,
        occupation,
        dateofbirth,
        profilePicPath
      );
  
      res.status(200).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
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

// Add a friend to the current user
const addFriend = async (req, res) => {
  const { accountId } = req.params; // Friend's account ID to add as a friend
  const token = req.headers.authorization;

  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).json({ error: 'Invalid account ID' });
  }

  try {
    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user_id = decodedToken._id;

    // Check if the friend is already in the user's friends list
    const user = await Account.findById(user_id);
    if (user.friends.includes(accountId)) {
      return res.status(400).json({ error: 'This account is already a friend.' });
    }

    // Add the friend to the user's friends list
    user.friends.push(accountId);
    await user.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a friend from the current user
const removeFriend = async (req, res) => {
  const { accountId } = req.params; // Friend's account ID to remove from friends list
  const token = req.headers.authorization;

  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).json({ error: 'Invalid account ID' });
  }

  try {
    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user_id = decodedToken._id;

    // Check if the friend is in the user's friends list
    const user = await Account.findById(user_id);
    if (!user.friends.includes(accountId)) {
      return res.status(400).json({ error: 'This account is not a friend.' });
    }

    // Remove the friend from the user's friends list
    user.friends = user.friends.filter((friendId) => friendId.toString() !== accountId);
    await user.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
    signupAccount,
    getAccount,
    getAccounts,
    deleteAccount,
    updateAccount,
    loginAccount,
    removeFriend,
    addFriend
    
}
