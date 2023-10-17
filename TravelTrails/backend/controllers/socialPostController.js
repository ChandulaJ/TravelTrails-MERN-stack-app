const SocialPost = require('../models/socialPostModel')
const mongoose = require('mongoose')
const Account = require('../models/accountModel')

//get all socialposts
const getSocialPosts = async(req,res)=>{
    const user_id = req.accounts._id
    const user = await Account.findById(user_id);
    const userFriends = user.friends;
    userFriends.push(user_id);

    const socialPosts = await SocialPost.find({ user_id: { $in: userFriends } }).sort({ createdAt: -1 });

    res.status(200).json(socialPosts)
}


//get a single socialpost
const getSocialPost = async(req,res)=>{
    const {id} =req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such socialPost'})
}

    const socialPost = await SocialPost.findById(id)


    if(!socialPost){
        return res.status(404).json({error:'No such SocialPost'})
    }
    res.status(200).json(socialPost);
}


//create a new socialpost
const createSocialPost = async(req,res)=>{
    const {contentText,videos} = req.body
    

    const photos = req.files.map((file) => file.path); 

    let emptyFields = []

    if(!contentText){
        emptyFields.push('contentText')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill all the fields',emptyFields})
    }

    try {
        const user_id = req.accounts._id
        const user = await Account.findById(user_id);
        const username_id = user.username;
        const user_address = user.address;
        const socialPost = await SocialPost.create({contentText,photos,videos,user_id,username_id,user_address})
        res.status(200).json(socialPost)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//delete a socialpost
const deleteSocialPost = async(req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such SocialPost'})
    }
   const socialPost = await SocialPost.findOneAndDelete({_id:id})

   if(!socialPost){
    return res.status(400).json({error:'No such SocialPost'})
}
res.status(200).json(socialPost)

}


//update a socialpost // not required
/*
const updateSocialPost = async(req,res)=>{
   const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such SocialPost'})
    }
    const socialPost = await SocialPost.findOneAndUpdate({_id:id},{
        ...req.body
    })

   if(!socialPost){
    return res.status(400).json({error:'No such SocialPost'})
}

}
*/

module.exports = {
    createSocialPost,
    getSocialPost,
    getSocialPosts,
    deleteSocialPost
    
    
}