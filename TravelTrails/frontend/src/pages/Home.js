import React, { useEffect, useState } from "react";
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import SocialPostForm from "../components/SocialPostForm";
import SocialPostDetails from "../components/SocialPostDetails";
import jwt_decode from "jwt-decode";

const Home = () => {
  const [socialPosts, setSocialPosts] = useState([]); // Assuming you have a state variable to store social posts.
  //const { socialPosts, dispatch } = useSocialPostsContext();
  const { accounts, userToken } = useAuthContext();

  const [accountIds, setAccountIds] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [accountData, setAccountData] = useState([]);
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
      window.location.reload();
  };

  const removeFriend = (friendId, userID) => {
    fetch(`/api/accounts/${userID}/friends`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ friendId, action: 'remove' }),
    })
      .then((response) => {
        if (response.ok) {
          // Friend removed successfully, update the state
          setFriendIds(friendIds.filter(id => id !== friendId));
        } else {
          console.error('Failed to remove friend:', error);
        }
      })
      .catch((error) => {
        console.error('Failed to remove friend:', error);
      });
      window.location.reload();
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
          setFriendIds(accountData.friends);
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
          setAccountData(accountData); // Assuming you have a state variable to store social posts.
          const ids = accountData.map((account) => account._id);
          const usernames = accountData.map((account) => account.username);
          setAccountIds(ids);
          setUsernames(usernames);
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
    
   

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {
        if (accounts && accounts.token) {
          const response = await fetch("/api/socialPosts", {
            headers: {
              Authorization: `Bearer ${accounts.token}`,
            },
          });
  
          if (response.ok) {
            const socialPostData = await response.json();
            setSocialPosts(socialPostData); // Assuming you have a state variable to store social posts.
          } else {
            throw new Error("Network response for social posts fetch was not ok");
          }
        }
      } catch (error) {
        setError(error);
      }
    };
  
    fetchSocialPosts();
  }, [accounts]);
  
  const isFriend = (friendId) => friendIds.includes(friendId);
  return (
    <div className="home">
      <div className="home-userData">
        <h4>Account IDs:</h4>
        <ul>
          {accountData
            .filter((account) => account._id !== userId) // Filter out the current user
            .map((account) => (
              <li key={account._id}>
                {account.username}{" "}
                {isFriend(account._id) ? (
                  
                  <button className="material-symbols-outlined" onClick={() => removeFriend(account._id, userId)}>person_remove</button>
                              
                ) : (
                
                  <button className="material-symbols-outlined" onClick={() => addFriend(account._id, userId)}>person_add</button>
                )}
              </li>
            ))}
        </ul>
  
       
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
