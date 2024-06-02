import React, { useState } from "react";
import ConvertToBase64 from "./convertTo64base";
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { set } from "date-fns";

const SocialPostForm = () => {
  const { accounts } = useAuthContext();
  const [error, setError] = useState(null);

  const [socialPost, setSocialPost] = useState({
    contentText: "",
    photo: "",
    username_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accounts) {
      setError("You must be logged in");
      return;
    }
    if (!socialPost.contentText) {
      setError("Please enter a post");
      return;
    }
    if (!socialPost.photo) {
      setError("Please enter a photo");
      return;
    }
    const token = accounts.token;
    const usernameId = accounts.username;
    const authorization = `Bearer ${token}`;
    const { contentText, photo } = socialPost;
    try {
      const newPost = await axios.post(
        `http://${process.env.BACKEND_IP}:4000/api/socialPosts`,
        {
          contentText,
          photo,
          usernameId,
        },
        {
          headers: {
            authorization,
          },
        }
      );

      setSocialPost({
        contentText: "",
        photo: "",
      });
      window.location.reload();
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConvertToBase64(file);
    setSocialPost({ ...socialPost, photo: base64 });
  };

  const handleInput = (e) => {
    setSocialPost({ ...socialPost, [e.target.name]: e.target.value });
  };

  return (
    <form className="create-SocialPost" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="contentText"
        placeholder="Any travel thoughts..."
        onChange={handleInput}
      />

      <input
        type="file"
        name="photo"
        accept=".jpg, .jpeg, .png" // Limit accepted file types
        placeholder="Post photo"
        onChange={(e) => handleFileUpload(e)}
      />
      <img className="post-photo" src={socialPost.photo} />

      <button className="btn" onClick={handleSubmit}>
        Add post
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SocialPostForm;
