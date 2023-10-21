import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [address,setAddress] = useState('')
  const [occupation,setOccupation] = useState('')
  const [dateofbirth,setDateofbirth] = useState('')
const[profilePic,setProfilePic]=useState("default-profile-pic.png")

  const {signup,error,isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, password,email,address,occupation,dateofbirth,profilePic)
    console.log(username, password,email,address,occupation,dateofbirth,profilePic)
  };

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePic(selectedFile);
  };
  

  return (
    <div className="signup-container">
    <form className="signup" onSubmit={handleSubmit}>
      <h4>Create Account</h4>
      
      
      <input 
        type="text"  //------------------------------------
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
        placeholder="Username"
        className="signup-input"
      />
      
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Password"
        className="signup-input"
      />
      
      
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        placeholder="Email"
        className="signup-input"
      />

       
        <input 
            type="text" 
            onChange={(e) => setAddress(e.target.value)} 
            value={address}
            placeholder="Address"
            className="signup-input"
        />
        
        <input 
            type="text" 
            onChange={(e) => setOccupation(e.target.value)} 
            value={occupation}
            placeholder="Occupation"
            className="signup-input"
        />
       
        <input 
            type="date" 
            onChange={(e) => setDateofbirth(e.target.value)} 
            value={dateofbirth}
            placeholder="Date of Birth"
            className="signup-input"
        />
          <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleProfilePicChange}
          required
        />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
      
    </form>
    </div>
    
  )
}

export default Signup