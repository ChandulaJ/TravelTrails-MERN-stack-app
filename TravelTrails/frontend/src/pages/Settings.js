import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


const Settings = () => {
  const { accounts } = useAuthContext();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        if (!accounts) {
          // Handle the case when the user is not logged in
          return;
        }

        const userId = accounts.user_id; // Change this to the actual user ID field name

        const response = await fetch(`/api/accounts/`, {
          headers: {
            'Authorization': `Bearer ${accounts.token}`,
          }
        });

        if (!response.ok) {
          throw Error('Network response for user account fetch was not ok');
        }

        const userData = await response.json();
        setAccount(userData);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserAccount();
  }, [accounts]);

  if (error) {
    return <div className="settings">Error: {error.message}</div>;
  }

  return (
    <div className="settings">
      <div className="settings-userData">
        <h4>Username</h4>
        <p>{accounts.username}</p>
        <h4>Email</h4>
        <p>{accounts.email}</p>
        <h4>Address</h4>
        <p>{accounts.address}</p> {/* Use account here, not accounts */}
        <h4>Occupation</h4>
        <p>{accounts.occupation}</p> {/* Use account here, not accounts */}
        <h4>Date of Birth</h4>
        <p>{accounts.dateofbirth}</p> {/* Use account here, not accounts */}
        <h4>Friends</h4>
        <p>{accounts.friends}</p> {/* Use account here, not accounts */}
      </div>
    </div>
  );
};

export default Settings;
