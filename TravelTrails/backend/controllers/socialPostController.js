const SocialPost = require('../models/socialPostModel')
const mongoose = require('mongoose')
const Account = require('../models/accountModel')
const fs = require('fs');
const path = require('path');

//check to get posts from only friends
// get all socialPosts
const getSocialPosts = async (req, res) => {
  const user_id = req.accounts._id;
  const user = await Account.findById(user_id);
  const userFriends = user.friends;
  userFriends.push(user_id);

  try {
      const socialPosts = await SocialPost
      .find({ user_id: { $in: userFriends } })
      .sort({ createdAt: -1 })
      .allowDiskUse(true);
    
    res.status(200).json(socialPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single socialPost
const getSocialPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such socialPost'})
  }

  const socialPost = await SocialPost.findById(id)

  if (!socialPost) {
    return res.status(404).json({error: 'No such socialPost'})
  }
  
  res.status(200).json(socialPost)
}

//check adding of images
// create new socialPost
const createSocialPost = async (req, res) => {
  const {contentText,photo} = req.body
  console.log(req.body)

  if (!contentText) {
    return res.status(400).json({ error: 'Please provide content text' });
  }


  // add doc to db
  try {
    const user_id = req.accounts._id
    const socialPost = await SocialPost.create({contentText,photo,user_id})
    res.status(200).json(socialPost)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
}

// delete a socialPost
const deleteSocialPost = async (req, res) => {
  const { id } = req.params
console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such socialPost'})
  }

  const socialPost = await SocialPost.findOneAndDelete({_id: id})

  if (!socialPost) {
    return res.status(400).json({error: 'No such socialPost'})
  }

  res.status(200).json(socialPost)
}
/*
// update a socialPost
const updateSocialPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such socialPost'})
  }

  const socialPost = await SocialPost.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!socialPost) {
    return res.status(400).json({error: 'No such socialPost'})
  }

  res.status(200).json(socialPost)
}
*/

module.exports = {
  getSocialPosts,
  getSocialPost,
  createSocialPost,
  deleteSocialPost
}