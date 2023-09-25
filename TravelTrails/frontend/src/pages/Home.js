import { useEffect, useState } from "react";

//components
import SocialPostDetails from "../components/SocialPostDetails";
import AccountDetails from "../components/AccountDetails";
import SocialPostForm from "../components/SocialPostForm";
import AccountForm from "../components/AccountForm";


const Home = () => {
  const [socialPosts, setSocialPosts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {
        const response = await fetch('/api/socialPosts');

        if (!response.ok) {
          throw new Error('Network response for socialPost fetch was not ok');
        }

        const json = await response.json();
        setSocialPosts(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchSocialPosts();
  }, []);
  

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts');

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

  return (
    <div className="home">
      <div className="socialPosts">
        {socialPosts && socialPosts.map((socialPost) => (
          <SocialPostDetails key={socialPost._id} socialPost={socialPost} />
        ))}
      </div>
      <SocialPostForm />

      <div className="accounts">
        {accounts && accounts.map((account) => (
          <AccountDetails key={account._id} account={account} />
        ))}
        </div>
    </div>
  );
};

export default Home;
