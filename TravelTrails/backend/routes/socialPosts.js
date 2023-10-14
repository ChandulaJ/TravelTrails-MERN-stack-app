const express = require('express')

const {
    createSocialPost,
    getSocialPost,
    getSocialPosts,
    deleteSocialPost
    
} = require('../controllers/socialPostController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//require authentication for all routes
router.use(requireAuth)


//Get all socialPosts
router.get('/',getSocialPosts)

//get single socialPost
router.get('/:id',getSocialPost)
//post a new socialPost
router.post('/',createSocialPost)

//delete a socialPost
router.delete('/:id',deleteSocialPost)


module.exports = router