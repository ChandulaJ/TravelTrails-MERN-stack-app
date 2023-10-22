import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

const Settings = () => {
  const { accounts, dispatch } = useContext(AuthContext);
  
  const [updatedAccount, setUpdatedAccount] = useState({ ...accounts });
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the updated account data
      const updatedData = {
        username: updatedAccount.username,
        email: updatedAccount.email,
        address: updatedAccount.address,
        occupation: updatedAccount.occupation,
        dateofbirth: updatedAccount.dateofbirth,
        profilePic: updatedAccount.profilePic
      };

      // Send a request to update the user account
      const response = await fetch(`/api/accounts/${accounts.acc_id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${accounts.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const json = await response.json();

      if (response.ok) {
        // Update the account in the context
        dispatch({ type: 'LOGIN', payload: { ...accounts, ...updatedData } });
        setError(null);
        setProfilePic('');
      } else {
        setError(json.error);
      }
    } catch (error) {
      setError(`Error updating the account: ${error.message}`);
    }
  };

  return (
    <div className="settings">
    <div className="settings-userData">
    <img className="settings-img" src="settingsPg.jpg" alt="MountainsImg"></img>
      <img
        className="profile-img"
        src={profilePic || "default-profile-pic.png"}
        alt="Profile Pic"
      ></img>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleProfilePicChange}
        required
      />

      <h4>Username</h4>
      <p>{accounts.username}</p>
      <h4>Email</h4>
      <input
        type="text"
        name="email"
        value={updatedAccount.email}
        onChange={handleInputChange}
      />
      <h4>Address</h4>
      <input
        type="text"
        name="address"
        value={updatedAccount.address}
        onChange={handleInputChange}
      />
      <h4>Occupation</h4>
      <input
        type="text"
        name="occupation"
        value={updatedAccount.occupation}
        onChange={handleInputChange}
      />
      <h4>Date of Birth</h4>
      <input
        type="date"
        name="dateofbirth"
        value={updatedAccount.dateofbirth}
        onChange={handleInputChange}
      />
      <h4>Friends</h4>
      <p>{accounts.friends}</p>
      <button onClick={handleSubmit}>Save Changes</button>
      {error && <div className="error">{error}</div>}
    </div>
  </div>
  );
};

export default Settings;
