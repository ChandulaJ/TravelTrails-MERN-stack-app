import React, { useEffect, useState } from "react";
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import SocialPostForm from "../components/SocialPostForm";
import SocialPostDetails from "../components/SocialPostDetails";
import jwt_decode from "jwt-decode";

const Home = () => {
  const { socialPosts, dispatch } = useSocialPostsContext();
  const { accounts, userToken } = useAuthContext();

  const [accountIds, setAccountIds] = useState([]);
  const [userAccount, setUserAccount] = useState(null);
  const [error, setError] = useState(null);
  const decodedToken = jwt_decode(accounts.token);
  const userId = decodedToken._id;
  const [friendIds, setFriendIds] = useState([]);

  const addFriend = (friendId, userID) => {
    fetch(`/api/accounts/${userID}/friends`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ friendId, action: 'add' }),
    })
      .then((response) => {
        if (response.ok) {
          // Friend added successfully, update the state
          setFriendIds([...friendIds, friendId]);
        } else {
          console.error('Failed to add friend:', error);
        }
      })
      .catch((error) => {
        console.error('Failed to add friend:', error);
      });
  };

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const response = await fetch(`/api/accounts/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const accountData = await response.json();
          setUserAccount(accountData);
          setFriendIds(accountData.friends); // Initialize friendIds state
        } else {
          throw new Error("Network response for user account fetch was not ok");
        }
      } catch (error) {
        setError(error);
      }
    };

    if (accounts) {
      fetchUserAccount();
    }
  }, [accounts, userId]);

  useEffect(() => {
    const fetchAccountIds = async () => {
      try {
        const response = await fetch("/api/accounts", {
          headers: {
            Authorization: `Bearer ${accounts.token}`,
          },
        });

        if (response.ok) {
          const accountData = await response.json();
          const ids = accountData.map((account) => account._id);
          setAccountIds(ids);
        } else {
          throw new Error("Network response for accounts fetch was not ok");
        }
      } catch (error) {
        setError(error);
      }
    };

    if (accounts) {
      fetchAccountIds();
    }
  }, [accounts]);

  const isFriend = (friendId) => friendIds.includes(friendId);

  return (
    <div className="home">
      <div className="home-userData">
        <h4>Account IDs:</h4>
        <ul>
          {accountIds.map((id) => (
            <li key={id}>
              {id}{" "}
              {isFriend(id) ? (
                <button onClick={() => addFriend(id, userId)}>Remove friend</button>
              ) : (
                <button onClick={() => addFriend(id, userId)}>Add friend</button>
              )}
            </li>
          ))}
        </ul>

        <img
          src={accounts.profilePic}
          alt="Profile Picture"
          className="profile-pic"
        />
      </div>
      <div className="home-socialPosts">
        <SocialPostForm />
        {socialPosts &&
          socialPosts.map((socialPost) => (
            <SocialPostDetails key={socialPost._id} socialPost={socialPost} />
          ))}
      </div>
    </div>
  );
};

export default Home;
