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
        
        const profilePicFileName = `${account._id}_${Date.now()}.png`; // Include account ID in the filename
  
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
// Update a user account including the friends array
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, email, address, occupation, dateofbirth, friends } = req.body;

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

    // Find the account by ID
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'No such Account' });
    }

    // Update account properties
    account.username = username;
    account.email = email;
    account.address = address;
    account.occupation = occupation;
    account.dateofbirth = dateofbirth;

    // Update profilePicPath if available
    if (profilePicPath) {
      account.profilePicPath = profilePicPath;
    }

    // Update the friends array
    account.friends = friends;

    // Save the updated account
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
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
    updateAccount,
    loginAccount,
    addFriend
    
}
