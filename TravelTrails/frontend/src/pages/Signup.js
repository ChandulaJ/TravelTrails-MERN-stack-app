import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [occupation, setOccupation] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username,password,email,address,occupation,dateofbirth)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />

    
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <label>Email:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

       <label>Address:</label>
        <input 
            type="text" 
            onChange={(e) => setAddress(e.target.value)} 
            value={address}
        />
        <label>Occupation:</label>
        <input 
            type="text" 
            onChange={(e) => setOccupation(e.target.value)} 
            value={occupation}
        />
        <label>Date of Birth:</label>
        <input 
            type="date" 
            onChange={(e) => setDateofbirth(e.target.value)} 
            value={dateofbirth}
        />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup