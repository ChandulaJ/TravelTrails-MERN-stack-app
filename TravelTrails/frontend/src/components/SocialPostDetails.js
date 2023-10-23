
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import { useCommentsContext } from "../context/CommentContext";
import { useAuthContext } from "../hooks/useAuthContext";
import React,{ useState, useEffect } from "react"; 


// date fns
import { formatDistanceToNow } from 'date-fns'


const SocialPostDetails = ({ socialPost }) => {
    const [socialPosts, setSocialPosts] = useState([]); // Assuming you have a state variable to store social posts.
    const { dispatch: dispatchSocPosts } = useSocialPostsContext();
    const { dispatch: dispatchComments } = useCommentsContext();
    const { accounts } = useAuthContext();

    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]); 
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");
    const [user,setUser] = useState({
        username:"",
        email:"",
        address:"",
        occupation:"",
        dateofbirth:""
    });

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
                
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleEditComment = (commentId, commentText) => {
        setEditingCommentId(commentId);
        setEditedCommentText(commentText); // Set the edited comment text
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
            dispatchComments({ type: 'ADD_COMMENT', payload: json });
            // Clear the comment input field after adding a comment.
            setCommentInput("");

            fetchComments();
        }
        window.location.reload();
    }
   
    const handleSaveComment = async (commentId) => {
        if (!accounts) {
            return;
        }

        const updatedComment = {
            comment_text: editedCommentText, // Use the edited comment text
        };

        const response = await fetch(`/api/socialPosts/${socialPost._id}/comments/${commentId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accounts.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment)
            
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            dispatchComments({ type: 'UPDATE_COMMENT', payload: jsonResponse  });
            setEditingCommentId(null);
            setEditedCommentText(""); // Clear the edited comment text
            fetchComments();
        } else {
            console.error("Error editing comment. Status:", response.status);
        }
        window.location.reload();

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
        const jsonResponse = await response.json();
        if (response.ok) {
          // Remove the deleted comment from the state.
          dispatchComments({ type: 'DELETE_COMMENT', payload: jsonResponse  });
          setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
          fetchComments();
          
        } else {
          console.error("Error deleting comment. Status:", response.status);
        }
        window.location.reload();
      };


      const handleSocialPostDelete = async (idval) => {
        if (!accounts) {
          return;
        }
      
        const response = await fetch('/api/socialPosts/' + idval, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accounts.token}`
          }
        });
      
        if (response.ok) {
            window.location.reload();
          // The delete request was successful (status 200)
          // You can update your state to remove the deleted post from the list
          setSocialPosts((prevSocialPosts) => prevSocialPosts.filter(post => post._id !== idval));
        } else {
          // Handle error here if needed
          // For example, show an error message to the user
          console.log('Failed to delete social post');
        }
      };
      
    console.log("Comments in socialPost:", socialPost.comments);
    
    
    useEffect(()=>{
        const fetchUser = async () => {
try {
    const response = await fetch(`/api/accounts/${socialPost.user_id}`);
    const user = await response.json();
    setUser(user);
    console.log("user", user);
} catch (error) {
    console.error("Error fetching user:", error);
}            
        }

        fetchUser();
    },[])
    return (
        <div className="socialPost-details">
            <h4>{user.username}</h4>
            <p>{socialPost.contentText}</p>
            <img className="post-photo" src={socialPost.photo} alt="Post Photo" />

            <div className="comment-section">
                <strong>Comments:</strong>
                <div className="separator">
                    <div className="line"></div>
                </div>
                
                {socialPost.comments.map((comment) => (
                    <div className="comment-add-container">
                    <div key={comment._id}>
                        {editingCommentId === comment._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedCommentText} // Use the edited comment text
                                    onChange={(e) => setEditedCommentText(e.target.value)} // Update edited comment text
                                />
                                <button className="material-symbols-outlined" onClick={() => handleSaveComment(comment._id)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>

      

                                   <p>{comment.comment_text}</p>
                                <p>{comment.comment_accountId}</p>
                                
                            </>
                        )}
                        {accounts && accounts._id === comment.comment_accountId && (
                            <>
                                <button className="material-symbols-outlined" onClick={() => handleEditComment(comment._id, comment.comment_text)}>Edit Forum</button>
                                <button className="material-symbols-outlined" onClick={() => handleDeleteComment(comment._id)}>delete forum</button>
                               
                            </>
                        )}
                        </div>
                    </div>
                ))}
            </div>
            
<div className="comment-add-container">
            <input
                type="text"
                value={commentInput}
                onChange={handleCommentChange}
                placeholder="Add a comment"
            />
            <button className="material-symbols-outlined" onClick={handleAddComment}>add_comment</button>
           
            </div>
           <div> 
</div>
            

            <p>{formatDistanceToNow(new Date(socialPost.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={() => handleSocialPostDelete(socialPost._id)}>delete</span>

             </div>
    );
}

export default SocialPostDetails;




