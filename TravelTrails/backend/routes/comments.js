const express = require('express');
const router = express.Router();

// Import the necessary controllers and middleware for comment operations
const {
    createComment,
    getComments,
    deleteComment
} = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

// Require authentication for all comment routes
router.use(requireAuth);

// Get comments for a specific social post
router.get('/:postId/comments', getComments);

// Create a new comment for a specific social post
router.post('/:postId/comments', createComment);

// Delete a comment for a specific social post
router.delete('/:postId/comments/:commentId', deleteComment);

module.exports = router;
