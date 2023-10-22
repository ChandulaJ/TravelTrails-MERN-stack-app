import { useEffect, useState } from "react";
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import {useAuthContext} from "../hooks/useAuthContext";

//components
import SocialPostDetails from "../components/SocialPostDetails";
import SocialPostForm from "../components/SocialPostForm";
import FriendButton from "../components/friendButton";

const Home = () => {
  const{socialPosts,dispatch} = useSocialPostsContext()
  const{accounts} = useAuthContext()
  const [usernames, setUsernames] = useState([])
  const[ids,setIds] = useState([])
  const [friends, setFriends] = useState([]); 

//  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  const handleAddFriend = (idval) => {
    // Update the friends state to include the added friend
    setFriends([...friends, idval]);
  };

  const handleRemoveFriend = (idval) => {
    // Update the friends state to remove the removed friend
    setFriends(friends.filter((friend) => friend !== idval));
  };

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {

        const response = await fetch('/api/socialPosts', {
          headers: {'Authorization': `Bearer ${accounts.token}`},
        })
        
        
        const json = await response.json();


        if (response.ok) {
         dispatch({type: 'SET_SOCIALPOSTS',payload: json})
        }else{
          throw new Error('Network response for socialPost fetch was not ok');
        }

      
       
      } catch (error) {
        setError(error);
      }
    };
    if(accounts){
      fetchSocialPosts()
    }
    
  }, [dispatch,accounts])
  

  useEffect(() => {
    const fetchAccountUsernames = async () => {
      try {
        const response = await fetch("/api/accounts", {
          headers: {
            Authorization: `Bearer ${accounts.token}`,
          },
        });

        if (response.ok) {
          const accountData = await response.json();
   
          const usernames = accountData.map((account) => account.username);
          setUsernames(usernames);

          const ids = accountData.map((account) => account._id);
          setIds(ids);
        } else {
          throw new Error("Network response for accounts fetch was not ok");
        }
      } catch (error) {
        setError(error);
      }
    };

    if (accounts) {
      fetchAccountUsernames();
    }
  }, [accounts]);

/*
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts',{
          headers:{
            'Authorization': `Bearer ${accounts}`,
          }
        });

        if (!response.ok) {
          throw new Error('Network response for accounts fetch was not ok');
        }

        const json = await response.json();
        setAccounts(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchAccounts();
  }, []);

  if (error) {
    return <div className="home">Error: {error.message}</div>;
  }
*/
  return (
    <div className="home">
       <div className="home-userData">
       <h4>Username List:</h4>
        <ul>
        {ids.map((id, index) => (
            <li key={index}>
            {id}
            <FriendButton
              username={id}
              friends={friends}
              onAddFriend={handleAddFriend}
              onRemoveFriend={handleRemoveFriend}
            />
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
        {socialPosts && socialPosts.map((socialPost) => (
          <SocialPostDetails key={socialPost._id} socialPost={socialPost} />
        ))}
      </div>
    </div>

  );
};

export default Home;
