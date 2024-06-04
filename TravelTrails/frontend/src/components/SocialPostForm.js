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
    const response = await fetch(`/api/socialPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        contentText,
        photo,
        usernameId,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    setSocialPost({
      contentText: "",
      photo: "",
    });
    window.location.reload();
  } catch (error) {
    console.error("Error:", error.message);
    setError(error.message);
  }
};
