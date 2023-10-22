import React, { useState } from "react";

const FriendButton = ({ username, friends, onAddFriend, onRemoveFriend }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (friends === undefined) {
    return null;
  }

  const isFriend = friends.includes(username);

  const handleFriendAction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/accounts/${isFriend ? "remove-friend" : "add-friend"}/${username}`, {
        method: isFriend ? "DELETE" : "POST",
      });

      if (response.ok) {
        // Call the appropriate callback function based on the action
        if (isFriend) {
          onRemoveFriend(username);
        } else {
          onAddFriend(username);
        }
      } else {
        throw new Error(isFriend ? "Failed to remove friend" : "Failed to add friend");
      }
    } catch (error) {
      console.error("Friend action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleFriendAction} disabled={isLoading}>
      {isLoading ? "Loading..." : isFriend ? "Remove Friend" : "Add Friend"}
    </button>
  );
};

export default FriendButton;
