const SocialPost = require('../models/socialPostModel')
const mongoose = require('mongoose')

//get all socialposts
const getSocialPosts = async(req,res)=>{
    const socialPosts=await SocialPost.find({}).sort({createdAt:-1})
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
    const {author,contentText,photos,videos} = req.body

    try {
        const socialPost = await SocialPost.create({author,contentText,photos,videos})
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