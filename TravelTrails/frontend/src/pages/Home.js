import { useEffect, useState } from "react";
import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import {useAuthContext} from "../hooks/useAuthContext";

//components
import SocialPostDetails from "../components/SocialPostDetails";
import SocialPostForm from "../components/SocialPostForm";



const Home = () => {
  const{socialPosts,dispatch} = useSocialPostsContext()
  const{accounts} = useAuthContext()

//  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

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
      <div className="socialPosts">
        {socialPosts && socialPosts.map((socialPost) => (
          <SocialPostDetails key={socialPost._id} socialPost={socialPost} />
        ))}
      </div>
      <SocialPostForm />

     
    </div>
  );
};

export default Home;
