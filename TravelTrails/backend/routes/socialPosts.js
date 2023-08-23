const express = require('express')
const router = express.Router()


//Get all socialPosts
router.get('/',(req,res)=>{
    res.json({mssg:'Get all socialPosts'})
})

//get single socialPost
router.get('/:id',(req,res)=>{
    res.json({mssg:'Get single socialPost'})
})

//post a new socialPost
router.post('/',(req,res)=>{
    res.json({mssg:'Post a new socialPost'})
})

//delete a socialPost
router.delete('/:id',(req,res)=>{
    res.json({mssg:'Delete a  socialPost'})
})




module.exports = router