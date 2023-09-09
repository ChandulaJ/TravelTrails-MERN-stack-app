import { useEffect, useState } from "react";

//components
import SocialPostDetails from "../components/SocialPostDetails";
import SocialPostForm from "../components/SocialPostForm";

const Home = () => {
  const [socialPosts, setSocialPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialPosts = async () => {
      try {
        const response = await fetch('/api/socialPosts');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const json = await response.json();
        setSocialPosts(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchSocialPosts();
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
    </div>
  );
};

export default Home;
