const express = require('express')
const router = express.Router()
const {
    createSocialPost,
    getSocialPost,
    getSocialPosts,
    deleteSocialPost
    
} = require('../controllers/socialPostController')

//Get all socialPosts
router.get('/',getSocialPosts)

//get single socialPost
router.get('/:id',getSocialPost)
//post a new socialPost
router.post('/',createSocialPost)

//delete a socialPost
router.delete('/:id',deleteSocialPost)


module.exports = router