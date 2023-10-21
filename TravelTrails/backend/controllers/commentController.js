const mongoose = require('mongoose');
const SocialPost = require('../models/socialPostModel');

// Controller function to create a new comment for a social post
const createComment = async (req, res) => {
    try {
        const postId = req.params.postId; // Extract post ID from the request parameters
        const { comment_text, comment_accountId } = req.body;

        // Find the social post by ID
        const socialPost = await SocialPost.findById(postId);

        if (!socialPost) {
            return res.status(404).json({ error: 'Social post not found' });
        }

        // Create a new comment and add it to the social post's comments array
        socialPost.comments.push({
            comment_text,
            comment_accountId
        });

        // Save the updated social post with the new comment
        const updatedSocialPost = await socialPost.save();

        res.status(201).json(updatedSocialPost);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create a comment' });
    }
};

// Controller function to get comments for a specific social post
const getComments = async (req, res) => {
    try {
        const postId = req.params.postId; // Extract post ID from the request parameters

        // Find the social post by ID
        const socialPost = await SocialPost.findById(postId);

        if (!socialPost) {
            return res.status(404).json({ error: 'Social post not found' });
        }

        res.status(200).json(socialPost.comments);
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve comments' });
    }
};

// Controller function to update a comment on a social post
const updateComment = async (req, res) => {
    try {
        const postId = req.params.postId; // Extract post ID from the request parameters
        const commentId = req.params.commentId; // Extract comment ID from the request parameters
        const { comment_text } = req.body;

        // Find the social post by ID
        const socialPost = await SocialPost.findById(postId);

        if (!socialPost) {
            return res.status(404).json({ error: 'Social post not found' });
        }

        // Find the comment to update within the social post's comments array
        const commentToUpdate = socialPost.comments.find(comment => comment._id == commentId);

        if (!commentToUpdate) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Update the comment text
        commentToUpdate.comment_text = comment_text;

        // Save the updated social post with the modified comment
        const updatedSocialPost = await socialPost.save();

        res.status(200).json(updatedSocialPost);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update the comment' });
    }
};

// Controller function to delete a comment from a social post
const deleteComment = async (req, res) => {
    try {
        const postId = req.params.postId; // Extract post ID from the request parameters
        const commentId = req.params.commentId; // Extract comment ID from the request parameters

        // Find the social post by ID
        const socialPost = await SocialPost.findById(postId);

        if (!socialPost) {
            return res.status(404).json({ error: 'Social post not found' });
        }

        // Remove the comment by ID from the social post's comments array
        socialPost.comments = socialPost.comments.filter(comment => comment._id != commentId);

        // Save the updated social post without the deleted comment
        const updatedSocialPost = await socialPost.save();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete the comment' });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
    updateComment
};
