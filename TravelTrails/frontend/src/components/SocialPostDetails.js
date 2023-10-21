
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import React,{ useState, useEffect } from "react"; 

// date fns
import { formatDistanceToNow } from 'date-fns'

const SocialPostDetails = ({ socialPost }) => {
    const { dispatch } = useSocialPostsContext();
    const { accounts } = useAuthContext();

    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]); 

    useEffect(() => {
        fetchComments(); 
    }, [socialPost]);

    const fetchComments = async () => {
        console.log('Fetching comments...');
        try {
            const response = await fetch(`/api/socialPosts/${socialPost._id}/comments`, {
                headers: {
                    'Authorization': `Bearer ${accounts.token}`,
                },
            });
            const data = await response.json();
    
            if (response.ok) {
                setComments(data);
                console.log(data); 
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleAddComment = async () => {
        if (!accounts) {
            return;
        }

        // Create a new comment object with the comment text and account ID.
        const newComment = {
            comment_text: commentInput,
            comment_accountId:accounts._id
        };

        // Send a request to add the comment to the server.
        const response = await fetch(`/api/socialPosts/${socialPost._id}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accounts.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment)
        });

        const json = await response.json();

        if (response.ok) {
            // Add the new comment to the state.
            dispatch({ type: 'ADD_COMMENT', payload: json });
            // Clear the comment input field after adding a comment.
            setCommentInput("");

            fetchComments();
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!accounts) {
          return;
        }
    
        const response = await fetch(`/api/socialPosts/${socialPost._id}/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accounts.token}`,
          },
        });
    
        if (response.ok) {
          // Remove the deleted comment from the state.
          setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
          fetchComments();
          
        } else {
          console.error("Error deleting comment. Status:", response.status);
        }
      };


    const handleSocialPostDelete = async () => {
        if (!accounts) {
            return;
        }
        const response = await fetch('/api/socialPosts/' + socialPost._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accounts.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_SOCIALPOST', payload: json })
        }
    }
   
    console.log("Comments in socialPost:", socialPost.comments);

 
    return (
        <div className="socialPost-details">
           <h4>{socialPost.username_id}</h4>
           <h4>{socialPost.user_address}</h4>
            <p>{socialPost.contentText}</p>
            <img className="post-photo" src={socialPost.photoPath} alt="Post Photo" />


    <div className="comment-section">
                <strong>Comments:</strong>
        <div className="separator">
        <div className="line"></div>
      </div>
                {socialPost.comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.comment_text}</p>
                        <p>{comment.comment_accountId}</p>
                        {accounts && accounts._id === comment.comment_accountId && (
              <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
            )}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={commentInput}
                onChange={handleCommentChange}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>

            <p>{formatDistanceToNow(new Date(socialPost.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleSocialPostDelete}>delete</span>
        </div>
    )
}

export default SocialPostDetails;
