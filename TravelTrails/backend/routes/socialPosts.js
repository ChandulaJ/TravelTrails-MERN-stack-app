const express = require('express')
const router = express.Router()
const SocialPost = require('../models/socialPostModel')

//Get all socialPosts
router.get('/',(req,res)=>{
    res.json({mssg:'Get all socialPosts'})
})

//get single socialPost
router.get('/:id',(req,res)=>{
    res.json({mssg:'Get single socialPost'})
})

//post a new socialPost
router.post('/',async(req,res)=>{
    const {author,contentText,photos,videos} = req.body

    try {
        const socialPost = await SocialPost.create({author,contentText,photos,videos})
        res.status(200).json(socialPost)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

    res.json({mssg:'Post a new socialPost'})
})

//delete a socialPost
router.delete('/:id',(req,res)=>{
    res.json({mssg:'Delete a  socialPost'})
})




module.exports = router